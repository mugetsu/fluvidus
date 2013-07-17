Fluvidus 
=========
(flowing) a simple fluid carousel implementation.

[Demo](http://mugetsu.github.io/fluvidus/).

## Using Fluvidus (Alpha)

Basic:

    $('#fluvidus').fluvidus();

Overriding defaults:

    $.fluvidus.defaults = {
      container: '#fluvidus',
      parent: '.fluvidus-frame',
      child: '.fluvidus-item',
      pager: true,
      nav_pager_item: 'fluvidus-nav-item',
      prev_id: 'fluvidus-button-prev',
      next_id: 'fluvidus-button-next',
      nav_prev_label: 'Previous',
      nav_next_label: 'Next'
    }

**container** = *id/className of the carousel container*

**parent** = *id/className of the carousel frame (main frame)*

**child** = *className of the carousel item (frame items)*

**pager** = *true; enable pagination style, false; prev & next*

**nav_pager_item** = *className for pager items*

**prev_id** = *change previous btn id*

**next_id** = *change next btn id*

**nav_prev_label** = *change previous btn label*

**nav_next_label** = *change next btn label*

## License

GPL
