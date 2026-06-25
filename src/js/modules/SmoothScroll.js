/**
 * SmoothScroll Component
 * Handles smooth anchor link scrolling with offset
 */
export default class SmoothScroll {
  constructor(options = {}) {
    this.offset = options.offset || 80;
    this.selector = options.selector || 'a[href^="#"]';
    this.init();
  }

  init() {
    document.querySelectorAll(this.selector).forEach(anchor => {
      anchor.addEventListener('click', this.handleClick.bind(this));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href === '#' || !href) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - this.offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  destroy() {
    document.querySelectorAll(this.selector).forEach(anchor => {
      anchor.removeEventListener('click', this.handleClick);
    });
  }
}
