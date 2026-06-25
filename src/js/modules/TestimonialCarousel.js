/**
 * TestimonialCarousel Component
 * Handles testimonial pagination display
 */
export default class TestimonialCarousel {
  constructor(options = {}) {
    this.sectionSelector = options.sectionSelector || '.testimonials-section';
    this.totalPages = options.totalPages || 1209;
    this.currentPage = 2;
    this.buttons = [];
    this.pageInfo = null;
    this.init();
  }

  init() {
    const section = document.querySelector(this.sectionSelector);
    if (!section) return;

    this.buttons = Array.from(section.querySelectorAll('.testimonial-nav .carousel-btn'));
    this.pageInfo = section.querySelector('.page-info');

    if (this.buttons.length === 0) return;

    this.buttons.forEach(btn => {
      btn.addEventListener('click', this.handleClick.bind(this));
    });
  }

  handleClick(e) {
    const isNext = e.currentTarget.textContent.trim() === '\u203A';

    if (isNext) {
      this.currentPage = this.currentPage < this.totalPages ? this.currentPage + 1 : 1;
    } else {
      this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : this.totalPages;
    }

    this.updateDisplay();
  }

  updateDisplay() {
    if (!this.pageInfo) return;

    this.pageInfo.style.opacity = '0';
    setTimeout(() => {
      this.pageInfo.textContent = this.currentPage + ' of ' + this.totalPages;
      this.pageInfo.style.opacity = '1';
    }, 150);
  }

  destroy() {
    this.buttons.forEach(btn => btn.removeEventListener('click', this.handleClick));
  }
}
