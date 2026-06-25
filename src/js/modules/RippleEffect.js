/**
 * RippleEffect Component
 * Adds Material Design ripple effect on button click
 */
export default class RippleEffect {
  constructor(selector = '.btn, .carousel-btn, .newsletter-form button') {
    this.selector = selector;
    this.buttons = [];
    this.init();
  }

  init() {
    this.buttons = document.querySelectorAll(this.selector);

    this.buttons.forEach(btn => {
      btn.classList.add('ripple-container');
      btn.addEventListener('click', this.handleClick.bind(this));
    });
  }

  handleClick(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  destroy() {
    this.buttons.forEach(btn => {
      btn.removeEventListener('click', this.handleClick);
    });
  }
}
