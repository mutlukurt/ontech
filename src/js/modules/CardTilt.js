/**
 * CardTilt Component
 * Adds 3D tilt effect on cards based on mouse position (desktop only)
 */
export default class CardTilt {
  constructor(selector = '.course-card, .blog-card, .mentor-card') {
    this.selector = selector;
    this.cards = [];
    this.isEnabled = false;
    this.init();
  }

  init() {
    // Only enable on devices with hover (desktop)
    if (!window.matchMedia('(hover: hover)').matches) return;

    this.isEnabled = true;
    this.cards = document.querySelectorAll(this.selector);

    this.cards.forEach(card => {
      card.addEventListener('mousemove', this.handleMouseMove.bind(this));
      card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    });
  }

  handleMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  }

  handleMouseLeave(e) {
    e.currentTarget.style.transform = '';
  }

  destroy() {
    if (!this.isEnabled) return;
    this.cards.forEach(card => {
      card.removeEventListener('mousemove', this.handleMouseMove);
      card.removeEventListener('mouseleave', this.handleMouseLeave);
    });
  }
}
