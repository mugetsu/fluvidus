(function ($) {

    $.fluvidus = function (element, options) {
        this.options = {};

        element.data('fluvidus', this);

        this.init = function (element, options) {
            this.options = $.extend({}, $.fluvidus.defaults, options);

            // Initialize fluvidus
            this.applyContent(element, this.options);
            this.applyFluidity(element, this.options);
            this.applyNavigation(element, this.options);
            this.applyEvents(element, this.options);
        };

        // Public function
        this.test = function (element, options) {
            console.log(options);
        };

        this.applyFluidity = function (element, options) {
            $(options.parent, options.container).css('width', parentTargetContext(element) + '%');
            $(options.child, options.container).css('width', childTargetContext(element) + '%');
        };

        this.applyNavigation = function (element, options) {
            if (options.pager === true) {
                var nav_item;
                for (i = 1; i <= childLength(element); i++) {
                    (i === 1) ? nav_item = '<li class="' + options.nav_pager_item + '"><a class="fluvidus-button fluvidus-button-active" href="#">' + i + '</a></li>' : nav_item += '<li class="' + options.nav_pager_item + '"><a class="fluvidus-button" href="#">' + i + '</a></li>';
                }
                $(options.container).append('<ul class="fluvidus-pager">' + nav_item + '</ul>');
            } else {
                nav_buttons = '<li id="' + options.prev_id + '" class="' + options.nav_pager_item + '"><a class="fluvidus-button" href="#">' + options.nav_prev_label + '</a></li>';
                nav_buttons += '<li id="' + options.next_id + '" class="' + options.nav_pager_item + '"><a class="fluvidus-button" href="#">' + options.nav_next_label + '</a></li>';
                $(options.container).append('<ul class="fluvidus-nav">' + nav_buttons + '</ul>');
            }
        };

        this.applyEvents = function (element, options) {
            var index, count = 0, pos;
            if (options.pager === true) {
                options.nav_pager_item = '.' + options.nav_pager_item;
                $(options.nav_pager_item, options.container).find('a').click(function (e) {
                    e.preventDefault();
                    index = $(this).parent().index(),
                    pos = framePosition(element, index);
                    // Re/Set
                    $(options.nav_pager_item, options.container).find('a').removeClass('fluvidus-button-active').end().find(this).addClass('fluvidus-button-active');
                    $(options.child, options.container).removeClass(options.child_active).eq(index).addClass(options.child_active);
                    // Animate
                    frameAnimation(options, index, pos);
                });
            } else {
                options.nav_pager_item = '.' + options.nav_pager_item;
                $(options.nav_pager_item, options.container).find('a').click(function (e) {
                    e.preventDefault();
                    var id = $(this).parent().prop('id');
                    if (id === options.prev_id) {
                        count--;
                        (count < 0) ? count = childLength(element) - 1 : count;
                    } else {
                        count++;
                        (count >= childLength(element)) ? count = 0 : count;
                    }
                    pos = framePosition(element, count);
                    // Re/Set
                    $(options.child, options.container).removeClass(options.child_active).eq(count).addClass(options.child_active);
                    // Animate
                    frameAnimation(options, count, pos);
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

    // Return container width

    function containerWidth(element) {
        return element.width();
    };

    // Return child length

    function childLength(element) {
        return $(element).data('fluvidus').child_items.length;
    };

    // Return parent magic value

    function parentTargetContext(element) {
        return (((containerWidth(element) * childLength(element)) / containerWidth(element)) * 100);
    }

    // Return child magic value

    function childTargetContext(element) {
        return ((containerWidth(element) / (containerWidth(element) * childLength(element))) * 100);
    }

    // Return frame position

    function framePosition(element, multiplier) {
        return (parentTargetContext(element) / childLength(element)) * multiplier;
    }

    // Animate the frame

    function frameAnimation(options, index, pos) {
        $(options.parent, options.container).stop(true, true).animate({
            'left': (index === 0) ? pos + '%' : -(pos) + '%'
        });
    }

    $.fluvidus.defaults = {
        container: '#fluvidus',
        parent: '.fluvidus-frame',
        child: '.fluvidus-item',
        child_active: 'fluvidus-item-active',
        child_items: [{
            media: '',
            desc: ''
        }],
        pager: true,
        nav_pager_item: 'fluvidus-nav-item',
        prev_id: 'fluvidus-button-prev',
        next_id: 'fluvidus-button-next',
        nav_prev_label: 'Previous',
        nav_next_label: 'Next'
    }

})(jQuery);