/* ── common.js：全ページで共通して動かす処理 ── */

document.addEventListener('DOMContentLoaded', function () {

  // ── スクロールでふわっと表示させる ──
  // 1. class="fade-in" が付いた要素を集める
  // 2. 画面に入ったかを IntersectionObserver で監視する
  // 3. 入ったら is-visible クラスを付ける → common.css の .fade-in.is-visible で表示される

  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');

        // 一度表示したら監視をやめる
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,                        // 10%見えたら反応
      rootMargin: '0px 0px -40px 0px'        // 画面下端の40px手前で反応
    }
  );

  fadeElements.forEach(function (element) {
    observer.observe(element);
  });

});
