/*!
 * Fluvidus
 * Author: Randell Quitain [@cprjk]
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {
    
    var pluginName = 'fluvidus',
        defaults = {
            container: '#fluvidus',
            parent: '.fluvidus-frame',
            childItems: [{
                media: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/012/cache/star-birth-clouds_1227_990x742.jpg',
                desc: 'Pillars of gas in the Eagle nebula'
            }],
            child: '.fluvidus-item',
            childActiveLabel: 'fluvidus-item-active',
            pager: true,
            navItemLabel: 'fluvidus-nav-item',
            navPrevLabel: 'Previous',
            navNextLabel: 'Next',
            prevId: 'fluvidus-button-prev',
            nextId: 'fluvidus-button-next'
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        this.buildItems(this.options)
    };

    Plugin.prototype.buildItems = function (items) {
        //console.log(items.childItems);
        return items.childItems.forEach(function (item, i) {
            if(item) {
                //$(this.options)
                console.log(item);
            }
        });
    };

    Plugin.prototype.itemLength = function () {
        return this.options.childItems.length || [];
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );