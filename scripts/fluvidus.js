(function($) {

$.fluvidus = function(element, options) {
  this.options = {};

  element.data('fluvidus', this);

  this.init = function(element, options) {         
    this.options = $.extend({}, $.fluvidus.defaultOptions, options);
    // manipulate element here     
  };

  //Public function
  this.test = function(name) {
    console.log('Hello, ' + name + ', Fluvidus is now on development!');
  };

  this.init(element, options);
};

$.fn.fluvidus = function(options) { // using only one method off of $.fn  
  return this.each(function() {
    (new $.fluvidus($(this), options));              
  });        
};

$.fluvidus.defaultOptions = {
  class: 'fluvidus',
  text: 'Enter Text Here'
}

})(jQuery);