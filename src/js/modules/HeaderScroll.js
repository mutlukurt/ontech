/**
 * HeaderScroll Component
 * Adds shadow & shrink effect on header when scrolling
 */
export default class HeaderScroll {
  constructor(selector = '.header', threshold = 10) {
    this.header = document.querySelector(selector);
    this.threshold = threshold;
    this.init();
  }

  init() {
    if (!this.header) return;
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
  }

  onScroll() {
    if (window.pageYOffset > this.threshold) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
