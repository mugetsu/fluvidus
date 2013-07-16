(function($) {

  $.fluvidus = function(element, options) {
    this.options = {};

    element.data('fluvidus', this);

    this.init = function(element, options) {         
      this.options = $.extend({}, $.fluvidus.defaults, options); 

      // Initialize fluvidus
      this.applyFluidity(element, this.options);
      this.applyNavigation(element, this.options);
    };

    // Public function
    this.test = function(name) {
      console.log('Hello, ' + name + ', thanks for using Fluvidus!');
    };

    this.applyFluidity = function(element, options) {
      $(options.parent, options.container).css('width', parentTargetContext(element) + '%');
      $(options.child, options.container).css('width', childTargetContext(element) + '%');
    };

    this.applyNavigation = function(element, options) {
      if(options.nav) {
        var nav_item;
        for(i=1; i<=childLength(element); i++) {
          (i === 1) ? nav_item = '<li><a class="fluvidus-button fluvidus-button-active" href="#">'+i+'</a></li>' : nav_item = '<li><a class="fluvidus-button" href="#">'+i+'</a></li>';
          $(options.nav, options.container).append(nav_item);
        }
      }
    };

    this.init(element, options);
  };

  $.fn.fluvidus = function(options) {                   
    return this.each(function() {
      (new $.fluvidus($(this), options));
    });        
  };

  // Get container width
  function containerWidth(element) {
    return element.width();
  };

  // Get child length
  function childLength(element) {
    return element.find($.fluvidus.defaults.child).length;
  };

  // Get parent magic value
  function parentTargetContext(element) {
    return (((containerWidth(element) * childLength(element)) / containerWidth(element)) * 100);
  }

  // Get child magic value
  function childTargetContext(element) {
    return ((containerWidth(element) / (containerWidth(element) * childLength(element))) * 100);
  }

  $.fluvidus.defaults = {
      container: '#fluvidus'
    , parent: '.fluvidus-frame'
    , child: '.fluvidus-item'
    , nav: '.fluvidus-nav'
  }

  $('#fluvidus').fluvidus();

})(jQuery);