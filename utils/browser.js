// 1.平滑滚动到页面顶部
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

// 2.滚动到指定元素区域
export const smoothScroll = element => {
  document.querySelector(element).scrollIntoView({
    behavior: "smooth"
  });
};

// 3.获取滚动条距顶部高度
export function getPageScrollTop() {
  let a = document;
  return a.documentElement.scrollTop || a.body.scrollTop;
}
