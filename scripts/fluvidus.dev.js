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

            // Run the pot molder
            this.applyFluidity(element, this.options);
            this.applyNavigation(element, this.options);
            this.applyEvents(element, this.options);
        };

        // Public function
        this.test = function (element, options) {
            console.log('Test');
        };
        
        this.applyFluidity = function (element, options) {
            $(options.frame, element).css({ left: -(100) + '%', width: _framing(element, options) + '%' });
            $(options.child, element).width( _orienting(element, options) + '%' );
        };

        this.applyNavigation = function (element, options) {
            if (options.pager === true) {
                var nav_item;
                for (i = 1; i <= options.childItems.length; i++) {
                    (i === 1) ? nav_item = '<li class="' + options.navItemLabel + '"><a class="fluvidus-button fluvidus-button-active" href="#">' + i + '</a></li>' : nav_item += '<li class="' + options.navItemLabel + '"><a class="fluvidus-button" href="#">' + i + '</a></li>';
                }
                $(element).append('<ul class="fluvidus-pager">' + nav_item + '</ul>');
            } else {
                var nav_buttons;
                nav_buttons = '<li id="' + options.prevId + '" class="' + options.navItemLabel + '"><a class="fluvidus-button" href="#">' + options.navPrevLabel + '</a></li>';
                nav_buttons += '<li id="' + options.nextId + '" class="' + options.navItemLabel + '"><a class="fluvidus-button" href="#">' + options.navNextLabel + '</a></li>';
                $(element).append('<ul class="fluvidus-nav">' + nav_buttons + '</ul>');
            }
        };

        this.applyEvents = function (element, options) {
            var pointer = 0, last = options.childItems.length;

            $(document.getElementById(options.nextId), element).click(function(e) {
                e.preventDefault();
                pointer++;
                (pointer >= last) ? pointer = 0 : pointer;
                
                _adjuster(element, options, pointer);
                _animator(element, options, 1);
            });

            $(document.getElementById(options.prevId), element).click(function(e) {
                e.preventDefault();
                pointer--;
                (pointer < 0) ? pointer = (last - 1) : pointer;
                
                _adjuster(element, options, pointer);
                _animator(element, options, -1);
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

    function _adjuster(element, options, pointer) {
        var total = (options.childItems.length - 1),
            curr = pointer,
            next = ((pointer + 1) > total) ? 0 : pointer + 1,
            prev = (pointer === 0) ? total : pointer - 1,
            availImg = $('.fluvidus-item img').length,
            availP = $('.fluvidus-item p').length;

        console.log('pointer:'+pointer+', curr:'+curr+', next:'+next+', prev:'+prev);
        
        if((availImg && availP) == 0) {
            $('#fluvidus-item-prev', element).append('<img src="' + options.childItems[prev].hero + '" alt="' + options.childItems[prev].desc + '"/><p>' + options.childItems[prev].desc + '</p>');
            $('#fluvidus-item-curr', element).append('<img src="' + options.childItems[curr].hero + '" alt="' + options.childItems[curr].desc + '"/><p>' + options.childItems[curr].desc + '</p>');
            $('#fluvidus-item-next', element).append('<img src="' + options.childItems[next].hero + '" alt="' + options.childItems[next].desc + '"/><p>' + options.childItems[next].desc + '</p>');        
        } else {
            $('#fluvidus-item-prev', element).find('img').prop({
                'src': options.childItems[prev].hero,
                'alt': options.childItems[prev].desc
            }).end().find('p').text(options.childItems[prev].desc);

            $('#fluvidus-item-curr', element).find('img').prop({
                'src': options.childItems[curr].hero,
                'alt': options.childItems[curr].desc
            }).end().find('p').text(options.childItems[curr].desc);

            $('#fluvidus-item-next', element).find('img').prop({
                'src': options.childItems[next].hero,
                'alt': options.childItems[next].desc
            }).end().find('p').text(options.childItems[next].desc);
        }
    }

    function _animator(element, options, direction) {
        if(direction > 0) {
            // Next
            $(options.frame, element).css('left', '0%').stop().animate({
                left: -(100) + '%'
            });
        } else {
            // Previous
            $(options.child, options.container).eq(0).css('marginLeft', -(_orienting(element, options)) + '%').stop().animate({
                marginLeft: '0%'
            });
        }
    }

    $.fluvidus.defaults = {
        frame: '.fluvidus-frame',
        child: '.fluvidus-item',
        childActiveLabel: 'fluvidus-item-active',
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