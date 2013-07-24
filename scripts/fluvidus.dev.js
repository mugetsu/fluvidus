/*!
 * Fluvidus
 * Author: Randell Quitain [@cprjk]
 * Licensed under the GPL license
 */

(function ($) {

    $.fluvidus = function (element, options) {
        this.options = {};

        element.data('fluvidus', this);

        this.init = function (element, options) {
            this.options = $.extend({}, $.fluvidus.defaults, options);
            
            // Initialize correct data
            _adjuster(element, this.options, 0);

            // Spin the pot molder
            this.applyFluidity(element, this.options);
            this.applyNavigation(element, this.options);
            this.applyEvents(element, this.options);
        };

        // Public function
        this.applyFluidity = function (element, options) {
            $(options.frame, element).css({ left: -(100) + '%', width: _framing(element, options) + '%' });
            $(options.child, element).width( _orienting(element, options) + '%' );
        };

        this.applyNavigation = function (element, options) {
            var navItem, navType;
            if (options.pager === true) {
                for (i = 1; i <= options.childItems.length; i++) {
                    (i === 1) ? navItem = '<li class="' + options.navItemLabel + '"><a class="fluvidus-button fluvidus-button-active">' + i + '</a></li>' : navItem += '<li class="' + options.navItemLabel + '"><a class="fluvidus-button" href="#">' + i + '</a></li>';
                }
                navType = 'fluvidus-pager';
            } else {
                navItem = '<li id="' + options.prevId + '" class="' + options.navItemLabel + '"><a class="fluvidus-button">' + options.navPrevLabel + '</a></li>';
                navItem += '<li id="' + options.nextId + '" class="' + options.navItemLabel + '"><a class="fluvidus-button">' + options.navNextLabel + '</a></li>';
                navType = 'fluvidus-nav';
            }
            $(element).append('<ul class="' + navType + '">' + navItem + '</ul>');
        };

        this.applyEvents = function (element, options) {
            var pointer = 0, last = options.childItems.length;

            $(document.getElementById(options.nextId), element).click(function(e) {
                e.preventDefault();
                pointer++;
                _adjuster(element, options, (pointer >= last) ? pointer = 0 : pointer, 1);
            });

            $(document.getElementById(options.prevId), element).click(function(e) {
                e.preventDefault();
                pointer--;
                _adjuster(element, options, (pointer < 0) ? pointer = (last - 1) : pointer, -1);
            });
        };

        this.init(element, options);
    };

    $.fn.fluvidus = function (options) {
        return this.each(function () {
            (new $.fluvidus($(this), options));
        });
    };

    function _framing(element, options) {
        return (($(options.frame, element).width() * (options.childItems.length - 1)) / $(options.frame, element).width()) * 100;
    }

    function _orienting(element, options) {
        return ($(options.frame, element).width() / ($(options.frame, element).width() * (options.childItems.length - 1))) * 100;
    }

    function _adjuster(element, options, pointer, direction) {
        var itemContent = $(options.child, element).children().length,
            total = (options.childItems.length - 1),
            points = [
                { prev: (pointer === 0) ? total : pointer - 1 },
                { curr: pointer },
                { next: ((pointer + 1) > total) ? 0 : pointer + 1 }
            ];
        
        for(var i = 0; i < points.length; i++) {
            for(var key in points[i] ) {
                //console.log(key);
                if(itemContent === 0) {
                    // Preload next image set
                    _preloader(document.getElementById(options.frameBase[i].frameId), options.childItems[points[i][key]].hero, options.childItems[points[i][key]].desc);
                    // Correct data per frame
                    $(document.getElementById(options.frameBase[i].frameId), element).append('<p>' + options.childItems[points[i][key]].desc + '</p>');  
                } else {
                    for(var i = 0; i < points.length; i++) {
                        for(var key in points[i] ) {
                            // Preload next image set
                            _preloader(document.getElementById(options.frameBase[i].frameId), options.childItems[points[i][key]].hero, options.childItems[points[i][key]].desc);  
                            // Correct data per frame
                            $(document.getElementById(options.frameBase[i].frameId), element).find('p').text(options.childItems[points[i][key]].desc);
                        }
                    }
                }
            }
        }
        _animator(element, options, direction);
    }

    function _preloader(container, url, alt) {
        var img = new Image();
        img.onload = function() {
            if ($('img', container).length != 0) $('img', container).remove('img');
            container.appendChild(this);
        }
        // Image attributes
        img.src = url;
        img.alt = alt;
    }

    function _animator(element, options, direction) {
        if(direction > 0) {
            // Next
            $(options.frame, element).css('left', '0%').stop().animate({
                left: -(100) + '%'
            });
        } else {
            // Previous
            $(options.child, element).eq(0).css('marginLeft', -(_orienting(element, options)) + '%').stop().animate({
                marginLeft: '0%'
            });
        }
    }

    $.fluvidus.defaults = {
        frame: '.fluvidus-frame',
        frameBase: [
            { frameId: 'fluvidus-item-prev' },
            { frameId: 'fluvidus-item-curr' },
            { frameId: 'fluvidus-item-next' }
        ],
        child: '.fluvidus-item',
        childActive: 'fluvidus-item-active',
        childItems: [{
            hero: 'images/star-birth-clouds_1227_990x742.jpg',
            desc: 'Pillars of gas in the Eagle nebula'
        }],
        pager: true,
        navItemLabel: 'fluvidus-nav-item',
        navItemActive: 'fluvidus-nav-item-active',
        navPrevLabel: 'Previous',
        navNextLabel: 'Next',
        prevId: 'fluvidus-button-prev',
        nextId: 'fluvidus-button-next'
    }

})(jQuery);