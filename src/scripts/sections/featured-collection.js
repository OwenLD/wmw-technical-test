/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';
import Flickity from 'flickity';

class AddVariant {
  /**
   * 
   * @param {DOM node} button - add to cart button
   */
  constructor(button) {
    this.button = button;
    this.id = this.button.dataset.variantId;
    this.qty = this.button.dataset.quantity;
  }

  bindEventListeners() {
    // Add event click event to the button
    this.button.addEventListener('click', this.handle.bind(this), false);
  }

  /**
   * 
   * @param {object} e - event object
   */
  handle(e) {
    // Prevent the defualt behaviour
    e.preventDefault();

    this.add().then(res => {
      // Do something with the response (update cart total, notification etc.)
      // console.log(res);
    })
  }

  add() {
    return new Promise(resolve => {
      this.request(resolve)
    })
  }

  /**
   * @param {function} success
   */
  request(success) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/cart/add.js', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState > 3) success(xhr);
    };
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(JSON.stringify({
      items: [
        {
          quantity: this.qty,
          id: this.id
        }
      ]
    }));
  }
}

const buttons = document.querySelectorAll('[js-ajax-cart="addToCart"]');

[...buttons].forEach(el => {
  const addVariant = new AddVariant(
    el
  );

  addVariant.bindEventListeners();
});

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {
  init() {
    this.publicMethod();
  },

  publicMethod() {
    window.console.log('Initialising featured collection section');
  },

  onLoad() {
    const carousel = document.querySelector('.featured-collection__carousel');
    const flkty = new Flickity(carousel, {
        cellSelector: '.product-card',
        imagesLoaded: true,
        wrapAround: true,
        groupCells: true,
        cellAlign: 'left',
        arrowShape: { 
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20
        }
      }
    );
    
    /**
     * Carousel cells loading with incorrect height, this seems to fix
     */
    window.addEventListener('load', () => {
      flkty.resize();
    });
  }
});
