/**
 * ScrollReveal Component
 * Reveals elements on scroll using IntersectionObserver
 * Supports: reveal, reveal-left, reveal-right, reveal-scale
 */
export default class ScrollReveal {
  constructor(options = {}) {
    this.selectors = options.selectors || ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
    this.threshold = options.threshold || 0.15;
    this.rootMargin = options.rootMargin || '0px 0px -50px 0px';
    this.elements = [];
    this.observer = null;
    this.init();
  }

  init() {
    this.elements = document.querySelectorAll(this.selectors.join(', '));

    if (!('IntersectionObserver' in window)) {
      this.elements.forEach(el => el.classList.add('visible'));
      return;
    }

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      threshold: this.threshold,
      rootMargin: this.rootMargin
    });

    this.elements.forEach(el => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        this.observer.unobserve(entry.target);
      }
    });
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
  }
}
