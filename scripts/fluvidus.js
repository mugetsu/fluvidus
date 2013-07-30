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
            $(options.frame, element).css({
                left: -(100) + '%',
                width: _framing(element, options) + '%'
            });
            $(options.child, element).width(_orienting(element, options) + '%');
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
            var pointer = 0,
                last = options.childItems.length,
                pointers = (options.pager === true) ? [(last - 1), 0] : 0;

            if (options.pager === true) {
                $(document.getElementsByClassName(options.navItemLabel), element).click(function (e) {
                    e.preventDefault();

                    $('a', document.getElementsByClassName(options.navItemLabel)).removeClass(options.pagerActive);
                    $('a', this).addClass(options.pagerActive);

                    pointer = $(this).index();

                    if (pointer != pointers[1]) {
                        pointers.push(pointer)
                        if (pointers.length >= 3) pointers.shift();
                        _adjuster(element, options, pointers, (pointers[0] > pointers[1]) ? -1 : 1);
                    }

                });
            } else {
                $(document.getElementById(options.nextId), element).click(function (e) {
                    e.preventDefault();
                    (pointers >= (last - 1)) ? pointers = 0 : pointers++;
                    _adjuster(element, options, pointers, 1);
                });

                $(document.getElementById(options.prevId), element).click(function (e) {
                    e.preventDefault();
                    (pointers <= 0) ? pointers = (last - 1) : pointers--;
                    _adjuster(element, options, pointers, -1);
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
            tempCurr = (options.pager === true) ? ((typeof pointers[0] === 'undefined') ? 0 : pointers[0]) : pointers,
            curr = (options.pager === true) ? pointers[1] || 0 : pointers,
            next = (options.pager === true) ? tempCurr : (curr >= total) ? 0 : curr + 1,
            prev = (options.pager === true) ? tempCurr : (curr <= 0) ? total : curr - 1,
            points = [curr, next, prev];

        direction = direction || 0;

        if (itemContent === 0) {
            for (var i = 0; i < points.length; i++) {
                _preloader(document.getElementById(options.frameBase[i].frameId), options, points[i]);
            }
        } else {
            _preloader(document.getElementById(options.frameBase[0].frameId), options, curr);
            if (direction > 0) {
                next = (options.pager === true) ? next : prev;
                _preloader(document.getElementById(options.frameBase[2].frameId), options, next);
            } else {
                prev = (options.pager === true) ? prev : next;
                _preloader(document.getElementById(options.frameBase[1].frameId), options, prev);
            }
        }

        _animator(element, options, direction);
    }

    function _preloader(container, options, pointer) {
        var hero = new Image(),
            desc = document.createElement('p'),
            text = document.createTextNode(options.childItems[pointer].desc);

        $(hero).load(function(e){

            if ($('img, p', container).length != 0) {
                $('img, p', container).remove();
            }

            // Element attributes & text
            _attributer(this, {
                'src': options.childItems[pointer].hero,
                'alt': options.childItems[pointer].desc
            });
            desc.appendChild(text);

            container.appendChild(this);
            container.appendChild(desc);
            
        });

        // Append loader image
        $(hero).attr('src', options.loaderIcon);
    }

    function _attributer(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function _animator(element, options, direction) {
        if (direction > 0) {
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
        frameBase: [{
            frameId: 'fluvidus-item-curr'
        }, {
            frameId: 'fluvidus-item-next'
        }, {
            frameId: 'fluvidus-item-prev'
        }],
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