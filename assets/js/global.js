jQuery(function($) {
	$('.entry-media').fitVids();
	
	var activate = (Modernizr.touch && navigator.userAgent.toLowerCase().indexOf('blackberry') == -1 ? 'touchend' : 'click');
	$('#nav-main h1').bind(activate, function(e) {
		$('#nav-main .menu').toggleClass('open');
		e.preventDefault();
		e.stopPropagation();
	});
	
	// add hover support for li
	$('li').hover(
		function() { $(this).addClass('hover'); },
		function() { $(this).removeClass('hover'); }
	);

	// Bio box carousel
	var $bioCarousel = $('#bio-carousel .bio-box-gallery-images');
	if ($bioCarousel.size() > 0 && typeof $bioCarousel.cycle === 'function') {
		var $bioImages = $bioCarousel.find('img');
		
		if ($bioImages.size() > 1) {
			$bioCarousel.cycle({
				'fx': 'scrollHorz',
				'timeout': 0,
				'next': '#bio-carousel-next, .bio-box-gallery-images img', 
				'prev': '#bio-carousel-prev',
				'speed': 400
			});
			$bioImages.hover(function() {
				$(this).css({'cursor': 'pointer'});
			});
		};
	};

	// Social link tooltips
	$('.bio-box-links li').each(function() {
		var $this = $(this);
		var $tooltip_html = $('<div class="bio-tooltip"/>')
			.html($this.find('img').attr('alt'));
		
		$(this).append($tooltip_html).find('a').removeAttr('title');
		$tooltip_html.css('margin-left', -1 * ($tooltip_html.outerWidth() / 2) + ($this.outerWidth() / 2));	
	});
	
// Search form scripts
	// make placeholder attribute work in older browsers
	// requires jquery.placeholder.min.js
	$('#s').placeholder();

// Gallery
	var $gal = $('.cfgallery'),
		scale = $.fn.cfgallery.helpers.scale;

	var getGalleryDims = function(gallery) {
		gallery = $(gallery);

		var dims = [];
		var viewportW = $(window).width()
		
		// set defaults
		var w = gallery.data('width');
		var h = gallery.data('height');
		dims[0] = (typeof w === 'undefined' ? 710 : w);
		dims[1] = (typeof h === 'undefined' ? 474 : h);

		// Proportional scale based on screen size
		if (viewportW < 480) {
			dims = scale(dims, [300, 999]);
			gallery.addClass('mobile-portrait');
		}
		// iPhone Landscape
		else if (viewportW < 768) {
			dims = scale(dims, [460, 999]);
			gallery.addClass('mobile-landscape');
		}
		// iPad Portrait
		else if (viewportW < 1009) {
			dims = scale(dims, [570, 999]);
			gallery.addClass('mobile-tablet');
		}

		return dims;
	}

	$gal.each(function() {
		$(this).cfgallery({
			'stageDimensions': getGalleryDims(this),
			'titleClass': 'h3'
		});
	});
	
	$('.gallery-img-excerpt li:not(.gallery-view-all) a').cfShimLinkHash();

	var resizePage = function() {
		$gal.each(function() {
			var dims = getGalleryDims(this);
			$(this).trigger('resize.cfgal', dims);
		})
	}

	var fgResizeTimeout;
	$(window).resize(function() {
		clearTimeout(fgResizeTimeout);

		//call the resizePage function
		fgResizeTimeout = setTimeout(resizePage, 100);
	});
});
