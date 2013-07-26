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
            var pointer = 0, last = options.childItems.length, pointers = [0, 0];

            if (options.pager === true) {
                $(document.getElementsByClassName(options.navItemLabel), element).click(function(e) {
                    e.preventDefault();

                    $('a', document.getElementsByClassName(options.navItemLabel)).removeClass(options.pagerActive);
                    $('a', this).addClass(options.pagerActive);

                    pointer = $(this).index();
                    pointers.push(pointer);
                    
                    if(pointer != pointers[1]) {
                        if (pointers.length >= 3) pointers.shift();
                        _adjuster(element, options, pointers, (pointers[0] > pointers[1]) ? -1 : 1);
                    }
                    
                });
            } else {
                $(document.getElementById(options.nextId), element).click(function(e) {
                    e.preventDefault();
                    pointer++;
                    _adjuster(element, options, pointer, 1);
                });

                $(document.getElementById(options.prevId), element).click(function(e) {
                    e.preventDefault();
                    pointer--;
                    _adjuster(element, options, pointer, -1);
                });
            }
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

    function _adjuster(element, options, pointers, direction) {
        var itemContent = $(options.child, element).children().length,
            total = (options.childItems.length - 1),
            tempCurr = pointers[0] || 0,
            curr = (options.pager === true) ? pointers[1] || 0 : pointers,
            prev = (curr <= 0) ? total : curr - 1,
            next = (curr >= total) ? 0 : curr + 1;
        
        direction = direction || 0;

        //console.log('direction:'+direction+', tempCurr:'+tempCurr+', curr:'+curr+', prev:'+prev+', next:'+next);
        
        if(itemContent === 0) {
            _preloader(document.getElementById('fluvidus-item-curr'), options, curr);
            _preloader(document.getElementById('fluvidus-item-prev'), options, prev);
            _preloader(document.getElementById('fluvidus-item-next'), options, next);
            $('#fluvidus-item-curr', element).html('').append('<p>' + options.childItems[curr].desc + '</p>');
            $('#fluvidus-item-prev', element).html('').append('<p>' + options.childItems[prev].desc + '</p>');
            $('#fluvidus-item-next', element).html('').append('<p>' + options.childItems[next].desc + '</p>');
        } else {
            /*if (options.pager === false) {
                if (curr >= total) {
                    curr = 0;
                    curr++;
                } else {
                    curr = total;
                    curr--;
                }
            }*/
            _preloader(document.getElementById('fluvidus-item-curr'), options, curr);
            $('#fluvidus-item-curr', element).html('').append('<p>' + options.childItems[curr].desc + '</p>');
            if(direction > 0) {
                if (options.pager === false) tempCurr = next;
                console.log('next:'+tempCurr);
                _preloader(document.getElementById('fluvidus-item-prev'), options, tempCurr);
                $('#fluvidus-item-prev', element).html('').append('<p>' + options.childItems[tempCurr].desc + '</p>');
            } else {
                if (options.pager === false) tempCurr = prev;
                console.log('prev:'+tempCurr);
                _preloader(document.getElementById('fluvidus-item-next'), options, tempCurr);
                $('#fluvidus-item-next', element).html('').append('<p>' + options.childItems[tempCurr].desc + '</p>');
            }
        }
        _animator(element, options, direction);
    }

    function _preloader(container, options, pointer) {
        var img = new Image();
        img.onload = function() {
            if ($('img', container).length != 0) $('img', container).remove('img');
            // Image attributes
            _attributer(img, {
                'src': options.childItems[pointer].hero,
                'alt': options.childItems[pointer].desc
            });
            container.appendChild(this);
        }
        img.src = options.loaderIcon;
    }

    function _attributer(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function _animator(element, options, direction) {
        if(direction > 0) {
            // Next
            $(options.frame, element).css('left', '0%').stop(true).animate({
                left: -(100) + '%'
            }, options.delay, options.easing);
        } else {
            $(options.frame, element).css('left', '-200%').stop(true).animate({
                left: -(100) + '%'
            }, options.delay, options.easing);
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
        childItems: [{
            hero: 'images/star-birth-clouds_1227_990x742.jpg',
            desc: 'Pillars of gas in the Eagle nebula'
        }],
        navItemLabel: 'fluvidus-nav-item',
        navPrevLabel: 'Previous',
        navNextLabel: 'Next',
        prevId: 'fluvidus-button-prev',
        nextId: 'fluvidus-button-next',
        loaderIcon: 'images/loader.gif',
        pager: true,
        pagerActive: 'fluvidus-button-active',
        delay: 600,
        easing: 'linear'
    }

})(jQuery);