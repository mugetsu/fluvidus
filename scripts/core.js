(function($) {

  // Initialize fluvidus
  $('#fluvidus').fluvidus({
  	pager: false, // true; pagination style
  	child_items: [{
  		media: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/012/cache/star-birth-clouds_1227_990x742.jpg',
  		desc: 'Pillars of gas in the Eagle nebula'
  	}, {
  		media: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/010/cache/interacting-galaxies_1009_990x742.jpg',
  		desc: 'Pair of interacting galaxies'
  	}, {
  		media: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/011/cache/saturn-aurorasingle_1182_990x742.jpg',
  		desc: 'An aurora on Saturn'
  	}, {
  		media: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/010/cache/majestic-sombrero_1057_990x742.jpg',
  		desc: 'Glowing, sombrero-shaped galaxy'
  	}]
  });

})(jQuery);