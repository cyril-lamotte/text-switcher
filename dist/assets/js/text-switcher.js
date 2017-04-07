/**
 * @file App initialisation & domready event.
 *
 * Only the "app" variable is exposed to window's context.
 */

(function($) {

"use strict";

window.app = {};

// Execute code when the DOM is fully loaded.
$(function() {

  // Text switcher
  $('div[data-js="text-switcher"]').each(function(i, el) {

    window.setInterval(function() {

      // Move out & in
      $(el)
        .find('span:not(.tc__bottom)').addClass('tc__out')
        .end()
        .find('span.tc__bottom').addClass('tc__in');

      // After animation, move to next position.
      window.setTimeout(function() {

        $(el)
          .find('span:not(.tc__bottom)').addClass('tc__bottom tc__from-top').removeClass('tc__out')
          .end()
          .find('span.tc__bottom:not(.tc__from-top)').removeClass('tc__bottom').removeClass('tc__in')
          .end().find('.tc__from-top').removeClass('tc__from-top')

      }, 1000);

    }, 2000);

  });


}); // /ready

})(jQuery);
