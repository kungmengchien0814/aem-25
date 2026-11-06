/* AEM-25 Rev D 零件資料（中／英）
 * 數字來源：AEM-25 Rev D 設計包（2026-11-06：geom.py / calcs.py / land_fem.py / verify.py 409 項）。
 * 改數字時，index.html 的「關鍵數字」與「規格」兩段也要一起改。 */

export const PARTS = [
  {
    id: 'ep_c', side: 'c',
    name: { zh: '陰極端板', en: 'Cathode end plate' },
    mat:  { zh: '6061-T6 鋁，硬陽極處理（藍）', en: '6061-T6 aluminium, hard-anodised (blue)' },
    dims: [
      { k: { zh: '外形', en: 'Size' }, v: '110 × 110 × 25 mm, R8' },
      { k: { zh: '螺栓孔', en: 'Bolt holes' }, v: { zh: '8 個 M6，四角加四邊中點（邊長 90 mm）', en: '8 × M6 at the corners and edge midpoints of a 90 mm square' } },
    ],
    desc: {
      zh: '承受八支螺栓的夾持力，筒式加熱器也裝在端板裡。鋁的導熱係數 167 W/m·K，約是 316L 的十倍，整片也輕得多。代價是鋁會被 KOH 溶解，所以端板從頭到尾不接觸電解液。',
      en: 'Carries the clamping load of the eight bolts and holds the cartridge heaters. Aluminium conducts heat at 167 W/m·K, about ten times 316L, and weighs far less. KOH dissolves aluminium, so the end plate never touches the electrolyte.'
    },
    note: { zh: '正面的 NCUT 是示意字樣，不是官方標誌。', en: 'The NCUT lettering on the face is a placeholder, not an official mark.' },
  },
  {
    id: 'ins_c', side: 'c',
    name: { zh: '陰極 PEEK 屏障', en: 'Cathode PEEK barrier' },
    mat:  { zh: 'PEEK', en: 'PEEK' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: '110 × 110 × 0.5 mm' } ],
    desc: {
      zh: '夾在端板和流道板之間，做兩件事。第一是電絕緣：兩片端板經螺栓同電位，流道板各自帶電。第二是化學屏障：它做到和端板一樣大，KOH 碰不到鋁。',
      en: 'Sits between the end plate and the flow plate and does two jobs. It insulates: both end plates share potential through the bolts while each flow plate carries its own. It also blocks chemistry: cut to the full end-plate size, it keeps KOH off the aluminium.'
    },
    note: { zh: '做成全面積後，10 W 時端板到流道板的溫差約 1.65 K（Rev A 的小片約 3 K）。', en: 'At full size, the end-plate-to-flow-plate temperature drop at 10 W is about 1.65 K (the small Rev A sheet gave about 3 K).' },
  },
  {
    id: 'fp_c', side: 'c',
    name: { zh: '陰極流道板', en: 'Cathode flow plate' },
    mat:  { zh: '實心鎳（AEM-25-002C）', en: 'Solid nickel (AEM-25-002C)' },
    dims: [
      { k: { zh: '外形', en: 'Size' }, v: '80 × 80 × 15 mm' },
      { k: { zh: '極耳', en: 'Tab' }, v: { zh: '28 × 34 × 6 mm，上緣右側', en: '28 × 34 × 6 mm, top right' } },
      { k: { zh: '流道', en: 'Channels' }, v: { zh: '5 並聯 × 5 道次，25 條 1.00 × 1.00 mm，總長 280 mm', en: '5 parallel × 5 passes, 25 × 1.00 × 1.00 mm, 280 mm total' } },
      { k: { zh: '進出口', en: 'Ports' }, v: { zh: '2 × 1/4-28 UNF，左下進、右上出', en: '2 × 1/4-28 UNF, in at lower left, out at upper right' } },
    ],
    desc: {
      zh: '從陰極端看，電解液左下進、右上出，和陽極那片走同一條對角線。出口要落在入口的對角，道次就得是奇數，所以是 5 並聯 × 5 道次。極耳在上緣右側，從板厚正中央直接銑出來：M6 孔接電流，Ø4.3 孔接四線量測的電壓線，量電壓的線上沒有電流。',
      en: 'Seen from the cathode end, electrolyte enters at the lower left and leaves at the upper right, on the same diagonal as the anode plate. An odd number of passes is what puts the outlet diagonally opposite the inlet, hence 5 parallel × 5 passes. The tab sits at the top right, machined from the mid-thickness of the plate: the M6 hole carries current and the Ø4.3 hole takes the four-wire voltage sense lead, which carries none.'
    },
    note: { zh: '和陽極板 002A 互為鏡像（流道、進出口、熱偶孔），極耳相同。這片轉 180° 裝上，極耳落在右上，和陽極極耳左右相隔 16 mm，前後再隔 9.56 mm；上方中間那支拉桿從兩片極耳之間穿過。', en: 'A mirror image of the anode plate 002A (channels, ports, thermocouple bore) with the same tab. Fitted turned 180°, its tab lands at the top right, 16 mm from the anode tab side to side and 9.56 mm front to back; the top-centre tie bolt runs between the two tabs.' },
  },
  {
    id: 'gk_c', side: 'c',
    name: { zh: '陰極墊片', en: 'Cathode gasket' },
    mat:  { zh: 'PTFE', en: 'PTFE' },
    dims: [
      { k: { zh: '厚度', en: 'Thickness' }, v: '10 mil (0.254 mm)' },
      { k: { zh: '窗口', en: 'Window' }, v: '51.5 × 51.5 mm' },
    ],
    desc: {
      zh: '窗口比陽極墊片大 1 mm，兩道切邊錯開 0.5 mm，膜不會在同一條線上被兩邊剪到。PTFE 幾乎不被壓縮，它是硬止擋：夾緊後兩片流道板的間距由墊片厚度決定，螺栓再鎖緊也不會多壓 PTL。不過 PTFE 長時間受壓會慢慢潛變，這個間距可能隨運轉時間略縮。',
      en: 'The window is 1 mm larger than the anode gasket, so the two cut edges sit 0.5 mm apart and never shear the membrane on one line. PTFE barely compresses, so the gasket works as a hard stop: once clamped, the flow-plate gap equals the gasket thickness, and extra bolt torque does not squeeze the PTL further. PTFE does creep under sustained load, though, so the gap can close slightly over long runs.'
    },
    note: { zh: '另備 9 和 11 mil。每次組裝前先量 PTL 厚度，再挑墊片組合。', en: 'Spare 9 and 11 mil gaskets let you pick a pair after measuring the PTL before each build.' },
  },
  {
    id: 'pt_c', side: 'c',
    name: { zh: '陰極 PTL', en: 'Cathode PTL' },
    mat:  { zh: '鎳氈', en: 'Nickel felt' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: { zh: '51 × 51 mm，放在 51.5 mm 窗口內', en: '51 × 51 mm, inside the 51.5 mm window' } } ],
    desc: {
      zh: '多孔傳輸層（PTL）讓水進到電極、讓氣體離開，同時把電流傳到流道板。它比墊片留下的間隙厚，夾緊後被壓縮。10 + 10 mil 墊片時標稱應變 7.4 %，面壓約 0.15 MPa。',
      en: 'The porous transport layer lets water reach the electrode, lets gas out, and carries current to the flow plate. It is thicker than the gap the gaskets leave, so clamping compresses it: 7.4 % nominal strain and about 0.15 MPa with 10 + 10 mil gaskets.'
    },
    note: { zh: '0.15 MPa 是估計值，用的是假設的等效模數 2.0 MPa，首次組裝會用感壓紙驗證。碳紙列為這一側的選項，要先在約 0.2 MPa 下量過厚度才會用。', en: '0.15 MPa is an estimate based on an assumed 2.0 MPa effective modulus. The first build will check it with pressure-sensitive film. Carbon paper is an option for this side only after its thickness is measured at about 0.2 MPa.' },
  },
  {
    id: 'mem', side: 'm',
    name: { zh: 'AEM 膜', en: 'AEM membrane' },
    mat:  { zh: '陰離子交換膜', en: 'Anion exchange membrane' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: { zh: '66 × 66 mm，厚 50 µm', en: '66 × 66 mm, 50 µm thick' } } ],
    desc: {
      zh: '陰極把水還原成氫氣和 OH⁻，OH⁻ 穿過膜到陽極放出氧氣。觸媒區 50 × 50 mm 置中；膜邊緣夾在兩片墊片之間，密封帶陰極側 7.25 mm、陽極側 7.75 mm，膜邊在板緣內 7 mm。',
      en: 'The cathode reduces water to hydrogen and OH⁻. The OH⁻ ions cross the membrane to the anode, which releases oxygen. The 50 × 50 mm catalyst area is centred; the two gaskets clamp the rim, a 7.25 mm seal band on the cathode side and 7.75 mm on the anode side, with the membrane edge 7 mm inside the plate edge.'
    },
    note: { zh: '兩片墊片加膜，夾緊後總厚 0.558 mm。爆炸圖裡這幾層有加厚，才看得見。', en: 'Gaskets plus membrane total 0.558 mm when clamped. The exploded view draws these layers thicker so you can see them.' },
  },
  {
    id: 'pt_a', side: 'a',
    name: { zh: '陽極 PTL', en: 'Anode PTL' },
    mat:  { zh: '鎳氈', en: 'Nickel felt' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: { zh: '50 × 50 mm，放在 50.5 mm 窗口內', en: '50 × 50 mm, inside the 50.5 mm window' } } ],
    desc: {
      zh: '和陰極用同一種鎳氈。它和觸媒區一起定義 50 × 50 mm 的活性面積。鎳在鹼液裡穩定，可以直接放在產氧的陽極。兩側 PTL 一起算壓縮量，因為膜夾在中間會跟著移動。',
      en: 'The same nickel felt as the cathode; with the catalyst area it defines the 50 × 50 mm active area. Nickel is stable in alkaline electrolyte, so it can sit on the oxygen-evolving anode. Compression is calculated for both PTLs together, because the membrane between them floats.'
    },
    note: null,
  },
  {
    id: 'gk_a', side: 'a',
    name: { zh: '陽極墊片', en: 'Anode gasket' },
    mat:  { zh: 'PTFE', en: 'PTFE' },
    dims: [
      { k: { zh: '厚度', en: 'Thickness' }, v: '10 mil (0.254 mm)' },
      { k: { zh: '窗口', en: 'Window' }, v: '50.5 × 50.5 mm' },
    ],
    desc: {
      zh: '和陰極墊片一起決定 MEA 區的總厚度。只用 PTFE：剛性的 PEEK 壓在金屬面上不會密封，除非另外加 O 型環。',
      en: 'Together with the cathode gasket it sets the total MEA-zone thickness. Only PTFE is used: rigid PEEK pressed against metal does not seal without an added O-ring.'
    },
    note: { zh: '墊片總厚每差 1 mil（25.4 µm），PTL 面壓約差 0.10 MPa（估計值）。', en: 'Each 1 mil (25.4 µm) of total gasket thickness shifts PTL pressure by about 0.10 MPa (estimate).' },
  },
  {
    id: 'fp_a', side: 'a',
    name: { zh: '陽極流道板', en: 'Anode flow plate' },
    mat:  { zh: '實心鎳（AEM-25-002A）', en: 'Solid nickel (AEM-25-002A)' },
    dims: [
      { k: { zh: '外形', en: 'Size' }, v: '80 × 80 × 15 mm' },
      { k: { zh: '流道', en: 'Channels' }, v: { zh: '5 並聯 × 5 道次，25 條', en: '5 parallel × 5 passes, 25 channels' } },
      { k: { zh: '極耳', en: 'Tab' }, v: { zh: '28 × 34 × 6 mm，上緣左側（從陰極側看）', en: '28 × 34 × 6 mm, top left (seen from the cathode side)' } },
      { k: { zh: '極耳面積電阻', en: 'Tab ASR' }, v: { zh: '≤ 0.73 mΩ·cm²（50 A 時 1.46 mV）', en: '≤ 0.73 mΩ·cm² (1.46 mV at 50 A)' } },
      { k: { zh: '定位銷', en: 'Dowel pins' }, v: { zh: '2 × PEEK Ø4 × 8.5，在 (36, 36) 與 (−36, −36)', en: '2 × PEEK Ø4 × 8.5 at (36, 36) and (−36, −36)' } },
    ],
    desc: {
      zh: '陰極板 002C 的鏡像，極耳相同，在上緣左側。進出口照 Rev C 直出側面：拉桿改成正方形排列後，側邊的拉桿只在中間和四角，不會擋到接頭。實心鎳沒有鍍層可破，也沒有 Fe／Cr 溶出。',
      en: 'The mirror image of the cathode plate 002C, with the same tab at the top left. The ports run straight out of the sides as in Rev C: with the tie bolts now on a square, the side bolts sit only at the middle and the corners, clear of the fittings. Solid nickel has no plating to breach and leaches no Fe or Cr.'
    },
    note: { zh: '60 mL/min 時液相壓損約 1.00 kPa；2 A/cm² 時陰極出口流速 1.96 m/s。', en: 'Liquid pressure drop is about 1.00 kPa at 60 mL/min; at 2 A/cm² the cathode outlet runs at 1.96 m/s.' },
  },
  {
    id: 'ins_a', side: 'a',
    name: { zh: '陽極 PEEK 屏障', en: 'Anode PEEK barrier' },
    mat:  { zh: 'PEEK', en: 'PEEK' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: '110 × 110 × 0.5 mm' } ],
    desc: {
      zh: '和陰極側相同。它是阻止 KOH 接觸鋁端板的唯一零件，所以做成整片，不開多餘的孔。',
      en: 'Identical to the cathode side. It is the only part that keeps KOH away from the aluminium end plate, so it stays one full sheet with no extra openings.'
    },
    note: { zh: '端板的硬陽極層也絕緣，屏障是第二道。', en: 'The hard-anodised layer on the end plate also insulates. The barrier is the second line.' },
  },
  {
    id: 'ep_a', side: 'a',
    name: { zh: '陽極端板', en: 'Anode end plate' },
    mat:  { zh: '6061-T6 鋁，硬陽極處理（藍）', en: '6061-T6 aluminium, hard-anodised (blue)' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: '110 × 110 × 25 mm, R8' } ],
    desc: {
      zh: '組裝從這片開始：螺栓先穿過陽極端板，其他零件再依序往上疊。端板的接地面不做硬陽，加熱器外殼才能經端板接地。',
      en: 'Assembly starts here: the bolts go through the anode end plate first, then the other parts stack on top. The end plates keep their grounding face masked from anodising so the heater sheaths can ground through the plate.'
    },
    note: { zh: '全機 4 × 100 W 筒式加熱器；不通液升溫約 3.6 分鐘，電解液要先在儲槽預熱。', en: 'Four 100 W cartridge heaters in total; about 3.6 min to warm up without flow, and the electrolyte must be preheated in the reservoir.' },
  },
  {
    id: 'bolts', side: 'x',
    name: { zh: '夾持組', en: 'Clamping set' },
    mat:  { zh: 'A4-70 不鏽鋼螺栓、絕緣套管、碟簧', en: 'A4-70 stainless bolts, insulating sleeves, disc springs' },
    dims: [
      { k: { zh: '螺栓', en: 'Bolts' }, v: '8 × M6 × 100' },
      { k: { zh: '排列', en: 'Pattern' }, v: { zh: '四角加四邊中點，邊長 90 mm', en: 'Corners and edge midpoints of a 90 mm square' } },
      { k: { zh: '碟簧', en: 'Springs' }, v: { zh: '每支 3 片 DIN 2093 A 12.5 × 6.2 × 0.7，並聯', en: '3 × DIN 2093 A 12.5 × 6.2 × 0.7 per bolt, in parallel' } },
      { k: { zh: '扭力', en: 'Torque' }, v: '1.0 N·m (0.8–1.2, max 1.3)' },
      { k: { zh: '夾持高度', en: 'Stack height' }, v: '81.558 mm' },
    ],
    desc: {
      zh: '扭力由墊片密封面需要的 5 MPa 反推，只要 1.0 N·m，比一般扭力扳手的量程還低，所以要用 0.3–2.0 N·m 的扭力起子。有碟簧時，升溫到 60 °C 每支軸力只多 120 N（+11 %）；碟簧若被壓平，會多 718 N。兩片絕緣片之間的桿身套 PTFE 套管。',
      en: 'Torque is back-calculated from the 5 MPa the gasket seal needs, which gives just 1.0 N·m. That sits below the range of a typical torque wrench, so assembly uses a 0.3–2.0 N·m torque screwdriver. With the disc springs, heating to 60 °C adds only 120 N per bolt (+11 %); with the springs flattened it would add 718 N. A PTFE sleeve covers each shank between the two insulators.'
    },
    note: { zh: '碟簧利用率 43 %，扭力多 25 % 時 54 %，不會被壓平。螺帽側順序：端板｜PEEK 墊圈｜鋼墊圈｜3 片碟簧｜螺帽。Rev D 把螺栓改成正方形排列，讓出上緣給兩片極耳；板殼模型算出密封面壓 4.5–6.4 MPa，和 Rev C 圓形排列的 4.6–6.3 MPa 幾乎一樣。', en: 'Spring utilisation is 43 %, rising to 54 % at +25 % torque, so the springs never bottom out. Nut side, in order: end plate | PEEK washer | steel washer | 3 disc springs | nut. Rev D moves the bolts onto a square to clear the top edge for the two tabs; a plate model puts the seal stress at 4.5–6.4 MPa, almost the same as the 4.6–6.3 MPa of the Rev C circle.' },
  },
  {
    id: 'base', side: 'x',
    name: { zh: '立式底座', en: 'Upright stand' },
    mat:  { zh: 'PP（聚丙烯）', en: 'PP (polypropylene)' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: '150 × 100 × 15 mm' } ],
    desc: {
      zh: '治具立著用，兩側流道都是左下進、右上出（從陰極端看），氣泡順著流動方向往上排。橫躺著用，蛇形流道的兩相流估算就不成立。',
      en: 'The cell runs upright, with both flow fields fed bottom-left and drained top-right (seen from the cathode end), so bubbles rise with the flow. Lying flat, the two-phase estimates for the serpentine no longer hold.'
    },
    note: null,
  },
];

