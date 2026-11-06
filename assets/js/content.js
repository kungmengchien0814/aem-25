/* AEM-25 Rev D 草案零件資料（中／英）
 * 數字來源：AEM-25 設計審查與 Rev C 實作紀錄（2026-10-14）。
 * Rev D 草案（2026-11-06）改了極耳、進出口、流道和螺栓排列，受影響的數字標「待重算」。
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
    note: { zh: '全面積後，10 W 時端板到流道板的溫差算起來從約 3 K 降到 1.65 K（Rev B 計算值）。', en: 'Going full-size, the calculated end-plate-to-flow-plate temperature drop at 10 W falls from about 3 K to 1.65 K (Rev B calculation).' },
  },
  {
    id: 'fp_c', side: 'c',
    name: { zh: '陰極流道板', en: 'Cathode flow plate' },
    mat:  { zh: '實心鎳', en: 'Solid nickel' },
    dims: [
      { k: { zh: '外形', en: 'Size' }, v: '80 × 80 × 15 mm' },
      { k: { zh: '極耳', en: 'Tab' }, v: { zh: '28 × 34 × 6 mm，上緣右側', en: '28 × 34 × 6 mm, top right' } },
      { k: { zh: '流道', en: 'Channels' }, v: { zh: '25 條 1.00 × 1.00 mm，總長約 280 mm', en: '25 × 1.00 × 1.00 mm, about 280 mm total' } },
      { k: { zh: '進出口', en: 'Ports' }, v: { zh: '2 × 1/4-28 UNF，左下進、右上出', en: '2 × 1/4-28 UNF, in at lower left, out at upper right' } },
    ],
    desc: {
      zh: '流道是 5 通道並聯的蛇形，走 5 個道次，電解液左下進、右上出。道次是奇數，出口才會落在進口的對角。極耳在上緣右側，從板厚正中央直接銑出來：M6 孔接電流，Ø4.3 孔接四線量測的電壓線，量電壓的線上沒有電流。',
      en: 'A five-channel serpentine runs five passes, with electrolyte entering at the lower left and leaving at the upper right. An odd number of passes is what puts the outlet diagonally opposite the inlet. The current tab sits at the top right, machined from the mid-thickness of the plate: the M6 hole carries current and the Ø4.3 hole takes the four-wire voltage sense lead, which carries none.'
    },
    note: { zh: '陰陽極兩片的流道互為鏡像，是兩個零件：從陰極側看，兩片都是左下進、右上出，極耳一左一右，相隔 16 mm。', en: 'The anode and cathode plates are mirror images, so they are two parts: seen from the cathode side both run from lower left to upper right, and their tabs sit 16 mm apart, one on each side.' },
  },
  {
    id: 'gk_c', side: 'c',
    name: { zh: '陰極墊片', en: 'Cathode gasket' },
    mat:  { zh: 'PTFE', en: 'PTFE' },
    dims: [
      { k: { zh: '厚度', en: 'Thickness' }, v: '10 mil (0.254 mm)' },
      { k: { zh: '窗口', en: 'Window' }, v: '50 × 50 mm = 25.0 cm²' },
    ],
    desc: {
      zh: '墊片的窗口就是活性面積。PTFE 幾乎不被壓縮，它是硬止擋：夾緊後兩片流道板的間距由墊片厚度決定，螺栓再鎖緊也不會多壓 PTL。不過 PTFE 長時間受壓會慢慢潛變，這個間距可能隨運轉時間略縮。',
      en: 'The gasket window defines the active area. PTFE barely compresses, so the gasket works as a hard stop: once clamped, the flow-plate gap equals the gasket thickness, and extra bolt torque does not squeeze the PTL further. PTFE does creep under sustained load, though, so the gap can close slightly over long runs.'
    },
    note: { zh: '另備 9 和 11 mil。每次組裝前先量 PTL 厚度，再挑墊片組合。', en: 'Spare 9 and 11 mil gaskets let you pick a pair after measuring the PTL before each build.' },
  },
  {
    id: 'pt_c', side: 'c',
    name: { zh: '陰極 PTL', en: 'Cathode PTL' },
    mat:  { zh: '鎳氈', en: 'Nickel felt' },
    dims: [ { k: { zh: '位置', en: 'Fit' }, v: { zh: '放在 50 × 50 mm 墊片窗口內', en: 'Inside the 50 × 50 mm gasket window' } } ],
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
      zh: '陰極把水還原成氫氣和 OH⁻，OH⁻ 穿過膜到陽極放出氧氣。膜每邊比 50 mm 窗口大 8 mm，邊緣夾在兩片墊片之間密封。',
      en: 'The cathode reduces water to hydrogen and OH⁻. The OH⁻ ions cross the membrane to the anode, which releases oxygen. The membrane overhangs the 50 mm window by 8 mm on each side, and the two gaskets clamp that rim to seal it.'
    },
    note: { zh: '兩片墊片加膜，夾緊後總厚 0.558 mm。爆炸圖裡這幾層有加厚，才看得見。', en: 'Gaskets plus membrane total 0.558 mm when clamped. The exploded view draws these layers thicker so you can see them.' },
  },
  {
    id: 'pt_a', side: 'a',
    name: { zh: '陽極 PTL', en: 'Anode PTL' },
    mat:  { zh: '鎳氈', en: 'Nickel felt' },
    dims: [ { k: { zh: '位置', en: 'Fit' }, v: { zh: '放在 50 × 50 mm 墊片窗口內', en: 'Inside the 50 × 50 mm gasket window' } } ],
    desc: {
      zh: '和陰極用同一種鎳氈。鎳在鹼液裡穩定，可以直接放在產氧的陽極。兩側 PTL 一起算壓縮量，因為膜夾在中間會跟著移動。',
      en: 'The same nickel felt as the cathode. Nickel is stable in alkaline electrolyte, so it can sit on the oxygen-evolving anode. Compression is calculated for both PTLs together, because the membrane between them floats.'
    },
    note: null,
  },
  {
    id: 'gk_a', side: 'a',
    name: { zh: '陽極墊片', en: 'Anode gasket' },
    mat:  { zh: 'PTFE', en: 'PTFE' },
    dims: [
      { k: { zh: '厚度', en: 'Thickness' }, v: '10 mil (0.254 mm)' },
      { k: { zh: '窗口', en: 'Window' }, v: '50 × 50 mm' },
    ],
    desc: {
      zh: '和陰極墊片一起決定 MEA 區的總厚度。只用 PTFE：剛性的 PEEK 壓在金屬面上不會密封，除非另外加 O 型環。',
      en: 'Together with the cathode gasket it sets the total MEA-zone thickness. Only PTFE is used: rigid PEEK pressed against metal does not seal without an added O-ring.'
    },
    note: { zh: '墊片總厚每差 1 mil（25.4 µm），PTL 面壓約差 0.09 MPa（估計值）。', en: 'Each 1 mil (25.4 µm) of total gasket thickness shifts PTL pressure by about 0.09 MPa (estimate).' },
  },
  {
    id: 'fp_a', side: 'a',
    name: { zh: '陽極流道板', en: 'Anode flow plate' },
    mat:  { zh: '實心鎳', en: 'Solid nickel' },
    dims: [
      { k: { zh: '外形', en: 'Size' }, v: '80 × 80 × 15 mm' },
      { k: { zh: '極耳', en: 'Tab' }, v: { zh: '28 × 34 × 6 mm，上緣左側（從陰極側看）', en: '28 × 34 × 6 mm, top left (seen from the cathode side)' } },
      { k: { zh: '流道', en: 'Channels' }, v: { zh: '5 通道蛇形 × 5 道次', en: '5-channel serpentine × 5 passes' } },
    ],
    desc: {
      zh: '流道和陰極那片互為鏡像，所以從同一側看，兩片都是左下進、右上出。Rev C 改用實心鎳，取代 Rev B 的 316L 鍍鎳（10–15 µm）。',
      en: 'Its flow field mirrors the cathode plate, so seen from the same side both run from lower left to upper right. Rev C makes it from solid nickel, replacing the 316L with 10–15 µm nickel plating used in Rev B.'
    },
    note: { zh: '液相壓損待重算：Rev B 的 6 道次在 60 mL/min 時約 1.52 kPa，改成 5 道次後等比例粗估約 1.0 kPa。', en: 'Liquid pressure drop is to be recalculated: Rev B’s six passes gave about 1.52 kPa at 60 mL/min, and scaling to five passes gives roughly 1.0 kPa.' },
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
    note: { zh: '全機 4 × 100 W 筒式加熱器（Rev B 計算值）。', en: 'Four 100 W cartridge heaters in total (Rev B calculation).' },
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
      zh: '扭力由墊片密封面需要的 5 MPa 反推，只要 1.0 N·m，比一般扭力扳手的量程還低，所以要用 0.3–2.0 N·m 的扭力起子。碟簧吸收升溫到 60 °C 時每支約 120 N 的軸力變化。',
      en: 'Torque is back-calculated from the 5 MPa the gasket seal needs, which gives just 1.0 N·m. That sits below the range of a typical torque wrench, so assembly uses a 0.3–2.0 N·m torque screwdriver. The disc springs absorb about 120 N of axial change per bolt when the cell heats to 60 °C.'
    },
    note: { zh: '碟簧利用率 43 %，扭力多 25 % 時 54 %，不會被壓平。Rev D 把螺栓改成四角加四邊中點，讓出上緣給兩個極耳；扭力和碟簧仍是 Rev C 的計算值，墊片受力分布待重算。', en: 'Spring utilisation is 43 %, rising to 54 % at +25 % torque, so the springs never bottom out. Rev D moves the bolts to the corners and edge midpoints to clear the top edge for the two tabs; torque and spring figures are still the Rev C calculation, and the gasket load distribution is to be recalculated.' },
  },
  {
    id: 'base', side: 'x',
    name: { zh: '立式底座', en: 'Upright stand' },
    mat:  { zh: 'PP（聚丙烯）', en: 'PP (polypropylene)' },
    dims: [ { k: { zh: '外形', en: 'Size' }, v: '150 × 100 × 15 mm' } ],
    desc: {
      zh: '治具立著用，兩側流道都是下進上出，氣泡順著流動方向往上排。橫躺著用，蛇形流道的兩相流估算就不成立。',
      en: 'The cell runs upright, with both flow fields fed from the bottom and drained from the top, so bubbles rise with the flow. Lying flat, the two-phase estimates for the serpentine no longer hold.'
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
