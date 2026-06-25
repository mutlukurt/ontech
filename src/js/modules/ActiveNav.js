/**
 * ActiveNav Component
 * Highlights active navigation link based on scroll position
 */
import { throttle } from '../utils/throttle.js';

export default class ActiveNav {
  constructor(options = {}) {
    this.sectionSelector = options.sectionSelector || 'section[id]';
    this.linkSelector = options.linkSelector || '.nav__link[href^="#"]';
    this.sections = [];
    this.links = [];
    this.init();
  }

  init() {
    this.sections = document.querySelectorAll(this.sectionSelector);
    this.links = document.querySelectorAll(this.linkSelector);

    if (this.sections.length === 0 || this.links.length === 0) return;

    window.addEventListener('scroll', throttle(this.onScroll.bind(this), 100), { passive: true });
  }

  onScroll() {
    let current = '';

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    this.links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
