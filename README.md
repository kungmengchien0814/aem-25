# AEM-25 單電池測試治具 · Single-Cell Test Fixture

**網站 / Live site:** https://kungmengchien.uk/aem-25/

![AEM-25 exploded view](assets/img/og.png)

AEM-25 是陰離子交換膜（AEM）水電解用的 25 cm² 單電池測試治具，在 1 M KOH、60 °C 下測一片 MEA。這個網站用互動 3D 爆炸圖介紹 13 個零件群組：拖曳旋轉、拉桿拆開，點任何零件就能看到材料、尺寸和設計理由。

AEM-25 is a 25 cm² single-cell test fixture for anion exchange membrane (AEM) water electrolysis, testing one MEA in 1 M KOH at 60 °C. The site presents its 13 part groups as an interactive 3D exploded view: drag to rotate, slide to take it apart, and click any part for its material, dimensions and design rationale.

> **設計階段 / Design stage.** 治具尚未加工。數字來自 2026-10-14 的 Rev C 設計文件。The fixture has not been machined yet; figures come from the Rev C design documents dated 2026-10-14.

## 功能 / Features

- 互動爆炸圖：點選零件、編號標籤或清單，拆開程度可調，可用鍵盤操作
  Interactive exploded view with click-to-inspect, number tags, a parts list, an explode slider and keyboard controls
- 中文／English 切換，預設中文（`?lang=en` 直接開英文）；深色／淺色主題
  Chinese / English toggle, Chinese by default (`?lang=en` opens in English); light / dark themes
- 連結可直接指向零件，例如 `#p=fp_c`
  Deep links to a part, e.g. `#p=fp_c`
- 純靜態網站，不需要建置；three.js 放在 repo 內，不依賴外部 CDN
  Plain static files with no build step; three.js is vendored, no CDN dependency

## 檔案 / Files

| 路徑 Path | 用途 Purpose |
|---|---|
| `index.html` | 頁面、簡介、設計重點、關鍵數字、規格 / Page, intro, design notes, key numbers, specs |
| `assets/js/content.js` | 13 個零件的中英文說明 / Part descriptions (zh / en) |
| `assets/js/app.js` | 3D 模型與互動（尺寸單位 mm）/ 3D model and interaction (dimensions in mm) |
| `assets/js/site.js` | 語言與主題切換 / Language and theme toggles |
| `assets/css/site.css` | 樣式 / Styles |
| `assets/vendor/three/` | three.js r160（MIT） |
| `assets/img/` | 首圖、分享圖、圖示 / Hero, share image, icons |

改數字時，`content.js` 和 `index.html` 的「關鍵數字」「規格」兩段要一起改。
When a figure changes, update `content.js` and the numbers and specs sections in `index.html` together.

## 本機預覽 / Local preview

```bash
python3 -m http.server 8000
# 開啟 / open http://localhost:8000/
```

直接雙擊 `index.html` 會因為 ES module 的限制無法載入 3D，要用上面的本機伺服器。
Opening `index.html` from the file system will not load the 3D view (ES module restrictions); use a local server.

## 備註 / Notes

- 端板上的 NCUT 是示意字樣，不是國立勤益科技大學的官方標誌。
  The NCUT lettering on the end plate is a placeholder, not the official mark of National Chin-Yi University of Technology.
- 3D 模型由程式依設計尺寸生成；爆炸圖中 MEA 各層有加厚顯示。
  The 3D model is generated in code from the design dimensions; the MEA layers are drawn thicker in the exploded view.
- three.js © three.js authors, MIT License (`assets/vendor/three/LICENSE`).

設計與網站 / Design & site: Meng-Chien Kung（龔孟謙）
