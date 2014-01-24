/*!
 * Fluvidus v.2
 * Randell Quitain [@cprjk]
 * Licensed under the MIT license
 */
 
var fluvidus = {
    init: function (options, elem) {
        this.options = $.extend({}, this.options, options);
        this.elem = elem;
        this.$elem = $(elem);
        this._start();
        return this;
    },
    options: {
        items: '.items'
    },
    _start: function () {

        console.log(this._pointer(0));

        // Set container width
        this.$elem.css('width', this.$elem.width() * this._count());

        var imageTag, pointers = this._pointer(0);

        for (var i = pointers.length - 1; i >= 0; i--) {

            var imgUrl = $(this.options.items, this.$elem).eq(pointers[i]).data('src')
            , imgCaption = $(this.options.items, this.$elem).eq(pointers[i]).data('caption');

            imageTag = '<div class="image-container">';
            imageTag += '<img src="'+imgUrl+'" alt="'+imgCaption+'" />';
            imageTag += '</div>';

            $(this.options.items, this.$elem).eq(pointers[i]).append(imageTag);

            this._preloader(imgUrl);

        };
        // console.log($(this));
        // console.log('currItem:'+currItem+', nextItem:'+nextItem+', prevItem:'+prevItem);
        
    },
    _count: function () {
        var size = $(this.options.items, this.$elem).length;
        return size;
    },
    _pointer: function (currItem) {
        var pointed = []  
        , currItem = currItem
        , nextItem = currItem + 1
        , prevItem = this._count() - 1;
        pointed = [currItem, nextItem, prevItem];
        return pointed;
    },
    _preloader: function(url) {
        var image = new Image();
        image.src = url;
        image.onload = function() {
            $('.image-container').fadeTo(500, 1);
        };
    }
};

if (typeof Object.create !== "function") {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

$.plugin = function (name, object) {
    $.fn[name] = function (options) {
        return this.each(function () {
            if (!$.data(this, name)) {
                $.data(this, name, Object.create(object).init(
                    options, this));
            }
        });
    };
};