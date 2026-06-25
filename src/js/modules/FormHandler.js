/**
 * FormHandler Component
 * Handles email validation and form submission feedback
 */
export default class FormHandler {
  constructor(options = {}) {
    this.formSelector = options.formSelector || '.newsletter-form';
    this.inputSelector = options.inputSelector || 'input';
    this.buttonSelector = options.buttonSelector || 'button';
    this.forms = [];
    this.init();
  }

  init() {
    // Newsletter form
    const newsletterForm = document.querySelector(this.formSelector);
    if (newsletterForm) {
      this.setupForm(newsletterForm, 'Subscribe Now', 'Subscribed!', '#10b981');
    }

    // Hero form
    const heroForm = document.querySelector('.hero__form');
    if (heroForm) {
      this.setupHeroForm(heroForm);
    }
  }

  setupForm(form, originalText, successText, successColor) {
    const input = form.querySelector(this.inputSelector);
    const button = form.querySelector(this.buttonSelector);
    if (!input || !button) return;

    button.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.validateEmail(input.value)) {
        button.textContent = successText;
        button.style.background = successColor;
        button.style.color = '#fff';
        input.value = '';
        input.placeholder = 'Thank you!';

        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.style.color = '';
          input.placeholder = 'Enter your email';
        }, 2500);
      } else {
        this.showError(input);
      }
    });
  }

  setupHeroForm(form) {
    const input = form.querySelector('input');
    const button = form.querySelector('.btn');
    if (!input || !button) return;

    button.addEventListener('click', (e) => {
      e.preventDefault();

      if (this.validateEmail(input.value)) {
        const original = button.textContent;
        button.textContent = 'Welcome!';
        input.value = '';

        setTimeout(() => {
          button.textContent = original;
        }, 2000);
      } else {
        this.showError(input);
      }
    });
  }

  validateEmail(email) {
    return email && email.includes('@') && email.includes('.');
  }

  showError(input) {
    input.style.borderColor = '#ef4444';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
    input.focus();

    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }, 1500);
  }

  destroy() {
    this.forms.forEach(({ button, handler }) => {
      button.removeEventListener('click', handler);
    });
  }
}
