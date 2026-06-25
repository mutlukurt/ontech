/**
 * MobileMenu Component
 * Handles mobile hamburger menu toggle with accessibility
 */
export default class MobileMenu {
  constructor(options = {}) {
    this.toggleSelector = options.toggleSelector || '.menu-toggle';
    this.navSelector = options.navSelector || '.nav';
    this.toggle = document.querySelector(this.toggleSelector);
    this.nav = document.querySelector(this.navSelector);
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.toggle || !this.nav) return;

    this.toggle.addEventListener('click', this.handleClick.bind(this));
    this.toggle.addEventListener('keydown', this.handleKeydown.bind(this));

    // Close on nav link click
    this.nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  handleClick() {
    this.isOpen ? this.close() : this.open();
  }

  handleKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick();
    }
  }

  open() {
    this.isOpen = true;
    this.toggle.classList.add('active');
    this.nav.classList.add('open');
    this.toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.toggle.classList.remove('active');
    this.nav.classList.remove('open');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  destroy() {
    this.toggle.removeEventListener('click', this.handleClick);
    this.toggle.removeEventListener('keydown', this.handleKeydown);
  }
}
