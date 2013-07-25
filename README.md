Fluvidus 
=========
(flowing) a simple fluid carousel implementation.

[Demo](http://mugetsu.github.io/fluvidus)

## Using Fluvidus (Beta)

Basic:

    $('#fluvidus').fluvidus();

Overriding defaults:

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
      pagerActive: 'fluvidus-button-active'
    }

**frame** = *id/className of the carousel main frame*

**frameBase** = *id of the carousel basic frames (previous, current, next) in order*

**child** = *className of the carousel item (frame items)*

**childItems** = *image & image description per item, the content*

**navItemLabel** = *className for pager items*

**navPrevLabel** = *previous btn label*

**navNextLabel** = *next btn label*

**prevId** = *previous btn id*

**nextId** = *next btn id*

**loaderIcon** = *set loader image*

**pager** = *true; enable pagination style, false; prev & next*

**pagerActive** = *active pagination class name*

## License

GPL
