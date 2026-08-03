/* ── index.js：トップページ専用の処理 ── */
// 紙の傾きを、読み込みのたびにほんの少しだけ変える
// 毎回まったく同じ角度だと「作り物」に見えるため、±0.6度の範囲でゆらぎを足している

document.addEventListener('DOMContentLoaded', function () {

  // 「動きが苦手」設定の人には何もしない
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return;
  }

  // 傾きクラスと、その基準角度の対応表
  const baseAngles = {
    'tilt-l1': -1.2,
    'tilt-l2': -2.2,
    'tilt-r1': 1.2,
    'tilt-r2': 2.0
  };

  const papers = document.querySelectorAll('.paper');

  papers.forEach(function (paper) {

    // この紙に付いている傾きクラスを探す
    let base = null;

    Object.keys(baseAngles).forEach(function (className) {
      if (paper.classList.contains(className)) {
        base = baseAngles[className];
      }
    });

    // 傾きクラスが無い紙は何もしない
    if (base === null) {
      return;
    }

    // -0.6 〜 +0.6 のランダムな値を作って足す
    const wobble = (Math.random() - 0.5) * 1.2;
    const angle = base + wobble;

    paper.style.transform = 'rotate(' + angle.toFixed(2) + 'deg)';
  });

});
