Fluvidus 
=========
(flowing) a simple fluid carousel implementation

## Using Fluvidus (Beta)

[Previous & Next Demo](http://mugetsu.github.io/fluvidus/prev-next.html)

[Pager Demo](http://mugetsu.github.io/fluvidus/pager.html)

##Basic Usage:

Using Fluvidus you need to follow a simple pattern:

    <div id="fluvidus" class="fluvidus-block">
        <ul class="fluvidus-frame">
            <li id="fluvidus-item-prev" class="fluvidus-item"></li>
            <li id="fluvidus-item-curr" class="fluvidus-item"></li>
           <li id="fluvidus-item-next" class="fluvidus-item"></li>
        </ul>
    </div>
    
Add stylesheet (or edit it the way you want):

    <link href="path_to/fluvidus.css" rel="stylesheet">

Also add Fluvidus plugin:

    <script type="text/javascript" src="path_to/jquery.min.js"></script> <!-- jQuery! -->
    <script type="text/javascript" src="path_to/jquery.easing.1.3.js"></script> <!-- add this if you want easing on your carousel -->
    <script type="text/javascript" src="path_to/fluvidus.min.js"></script> <!-- minified version of Fluvidus -->
    
And the js basic implementation:

    $('#fluvidus').fluvidus({
        childItems: [{
            hero: 'path_to/image.jpg',
            desc: 'Add caption'
        }, {
            hero: 'path_to/image.png',
            desc: 'Add caption'
        }, {
            hero: 'path_to/image.jpg',
            desc: 'Add caption'
        }]
    });
    
Added some carousel options:

    $('#fluvidus-pager').fluvidus({
        childItems: [{
            hero: 'path_to/image.jpg',
            desc: 'Add caption'
        }, {
            hero: 'path_to/image.png',
            desc: 'Add caption'
        }, {
            hero: 'path_to/image.jpg',
            desc: 'Add caption'
        }],
        pager: true,
        delay: 300,
        easing: 'easeInCirc'
    }); 

##Configuration Defaults:
    $.fluvidus.defaults = {
	    frame: '.fluvidus-frame',
	    frameBase: [
			{ frameId: 'fluvidus-item-curr' },
			{ frameId: 'fluvidus-item-next' },
			{ frameId: 'fluvidus-item-prev' }
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
	    easing: 'linear',
        autoplay: false,
        speed: 5000
    }

##Configuration Options:

- **frame** - id/class name of the carousel main frame

- **frameBase** - id of the carousel basic frames (previous, current, next) in order

- **child** - class name of the carousel item (frame items)

- **childItems** - image & image description per item, the content

- **navItemLabel** - class name for pager items

- **navPrevLabel** - previous btn label

- **navNextLabel** - next btn label

- **prevId** - previous btn id

- **nextId** - next btn id

- **loaderIcon** - set loader image

- **pager** - true; enable pagination style, false; prev & next

- **pagerActive** - active pagination class name

- **delay** - set animation delay

- **easing** - set animation easing

- **autoplay** - enable carousel autoplay

- **speed** - set autoplay speed

## License

GPL V2
