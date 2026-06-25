/**
 * BackToTop Component
 * Shows/hides back-to-top button and scrolls to top
 */
import { throttle } from '../utils/throttle.js';

export default class BackToTop {
  constructor(options = {}) {
    this.selector = options.selector || '.back-to-top';
    this.threshold = options.threshold || 400;
    this.button = null;
    this.init();
  }

  init() {
    this.button = document.querySelector(this.selector);
    if (!this.button) return;

    window.addEventListener('scroll', throttle(this.onScroll.bind(this), 100), { passive: true });
    this.button.addEventListener('click', this.handleClick.bind(this));
  }

  onScroll() {
    if (window.pageYOffset > this.threshold) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    this.button.removeEventListener('click', this.handleClick);
  }
}