export const UI = {
  zh: {
    material: '材料', dims: '尺寸', note: '附註', prev: '上一個', next: '下一個',
    count: (i, n) => String(i).padStart(2, '0') + ' / ' + n,
    pin: (i, name) => '第 ' + i + ' 號：' + name,
    canvas: (sel, e) => 'AEM-25 3D 爆炸圖，拆開 ' + Math.round(e * 100) + ' %' + (sel ? '，已選：' + sel : '') + '。可用方向鍵旋轉，加減號縮放。',
    explodeVal: e => Math.round(e * 100) + ' %',
    introH: '點一個零件', introP: '在模型上點零件，或從清單挑。拖曳可以旋轉，<span class="on-mouse">按住 <kbd class="zk">Ctrl</kbd> 滾動或用觸控板雙指</span><span class="on-touch">雙指</span>可以縮放。',
    layers: '十一層，由陰極到陽極：端板、PEEK 屏障、流道板、墊片、PTL、膜，再對稱回到陽極端板。另外兩組是夾持組和底座。',
    clear: '取消選取',
  },
  en: {
    material: 'Material', dims: 'Dimensions', note: 'Note', prev: 'Previous', next: 'Next',
    count: (i, n) => String(i).padStart(2, '0') + ' / ' + n,
    pin: (i, name) => 'Part ' + i + ': ' + name,
    canvas: (sel, e) => 'AEM-25 3D exploded view, ' + Math.round(e * 100) + ' % apart' + (sel ? ', selected: ' + sel : '') + '. Arrow keys rotate, plus and minus zoom.',
    explodeVal: e => Math.round(e * 100) + ' %',
    introH: 'Pick a part', introP: '<span class="on-mouse">Click</span><span class="on-touch">Tap</span> a part on the model or choose one from the list. Drag to rotate; <span class="on-mouse">hold <kbd class="zk">Ctrl</kbd> and scroll, or pinch on a trackpad,</span><span class="on-touch">pinch</span> to zoom.',
    layers: 'Eleven layers from cathode to anode: end plate, PEEK barrier, flow plate, gasket, PTL and membrane, then the mirror image back out to the anode end plate. The clamping set and stand make thirteen groups.',
    clear: 'Clear selection',
  },
};
