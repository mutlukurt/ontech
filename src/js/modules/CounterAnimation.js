/**
 * CounterAnimation Component
 * Animates stat counters from 0 to target value on scroll
 */
export default class CounterAnimation {
  constructor(options = {}) {
    this.selector = options.selector || '.stat-item h3';
    this.duration = options.duration || 1500;
    this.stagger = options.stagger || 150;
    this.animated = false;
    this.elements = [];
    this.observer = null;
    this.init();
  }

  init() {
    this.elements = document.querySelectorAll(this.selector);
    if (this.elements.length === 0) return;

    if (!('IntersectionObserver' in window)) return;

    const statsContainer = document.querySelector('.stats');
    if (!statsContainer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.animateAll();
            this.observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(statsContainer);
  }

  animateAll() {
    this.elements.forEach((el, index) => {
      setTimeout(() => this.animate(el), index * this.stagger);
    });
  }

  animate(element) {
    const text = element.textContent;
    const match = text.match(/(\d+)(.*)/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target + suffix;
        element.classList.add('animated');
        setTimeout(() => element.classList.remove('animated'), 500);
      }
    };

    requestAnimationFrame(step);
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
  }
}
