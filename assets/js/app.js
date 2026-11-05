/* AEM-25 互動爆炸圖
 * 幾何單位 mm，z 為堆疊軸（陰極側朝 +z）。場景單位 = mm × S。
 * 依賴：index.html 的 importmap（three、three/addons）、content.js（零件文字）。 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PARTS, UI } from './content.js?v=20261105a';

const $ = id => document.getElementById(id);
const ZK = /Mac|iPhone|iPad/.test((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '') ? '⌘' : 'Ctrl';
const keyNames = root => root.querySelectorAll('.zk').forEach(k => { k.textContent = ZK; });
const doc = document.documentElement;
const lang = () => (doc.lang === 'en' ? 'en' : 'zh');
const tr = o => (o == null ? '' : typeof o === 'string' ? o : (o[lang()] ?? o.zh));
const ui = () => UI[lang()];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDark = () => {
  const t = doc.dataset.theme;
  if (t === 'dark') return true; if (t === 'light') return false;
  return matchMedia('(prefers-color-scheme: dark)').matches;
};
const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const ease = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

const vp = $('viewport'), canvas = $('gl');
let renderer = null;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
catch (e) { renderer = null; }
if (!renderer) document.body.classList.add('no-gl');
else init();

function init(){
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  /* ═══ DATA: 幾何（AEM-25 Rev C，mm） ═══ */
  const MIL = 0.0254;
  const GEO = {
    ep: 110, ep_t: 25, ep_r: 8, fp: 80, fp_t: 15, ins_t: 0.5,
    gasket: 10 * MIL, mem: 0.050, mea: 66, active: 50,
    tab_w: 36, tab_top: 74, tab_t: 6, lug: [-9, 64], sense: [9, 64],
    ports_y: [-20, 20], base: [150, 100, 15],
    bolts: [[-25,-45],[25,-45],[-45,-25],[45,-25],[-45,25],[45,25],[-25,45],[25,45]],
  };
  const MEAZ = 2 * GEO.gasket + GEO.mem;                         // 0.558
  const Z = {
    fp_a: [-15, 0], ins_a: [-15.5, -15], ep_a: [-40.5, -15.5],
    fp_c: [MEAZ, MEAZ + 15], ins_c: [MEAZ + 15, MEAZ + 15.5], ep_c: [MEAZ + 15.5, MEAZ + 40.5],
  };
  const S = 1.5 / GEO.ep, mm = v => v * S;

  const PAL = {
    light: { blue:0x1C39A0, nickel:0xBDB6A6, peek:0xC9B183, ptfe:0xF2F1EC, felt:0x6C6862, mem:0xD9C27C,
             steel:0xB2B9C2, tube:0xE8EBF0, nut:0xC2A877, base:0xC9B183, hi:0x3355CC },
    dark:  { blue:0x1B3AA4, nickel:0xC9C2B2, peek:0xC9AE7C, ptfe:0xE6E4DE, felt:0x77726A, mem:0xD8C07A,
             steel:0xB4BCC5, tube:0xD6DCE4, nut:0xC4A773, base:0xC9AE7C, hi:0x6E8DF5 },
  };
  const BASE_MAT = {
    blue:   { metalness: .30, roughness: .40 }, nickel: { metalness: .85, roughness: .30 },
    peek:   { metalness: .02, roughness: .58 }, ptfe:   { metalness: .00, roughness: .70 },
    felt:   { metalness: .35, roughness: .92 }, mem:    { metalness: .05, roughness: .20, opacity: .8 },
    steel:  { metalness: .82, roughness: .28 }, tube:   { metalness: .02, roughness: .35, opacity: .72 },
    nut:    { metalness: .02, roughness: .55 }, base:   { metalness: .02, roughness: .62 },
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .05, 100);
  const world = new THREE.Group(); scene.add(world);

  const hemi = new THREE.HemisphereLight(0xffffff, 0xaeb6c4, .5);
  const key = new THREE.DirectionalLight(0xffffff, 2.0); key.position.set(3.4, 4.8, 5.4);
  const fill = new THREE.DirectionalLight(0xdde3ee, .7); fill.position.set(-4.6, 1.4, 2.2);
  const rim = new THREE.DirectionalLight(0xffffff, .85); rim.position.set(-1.2, 2.2, -5);
  key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { near: 1, far: 18, left: -3.2, right: 3.2, top: 3.2, bottom: -3.2 });
  key.shadow.camera.updateProjectionMatrix(); key.shadow.bias = -.0012; key.shadow.normalBias = .02; key.shadow.radius = 2;
  scene.add(hemi, key, fill, rim);

  function buildEnv(){
    const c = document.createElement('canvas'); c.width = 512; c.height = 256;
    const g = c.getContext('2d'), dark = isDark(), lg = g.createLinearGradient(0, 0, 0, 256);
    if (dark){ lg.addColorStop(0,'#77839a'); lg.addColorStop(.45,'#2b323f'); lg.addColorStop(1,'#0a0d12'); }
    else     { lg.addColorStop(0,'#ffffff'); lg.addColorStop(.42,'#dee3ee'); lg.addColorStop(1,'#7c8492'); }
    g.fillStyle = lg; g.fillRect(0, 0, 512, 256);
    [[120,50,92],[356,70,124]].forEach(([x,y,r]) => {
      const rg = g.createRadialGradient(x,y,2,x,y,r);
      rg.addColorStop(0,'rgba(255,255,255,'+(dark?.62:.95)+')'); rg.addColorStop(1,'rgba(255,255,255,0)');
      g.fillStyle = rg; g.beginPath(); g.arc(x,y,r,0,6.283); g.fill();
    });
    const t = new THREE.CanvasTexture(c);
    t.mapping = THREE.EquirectangularReflectionMapping; t.colorSpace = THREE.SRGBColorSpace;
    const pm = new THREE.PMREMGenerator(renderer), env = pm.fromEquirectangular(t).texture;
    pm.dispose(); t.dispose(); return env;
  }

  /* ── 幾何工具（輸入 mm） ── */
  function rrect(w, h, r){
    const x = w/2, y = h/2, s = new THREE.Shape();
    s.moveTo(-x+r,-y); s.lineTo(x-r,-y); s.quadraticCurveTo(x,-y,x,-y+r);
    s.lineTo(x,y-r); s.quadraticCurveTo(x,y,x-r,y); s.lineTo(-x+r,y); s.quadraticCurveTo(-x,y,-x,y-r);
    s.lineTo(-x,-y+r); s.quadraticCurveTo(-x,-y,-x+r,-y); return s;
  }
  const hole = (x, y, r) => { const p = new THREE.Path(); p.absarc(x, y, r, 0, Math.PI*2, true); return p; };
  function extrude(shape, depth, bevel){
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: !!bevel, bevelThickness: .5,
      bevelSize: .5, bevelSegments: 2, curveSegments: 8 });
    g.translate(0, 0, -depth/2); g.scale(S, S, S); return g;
  }
  const CYL = new THREE.CylinderGeometry(1, 1, 1, 24, 1), HEX = new THREE.CylinderGeometry(1, 1, 1, 6, 1);

  /* ── 零件登錄：每個零件有自己的材質副本，才能單獨淡出與高亮 ── */
  const P = {}, pickables = [];
  PARTS.forEach((d, i) => { P[d.id] = { id: d.id, idx: i, d, group: new THREE.Group(), cache: {}, mats: [], op: 1, opT: 1, hl: 0, hlT: 0, dirty: true }; });
  function matOf(p, name){
    if (!p.cache[name]){
      const m = new THREE.MeshStandardMaterial(Object.assign({ transparent: true }, BASE_MAT[name]));
      m.userData = { pal: name, op0: BASE_MAT[name].opacity ?? 1 };
      p.cache[name] = m; p.mats.push(m);
    }
    return p.cache[name];
  }
  function add(p, mesh, parent){
    mesh.userData.pid = p.id; mesh.castShadow = mesh.receiveShadow = true;
    (parent || p.group).add(mesh); pickables.push(mesh); return mesh;
  }
  const rodZ = (p, geo, name, r, len, x, y, z, parent) => {
    const m = new THREE.Mesh(geo, matOf(p, name)); m.scale.set(mm(r), mm(len), mm(r)); m.rotation.x = Math.PI/2;
    m.position.set(mm(x), mm(y), mm(z)); return add(p, m, parent);
  };
  const rodX = (p, geo, name, r, len, x, y, z) => {
    const m = new THREE.Mesh(geo, matOf(p, name)); m.scale.set(mm(r), mm(len), mm(r)); m.rotation.z = Math.PI/2;
    m.position.set(mm(x), mm(y), mm(z)); return add(p, m);
  };
  const decal = (p, tex, size, z) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(mm(size), mm(size)),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
    m.material.userData = { op0: 1 }; p.mats.push(m.material);
    m.position.z = mm(z); m.userData.pid = p.id; p.group.add(m); return m;
  };

  /* ── 貼圖 ── */
  const faceCv = document.createElement('canvas'); faceCv.width = faceCv.height = 1024;
  const chCv = document.createElement('canvas'); chCv.width = chCv.height = 1024;
  const faceTex = new THREE.CanvasTexture(faceCv), chTex = new THREE.CanvasTexture(chCv);
  [faceTex, chTex].forEach(t => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; });
  /* 流道：4 通道並聯 × 6 道次，24 條 1 × 1 mm，節距 2 mm */
  const CH = (() => {
    const r = [], n = 24, Pt = 2, y0 = -23, xs = 23, hs = 25, np = 4, npass = 6;
    for (let k = 0; k < n; k++) r.push([-xs, y0 + Pt*k - .5, xs, y0 + Pt*k + .5]);
    const bun = []; for (let j = 0; j < npass; j++) bun.push([y0 + Pt*np*j, y0 + Pt*(np*j + np - 1)]);
    r.push([-hs, bun[0][0] - .5, -21, bun[0][1] + .5]);
    for (let j = 0; j < npass - 1; j++){
      const lo = bun[j][0] - .5, hi = bun[j+1][1] + .5;
      r.push(j % 2 === 0 ? [xs, lo, hs, hi] : [-hs, lo, -xs, hi]);
    }
    const last = bun[npass-1]; r.push([-hs, last[0] - .5, -21, last[1] + .5]);
    return r;
  })();
  function drawDecals(){
    const dark = isDark();
    let g = faceCv.getContext('2d'); g.clearRect(0, 0, 1024, 1024);
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = 'rgba(226,232,255,.88)'; g.font = '700 150px Archivo, "Noto Sans TC", sans-serif';
    if ('letterSpacing' in g) g.letterSpacing = '22px';
    g.fillText('NCUT', 512, 470);
    if ('letterSpacing' in g) g.letterSpacing = '6px';
    g.fillStyle = 'rgba(226,232,255,.62)'; g.font = '500 34px "IBM Plex Mono", monospace';
    g.fillText('AEM-25 · REV C · CATHODE', 512, 590);
    if ('letterSpacing' in g) g.letterSpacing = '0px';
    faceTex.needsUpdate = true;
    g = chCv.getContext('2d'); g.clearRect(0, 0, 1024, 1024);
    const px = v => (v + 40) / 80 * 1024, py = v => (40 - v) / 80 * 1024;
    g.fillStyle = dark ? 'rgba(10,12,16,.62)' : 'rgba(40,36,30,.5)';
    for (const [x0, y0, x1, y1] of CH) g.fillRect(px(x0), py(y1), px(x1) - px(x0), py(y0) - py(y1));
    g.setLineDash([10, 8]); g.lineWidth = 3; g.strokeStyle = 'rgba(14,143,114,.75)';
    g.strokeRect(px(-25), py(25), px(25) - px(-25), py(-25) - py(25)); g.setLineDash([]);
    chTex.needsUpdate = true;
  }

  /* ── 建模 ── */
  const anchor = (p, x, y, z, parent) => { const o = new THREE.Object3D(); o.position.set(mm(x), mm(y), mm(z)); (parent || p.group).add(o); p.anchor = o; };
  const plate = (id, z) => { const p = P[id]; p.base = (z[0] + z[1]) / 2; p.group.position.z = mm(p.base); world.add(p.group); return p; };

  for (const id of ['ep_c', 'ep_a']){
    const p = plate(id, Z[id]);
    const sh = rrect(GEO.ep, GEO.ep, GEO.ep_r); GEO.bolts.forEach(([x,y]) => sh.holes.push(hole(x, y, 4.2)));
    add(p, new THREE.Mesh(extrude(sh, GEO.ep_t - 1, true), matOf(p, 'blue')));
    if (id === 'ep_c') decal(p, faceTex, 104, GEO.ep_t/2 + .9);
    anchor(p, id === 'ep_c' ? -38 : 38, 62, 0);
  }
  for (const id of ['ins_c', 'ins_a']){
    const p = plate(id, Z[id]);
    const sh = rrect(GEO.ep - .4, GEO.ep - .4, GEO.ep_r); GEO.bolts.forEach(([x,y]) => sh.holes.push(hole(x, y, 3.75)));
    add(p, new THREE.Mesh(extrude(sh, GEO.ins_t), matOf(p, 'peek')));
    anchor(p, id === 'ins_c' ? -38 : 38, 62, 0);
  }
  function buildFlow(p){
    add(p, new THREE.Mesh(extrude(rrect(GEO.fp, GEO.fp, 1), GEO.fp_t), matOf(p, 'nickel')));
    const tab = new THREE.Shape();
    tab.moveTo(-GEO.tab_w/2, 39); tab.lineTo(GEO.tab_w/2, 39); tab.lineTo(GEO.tab_w/2, GEO.tab_top - 2);
    tab.quadraticCurveTo(GEO.tab_w/2, GEO.tab_top, GEO.tab_w/2 - 2, GEO.tab_top);
    tab.lineTo(-GEO.tab_w/2 + 2, GEO.tab_top); tab.quadraticCurveTo(-GEO.tab_w/2, GEO.tab_top, -GEO.tab_w/2, GEO.tab_top - 2);
    tab.lineTo(-GEO.tab_w/2, 39);
    tab.holes.push(hole(GEO.lug[0], GEO.lug[1], 3.3), hole(GEO.sense[0], GEO.sense[1], 2.15));
    add(p, new THREE.Mesh(extrude(tab, GEO.tab_t), matOf(p, 'nickel')));
    decal(p, chTex, GEO.fp, GEO.fp_t/2 + .06);
    for (const y of GEO.ports_y){ rodX(p, CYL, 'nut', 4.2, 12, -46, y, 0); rodX(p, CYL, 'tube', 1.6, 46, -75, y, 0); }
    anchor(p, 0, 80, 0);
  }
  buildFlow(plate('fp_a', Z.fp_a));
  const fpc = plate('fp_c', Z.fp_c); buildFlow(fpc); fpc.group.rotation.y = Math.PI;

  /* MEA 夾層：實際合計 0.558 mm；拆開時加厚顯示 */
  const windowed = () => { const s = rrect(79.4, 79.4, 1); s.holes.push(new THREE.Path(rrect(GEO.active, GEO.active, .5).getPoints(8))); return s; };
  const MEA = [
    { id: 'gk_c', mat: 'ptfe', z: [MEAZ - GEO.gasket, MEAZ], vis: 1.4, j:  2, shape: windowed, a: [-34, 46] },
    { id: 'pt_c', mat: 'felt', z: [MEAZ - GEO.gasket, MEAZ], vis: 1.8, j:  1, shape: () => rrect(49.6, 49.6, .4), a: [-12, 20] },
    { id: 'mem',  mat: 'mem',  z: [GEO.gasket, GEO.gasket + GEO.mem], vis: .8, j: 0, shape: () => rrect(GEO.mea, GEO.mea, .6), a: [-20, 40] },
    { id: 'pt_a', mat: 'felt', z: [0, GEO.gasket], vis: 1.8, j: -1, shape: () => rrect(49.6, 49.6, .4), a: [12, 20] },
    { id: 'gk_a', mat: 'ptfe', z: [0, GEO.gasket], vis: 1.4, j: -2, shape: windowed, a: [34, 46] },
  ];
  for (const L of MEA){
    const p = P[L.id]; Object.assign(p, { base: (L.z[0] + L.z[1]) / 2, real: L.z[1] - L.z[0], vis: L.vis, j: L.j });
    p.mesh = add(p, new THREE.Mesh(extrude(L.shape(), 1), matOf(p, L.mat)));
    world.add(p.group); anchor(p, L.a[0], L.a[1], 0);
  }

  /* 夾持組：螺栓頭跟著陽極端板，碟簧與螺帽跟著陰極端板 */
  const B = P.bolts; world.add(B.group);
  const heads = new THREE.Group(), nuts = new THREE.Group(); B.group.add(heads, nuts);
  const disc = (() => {
    const pts = [[6.25, 0], [6.25, .7], [3.1, 1.0], [3.1, .3], [6.25, 0]].map(([r, y]) => new THREE.Vector2(r, y));
    const g = new THREE.LatheGeometry(pts, 36); g.scale(S, S, S); g.rotateX(Math.PI/2); return g;
  })();
  for (const [x, y] of GEO.bolts){
    rodZ(B, CYL, 'steel', 3, 96, x, y, Z.ep_a[0] - 1.6 + 48, heads);
    rodZ(B, CYL, 'steel', 6, 1.6, x, y, Z.ep_a[0] - .8, heads);
    rodZ(B, HEX, 'steel', 5.77, 4, x, y, Z.ep_a[0] - 3.6, heads);
    for (let k = 0; k < 3; k++){
      const d = new THREE.Mesh(disc, matOf(B, 'steel')); d.position.set(mm(x), mm(y), mm(Z.ep_c[1] + k * .7)); add(B, d, nuts);
    }
    rodZ(B, CYL, 'steel', 6, 1.6, x, y, Z.ep_c[1] + 2.4 + .8, nuts);
    rodZ(B, HEX, 'steel', 5.77, 5.2, x, y, Z.ep_c[1] + 4.0 + 2.6, nuts);
  }
  anchor(B, 25, 45, Z.ep_c[1] + 9.5, nuts);

  const baseY = -GEO.ep/2 - GEO.base[2]/2, BS = P.base; world.add(BS.group);
  { const m = add(BS, new THREE.Mesh(extrude(rrect(GEO.base[0], GEO.base[1], 6), GEO.base[2]), matOf(BS, 'base')));
    m.rotation.x = -Math.PI/2; m.position.set(0, mm(baseY), mm(.3)); m.castShadow = false; }
  anchor(BS, 72, baseY + 2, 48);

  const shTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d'), rg = g.createRadialGradient(64,64,4,64,64,62);
    rg.addColorStop(0,'rgba(0,0,0,.55)'); rg.addColorStop(.6,'rgba(0,0,0,.18)'); rg.addColorStop(1,'rgba(0,0,0,0)');
    g.fillStyle = rg; g.fillRect(0,0,128,128);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 4.4),
    new THREE.MeshBasicMaterial({ color: 0x000000, map: shTex, transparent: true, depthWrite: false, opacity: .3 }));
  shadow.rotation.x = -Math.PI/2; shadow.position.set(0, mm(-GEO.ep/2 - GEO.base[2] - .3), 0); world.add(shadow);

  /* ═══ 爆炸量 E（0 組立 → 1 全拆） ═══ */
  let E = 0;
  const SIDE = { ep_c: [1, 2], ins_c: [1, 1], fp_c: [1, 0], fp_a: [-1, 0], ins_a: [-1, 1], ep_a: [-1, 2] };
  function applyExplode(){
    const open = sm(0, .45, E), all = sm(.3, 1, E);
    const off = id => { const [sg, k] = SIDE[id]; return sg * (open * 34 + all * k * 30); };
    for (const id in SIDE){ const p = P[id]; p.group.position.z = mm(p.base + off(id)); }
    for (const L of MEA){
      const p = P[L.id]; p.mesh.scale.z = p.real + (p.vis - p.real) * open;
      p.group.position.z = mm(p.base + p.j * 10 * open);
    }
    heads.position.z = mm(off('ep_a'));
    nuts.position.z = mm(off('ep_c') + all * 16);
    BS.group.position.y = mm(-10 * all);
  }

  /* ═══ 色彩 ═══ */
  function paint(){
    const pal = isDark() ? PAL.dark : PAL.light;
    for (const id in P) for (const m of P[id].mats){
      if (m.userData.pal){ m.color.setHex(pal[m.userData.pal]); m.emissive.setHex(pal.hi); }
    }
    if (scene.environment) scene.environment.dispose();
    scene.environment = buildEnv();
    for (const id in P) for (const m of P[id].mats) if (m.isMeshStandardMaterial){ m.envMapIntensity = isDark() ? .95 : 1; m.needsUpdate = true; }
    shadow.material.opacity = isDark() ? .36 : .26;
    for (const id in P) P[id].dirty = true;
    drawDecals(); needs = true;
  }

  /* ═══ 相機 ═══ */
  const controls = new OrbitControls(camera, canvas);
  Object.assign(controls, { enableDamping: true, dampingFactor: .08, enablePan: false, rotateSpeed: .7,
    zoomSpeed: .8, minDistance: 2.2, maxDistance: 16, minPolarAngle: .15, maxPolarAngle: Math.PI - .25 });
  const T0 = new THREE.Vector3(0, .06, 0), DIR = new THREE.Vector3(.82, .34, .56).normalize();
  controls.target.copy(T0);
  const fitDist = () => {
    const v = THREE.MathUtils.degToRad(camera.fov), h = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);
    return (camera.aspect < 1 ? 2.05 : 2.25) / Math.sin(Math.min(v, h) / 2);
  };
  let userMoved = false, camTw = null;
  const homePos = () => T0.clone().addScaledVector(DIR, fitDist());
  camera.position.copy(homePos());
  controls.addEventListener('start', () => { userMoved = true; camTw = null; hideHint(); });

  /* 滾輪留給頁面捲動：按住 Ctrl（Mac 為 ⌘）才縮放。觸控板雙指會帶 ctrlKey，照常縮放 */
  const wheelHint = $('wheelhint');
  let wheelT = 0;
  vp.addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) return;
    e.stopPropagation();
    if (!wheelHint) return;
    wheelHint.classList.add('on'); clearTimeout(wheelT);
    wheelT = setTimeout(() => wheelHint.classList.remove('on'), 1400);
  }, { capture: true, passive: true });

  const sph = new THREE.Spherical(), off3 = new THREE.Vector3();
  function orbitBy(dTheta, dPhi, kR){
    off3.copy(camera.position).sub(controls.target); sph.setFromVector3(off3);
    sph.theta += dTheta; sph.phi = THREE.MathUtils.clamp(sph.phi + dPhi, controls.minPolarAngle, controls.maxPolarAngle);
    sph.radius = THREE.MathUtils.clamp(sph.radius * kR, controls.minDistance, controls.maxDistance);
    off3.setFromSpherical(sph); camera.position.copy(controls.target).add(off3); userMoved = true; needs = true;
  }
  function resetView(){
    userMoved = false;
    camTw = { t0: performance.now(), d: reduce ? 1 : 700, p0: camera.position.clone(), p1: homePos(), q0: controls.target.clone(), q1: T0.clone() };
  }

  /* ═══ 選取、高亮、淡出 ═══ */
  let sel = null, hov = null;
  const DIM = .14;
  function refreshTargets(){
    for (const id in P){
      const p = P[id];
      p.opT = !sel || id === sel ? 1 : DIM;
      p.hlT = id === sel ? 1 : id === hov ? .55 : 0;
    }
  }
  function stepParts(){
    let moving = false;
    for (const id in P){
      const p = P[id];
      const dOp = p.opT - p.op, dHl = p.hlT - p.hl;
      if (Math.abs(dOp) < .004 && Math.abs(dHl) < .004){ if (p.op !== p.opT || p.hl !== p.hlT){ p.op = p.opT; p.hl = p.hlT; p.dirty = true; } }
      else { p.op += dOp * (reduce ? 1 : .2); p.hl += dHl * (reduce ? 1 : .25); p.dirty = true; moving = true; }
      if (p.dirty){
        p.dirty = false;
        for (const m of p.mats){
          m.opacity = m.userData.op0 * p.op; m.depthWrite = p.op > .6 && !m.map;
          if (m.emissive) m.emissiveIntensity = p.hl * .1;
        }
        p.group.traverse(o => { if (o.isMesh) o.castShadow = p.op > .6 && o.material.isMeshStandardMaterial && p.id !== 'base'; });
        moving = true;
      }
    }
    return moving;
  }

  /* ── 清單、圖釘、資訊面板 ── */
  const list = $('plist'), pinsHost = $('pins'), info = $('info'), hoverTip = $('hovertip');
  const SW = { ep_c:'blue', ep_a:'blue', ins_c:'peek', ins_a:'peek', fp_c:'nickel', fp_a:'nickel', gk_c:'ptfe', gk_a:'ptfe',
               pt_c:'felt', pt_a:'felt', mem:'mem', bolts:'steel', base:'base' };
  const hex = n => '#' + n.toString(16).padStart(6, '0');
  const pins = {};
  PARTS.forEach((d, i) => {
    const li = document.createElement('li');
    li.innerHTML = '<button type="button" data-id="' + d.id + '" aria-pressed="false"><b>' + String(i + 1).padStart(2, '0') +
      '</b><i class="sw" aria-hidden="true"></i><span></span></button>';
    list.appendChild(li);
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pin'; b.dataset.id = d.id; b.textContent = i + 1;
    pinsHost.appendChild(b); pins[d.id] = b;
  });
  const listBtns = [...list.querySelectorAll('button')];
  function texts(){
    const pal = isDark() ? PAL.dark : PAL.light;
    listBtns.forEach((b, i) => {
      const d = PARTS[i];
      b.querySelector('span').textContent = tr(d.name);
      b.querySelector('.sw').style.background = hex(pal[SW[d.id]]);
      pins[d.id].setAttribute('aria-label', ui().pin(i + 1, tr(d.name)));
    });
    renderInfo(); aria();
    if (sel){ const c = $('selchip'); c.textContent = String(P[sel].idx + 1).padStart(2, '0') + '  ' + tr(P[sel].d.name) + (lang() === 'en' ? '  · details ↓' : '  · 看說明 ↓'); }
  }
  function renderInfo(){
    const u = ui();
    if (!sel){
      info.innerHTML = '<p class="kick">AEM-25 · 13</p><h3>' + u.introH + '</h3><p>' + u.introP + '</p><p class="muted">' + u.layers + '</p>';
      keyNames(info);
      return;
    }
    const p = P[sel], d = p.d, i = p.idx;
    const dims = d.dims.map(x => '<div><dt>' + tr(x.k) + '</dt><dd>' + tr(x.v) + '</dd></div>').join('');
    info.innerHTML =
      '<p class="kick">' + u.count(i + 1, PARTS.length) + '</p>' +
      '<h3 id="info-h" tabindex="-1">' + tr(d.name) + '</h3>' +
      '<p class="mat"><span>' + u.material + '</span>' + tr(d.mat) + '</p>' +
      '<dl class="dims">' + dims + '</dl>' +
      '<p>' + tr(d.desc) + '</p>' +
      (d.note ? '<p class="note">' + tr(d.note) + '</p>' : '') +
      '<div class="nav"><button type="button" data-step="-1">← ' + u.prev + '</button>' +
      '<button type="button" data-step="0" class="clear">' + u.clear + '</button>' +
      '<button type="button" data-step="1">' + u.next + ' →</button></div>';
  }
  info.addEventListener('click', e => {
    const b = e.target.closest('button[data-step]'); if (!b) return;
    const s = +b.dataset.step;
    if (s === 0) select(null);
    else { const n = PARTS.length, i = (P[sel].idx + s + n) % n; select(PARTS[i].id, { focusInfo: false }); }
  });
  let ariaT = 0;
  function aria(){
    clearTimeout(ariaT);
    ariaT = setTimeout(() => canvas.setAttribute('aria-label', ui().canvas(sel ? tr(P[sel].d.name) : '', E)), 120);
  }

  const INNER = new Set(['ins_c','fp_c','gk_c','pt_c','mem','pt_a','gk_a','fp_a','ins_a']);
  function select(id, opt = {}){
    sel = id && P[id] ? id : null;
    refreshTargets();
    listBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.id === sel)));
    for (const k in pins) pins[k].classList.toggle('on', k === sel);
    if (sel && INNER.has(sel) && E < .45) tweenTo(.72);
    renderInfo(); aria(); hideHint();
    const chip = $('selchip');
    if (sel){ chip.hidden = false; chip.textContent = String(P[sel].idx + 1).padStart(2, '0') + '  ' + tr(P[sel].d.name) + (lang() === 'en' ? '  · details ↓' : '  · 看說明 ↓'); }
    else chip.hidden = true;
    try { history.replaceState(null, '', sel ? '#p=' + sel : location.pathname + location.search); } catch (e) {}
    if (opt.focusInfo && sel){ const h = $('info-h'); if (h) h.focus({ preventScroll: true }); }
    needs = true;
  }
  list.addEventListener('click', e => { const b = e.target.closest('button[data-id]'); if (b) select(b.dataset.id === sel ? null : b.dataset.id); });
  pinsHost.addEventListener('click', e => { const b = e.target.closest('.pin'); if (b) select(b.dataset.id === sel ? null : b.dataset.id); });

  /* ── 點選與滑過 ── */
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pick(cx, cy){
    const r = canvas.getBoundingClientRect();
    ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    for (const h of ray.intersectObjects(pickables, false)){
      const p = P[h.object.userData.pid];
      if (p && p.op > .05) return p.id;
    }
    return null;
  }
  let down = null;
  canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; hideHint(); });
  canvas.addEventListener('pointerup', e => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t; down = null;
    if (moved > 6 || dt > 600) return;
    const id = pick(e.clientX, e.clientY);
    select(id === sel ? null : id);
  });
  let hovQ = null;
  canvas.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || e.buttons) { hoverTip.classList.remove('on'); return; }
    hovQ = { x: e.clientX, y: e.clientY };
  }, { passive: true });
  canvas.addEventListener('pointerleave', () => { hovQ = null; setHover(null); });
  function setHover(id, x, y){
    if (id !== hov){ hov = id; refreshTargets(); canvas.style.cursor = id ? 'pointer' : 'grab'; }
    if (id){
      const r = vp.getBoundingClientRect();
      hoverTip.textContent = String(P[id].idx + 1).padStart(2, '0') + '  ' + tr(P[id].d.name);
      hoverTip.style.transform = 'translate(' + (x - r.left + 14) + 'px,' + (y - r.top + 14) + 'px)';
      hoverTip.classList.add('on');
    } else hoverTip.classList.remove('on');
  }

  /* ── 工具列 ── */
  const slider = $('explode'), out = $('explodeVal');
  let tw = null;
  function setE(v){
    E = Math.min(1, Math.max(0, v)); slider.value = Math.round(E * 100);
    out.textContent = ui().explodeVal(E); slider.setAttribute('aria-valuetext', ui().explodeVal(E));
    needs = true; aria();
  }
  function tweenTo(b, d){ tw = { a: E, b, t0: performance.now(), d: reduce ? 1 : (d || 900) }; }
  slider.addEventListener('input', () => { tw = null; setE(slider.value / 100); hideHint(); });
  $('btnAssemble').addEventListener('click', () => tweenTo(0));
  $('btnExplode').addEventListener('click', () => tweenTo(1));
  $('btnReset').addEventListener('click', () => { resetView(); select(null); tweenTo(.72); });

  vp.addEventListener('keydown', e => {
    if (e.target !== vp) return;
    const k = e.key; let used = true;
    if (k === 'ArrowLeft') orbitBy(.12, 0, 1); else if (k === 'ArrowRight') orbitBy(-.12, 0, 1);
    else if (k === 'ArrowUp') orbitBy(0, -.08, 1); else if (k === 'ArrowDown') orbitBy(0, .08, 1);
    else if (k === '+' || k === '=') orbitBy(0, 0, .9); else if (k === '-' || k === '_') orbitBy(0, 0, 1.1);
    else if (k === 'Escape') select(null); else used = false;
    if (used){ e.preventDefault(); hideHint(); }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && sel && vp.contains(document.activeElement)) select(null); });

  const hint = $('hint');
  function hideHint(){ if (hint) hint.classList.add('off'); }

  /* ── 圖釘位置 ── */
  const v3 = new THREE.Vector3();
  let W = 1, H = 1;
  function updatePins(){
    const innerOp = sm(.22, .42, E);
    for (const id in P){
      const p = P[id], b = pins[id];
      let op = INNER.has(id) ? innerOp : 1;
      if (sel && id !== sel) op *= .45;
      p.anchor.getWorldPosition(v3); v3.project(camera);
      if (v3.z > 1 || op < .05){ b.style.opacity = 0; b.style.pointerEvents = 'none'; b.tabIndex = -1; continue; }
      const x = (v3.x * .5 + .5) * W, y = (-v3.y * .5 + .5) * H;
      b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translate(-50%,-50%)';
      b.style.opacity = op; b.style.pointerEvents = op > .3 ? 'auto' : 'none'; b.tabIndex = op > .3 ? 0 : -1;
    }
  }

  /* ── 尺寸、可見度 ── */
  function resize(){
    W = Math.max(1, vp.clientWidth); H = Math.max(1, vp.clientHeight);
    renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
    if (!userMoved && !camTw) camera.position.copy(homePos());
    needs = true;
  }
  new ResizeObserver(resize).observe(vp);
  let visible = true, introDone = false;
  new IntersectionObserver(es => {
    visible = es[0].isIntersecting; if (visible) needs = true;
    if (visible && !introDone){ introDone = true; if (!sel) setTimeout(() => { if (!tw && E === 0) tweenTo(.72, 1800); }, 350); }
  }, { threshold: .25 }).observe(vp);

  /* ── 主迴圈：有變化才重繪 ── */
  let needs = true;
  function loop(now){
    requestAnimationFrame(loop);
    if (!visible) return;
    let ch = false;
    if (tw){ const k = Math.min(1, (now - tw.t0) / tw.d); setE(tw.a + (tw.b - tw.a) * ease(k)); if (k >= 1) tw = null; ch = true; }
    if (camTw){
      const k = ease(Math.min(1, (now - camTw.t0) / camTw.d));
      camera.position.lerpVectors(camTw.p0, camTw.p1, k); controls.target.lerpVectors(camTw.q0, camTw.q1, k);
      if (k >= 1) camTw = null; ch = true;
    }
    if (controls.update()) ch = true;
    if (stepParts()) ch = true;
    if (hovQ){ const q = hovQ; hovQ = null; setHover(pick(q.x, q.y), q.x, q.y); }
    if (ch || needs){
      needs = false; applyExplode(); scene.updateMatrixWorld(); camera.updateMatrixWorld();
      renderer.render(scene, camera); updatePins();
    }
  }

  /* ── 啟動 ── */
  addEventListener('themechange', () => { paint(); texts(); });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { paint(); texts(); });
  addEventListener('langchange', texts);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { drawDecals(); needs = true; });
  keyNames(document);
  paint(); texts(); resize(); setE(0);
  const m = /^#p=([a-z_]+)$/.exec(location.hash);
  if (m && P[m[1]]){ introDone = true; setE(INNER.has(m[1]) ? .72 : 0); select(m[1]); requestAnimationFrame(() => document.getElementById('explore').scrollIntoView()); }
  document.body.classList.add('gl-ready');
  requestAnimationFrame(loop);
  window.AEM = { select, setExplode: v => { tw = null; setE(v); }, parts: () => Object.keys(P),
    setView: (pos, tgt) => { userMoved = true; camTw = null; camera.position.set(...pos); controls.target.set(...tgt); needs = true; } };
}
