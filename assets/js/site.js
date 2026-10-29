/* 語言與主題切換（不依賴 3D；3D 模組監聽 langchange / themechange） */
(function(){
  var d = document.documentElement;
  var TITLE = { zh: 'AEM-25 單電池測試治具｜互動爆炸圖', en: 'AEM-25 Single-Cell Test Fixture | Interactive Exploded View' };
  var store = function(k, v){ try { localStorage.setItem(k, v); } catch (e) {} };
  var cur = function(){ return d.lang === 'en' ? 'en' : 'zh'; };

  function applyLang(){
    var l = cur();
    document.title = TITLE[l];
    document.querySelectorAll('[data-label-' + l + ']').forEach(function(el){ el.setAttribute('aria-label', el.getAttribute('data-label-' + l)); });
    document.querySelectorAll('[data-alt-' + l + ']').forEach(function(el){ el.setAttribute('alt', el.getAttribute('data-alt-' + l)); });
  }
  document.getElementById('lang').addEventListener('click', function(){
    var next = cur() === 'en' ? 'zh' : 'en';
    d.lang = next === 'en' ? 'en' : 'zh-Hant';
    store('aem25-lang', next); applyLang();
    dispatchEvent(new Event('langchange'));
  });

  var mq = matchMedia('(prefers-color-scheme: dark)');
  var dark = function(){ var t = d.dataset.theme; return t ? t === 'dark' : mq.matches; };
  var themeBtn = document.getElementById('theme');
  function syncTheme(){ themeBtn.setAttribute('aria-pressed', String(dark())); }
  themeBtn.addEventListener('click', function(){
    d.dataset.theme = dark() ? 'light' : 'dark';
    store('aem25-theme', d.dataset.theme); syncTheme();
    dispatchEvent(new Event('themechange'));
  });
  mq.addEventListener('change', syncTheme);

  /* 設計卡片的「在爆炸圖看」：選取零件並捲到爆炸圖 */
  document.querySelectorAll('a[data-part]').forEach(function(a){
    a.addEventListener('click', function(e){
      if (!window.AEM) return;
      e.preventDefault(); window.AEM.select(a.getAttribute('data-part'));
      document.getElementById('explore').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });

  applyLang(); syncTheme();
})();
