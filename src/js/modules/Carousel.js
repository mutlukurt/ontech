/**
 * Carousel Component
 * Reusable carousel for mentors and testimonials
 */
import { debounce } from '../utils/throttle.js';

export default class Carousel {
  constructor(options = {}) {
    this.sectionSelector = options.sectionSelector || '.mentors-section';
    this.cardSelector = options.cardSelector || '.mentor-card';
    this.prevSelector = options.prevSelector || null;
    this.nextSelector = options.nextSelector || null;
    this.itemsPerPage = { desktop: 4, tablet: 2, mobile: 1 };
    this.currentIndex = 0;
    this.cards = [];
    this.buttons = [];
    this.init();
  }

  init() {
    const section = document.querySelector(this.sectionSelector);
    if (!section) return;

    this.cards = Array.from(section.querySelectorAll(this.cardSelector));
    this.buttons = Array.from(section.querySelectorAll('.carousel-btn'));

    if (this.buttons.length === 0) return;

    this.buttons.forEach(btn => {
      btn.addEventListener('click', this.handleClick.bind(this));
    });

    window.addEventListener('resize', debounce(() => this.update(), 200));
  }

  getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 768) return this.itemsPerPage.mobile;
    if (width <= 1024) return this.itemsPerPage.tablet;
    return this.itemsPerPage.desktop;
  }

  handleClick(e) {
    const isNext = e.currentTarget.textContent.trim() === '\u203A';
    const perPage = this.getItemsPerPage();
    const maxIndex = Math.max(0, this.cards.length - perPage);

    if (isNext) {
      this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
    } else {
      this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
    }

    this.update();
  }

  update() {
    const perPage = this.getItemsPerPage();

    this.cards.forEach((card, i) => {
      if (i >= this.currentIndex && i < this.currentIndex + perPage) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.4s, transform 0.4s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  }

  destroy() {
    this.buttons.forEach(btn => btn.removeEventListener('click', this.handleClick));
  }
}
