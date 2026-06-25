/**
 * ============================================
 * ONTECH - Application Entry Point
 * ============================================
 * Initializes all components in proper order
 */

// Import all components
import HeaderScroll from './modules/HeaderScroll.js';
import MobileMenu from './modules/MobileMenu.js';
import SmoothScroll from './modules/SmoothScroll.js';
import ScrollReveal from './modules/ScrollReveal.js';
import CounterAnimation from './modules/CounterAnimation.js';
import RippleEffect from './modules/RippleEffect.js';
import Carousel from './modules/Carousel.js';
import TestimonialCarousel from './modules/TestimonialCarousel.js';
import FormHandler from './modules/FormHandler.js';
import BackToTop from './modules/BackToTop.js';
import CardTilt from './modules/CardTilt.js';
import ActiveNav from './modules/ActiveNav.js';

/**
 * App - Main Application Controller
 */
class App {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.boot());
    } else {
      this.boot();
    }
  }

  boot() {
    this.initComponents();
    this.preventDoubleTapZoom();

    console.log('%c🚀 Ontech App Initialized', 'color: #fcd34d; font-weight: bold; font-size: 14px;');
  }

  initComponents() {
    // Core components
    this.components.headerScroll = new HeaderScroll();
    this.components.mobileMenu = new MobileMenu();
    this.components.smoothScroll = new SmoothScroll();
    this.components.scrollReveal = new ScrollReveal();
    this.components.counterAnimation = new CounterAnimation();
    this.components.rippleEffect = new RippleEffect();
    this.components.backToTop = new BackToTop();
    this.components.activeNav = new ActiveNav();

    // Interactive components
    this.components.mentorCarousel = new Carousel({
      sectionSelector: '.mentors-section',
      cardSelector: '.mentor-card'
    });

    this.components.testimonialCarousel = new TestimonialCarousel({
      sectionSelector: '.testimonials-section',
      totalPages: 1209
    });

    this.components.formHandler = new FormHandler();
    this.components.cardTilt = new CardTilt();
  }

  preventDoubleTapZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  }

  destroy() {
    Object.values(this.components).forEach(component => {
      if (component.destroy) component.destroy();
    });
  }
}

// Boot the application
const app = new App();

// Expose for debugging
window.OntechApp = app;
