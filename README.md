Fluvidus 
=========
(flowing) a simple fluid carousel implementation.

[Demo - Static Data](http://mugetsu.github.io/fluvidus/index.html)

[Demo - 3-Base Frame - Dynamic Data](http://mugetsu.github.io/fluvidus/three-frames.html)

## Using Fluvidus (Alpha)

Basic:

    $('#fluvidus').fluvidus();

Overriding defaults (3-Frames Configuration):

    $.fluvidus.defaults = {
      frame: '.fluvidus-frame',
      frameBase: [
        { frameId: 'fluvidus-item-prev' },
        { frameId: 'fluvidus-item-curr' },
        { frameId: 'fluvidus-item-next' }
      ],
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

**frame** = *id/className of the carousel main frame*

**frameBase** = *id of the carousel basic frames (previous, current, next) in order*

**child** = *className of the carousel item (frame items)*

**childActive** = *className of the carousel active item*

**childItems** = *image & image description per item, the content*

**pager** = *true; enable pagination style, false; prev & next*

**navItemLabel** = *className for pager items*

**navItemActive** = *className of the carousel active item*

**navPrevLabel** = *previous btn label*

**navNextLabel** = *next btn label*

**prevId** = *previous btn id*

**nextId** = *next btn id*

## License

GPL
