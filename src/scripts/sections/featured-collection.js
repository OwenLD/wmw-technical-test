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
