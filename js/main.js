
var slide_colors = ["#0a7cc6", "#1e150d", "#291464"];
var slider_speed = 750; 

var w = 0;
var h = 0;
var screenOrientation = 'landscape';
var screenRatio = 1;
var scrolling = false;

var cover_cont = 'none';
 
(function($) {


$(window).load(function() { 

	w = $('body').width();
	h = $(window).height();

	$(window).resize(function(e) { 

		res(); 
		setTimeout(res, 100);

	});

	$(window).keydown(function(e) {

		//alert(e.which);

		if (e.which == 27) {

			// Esc
			hide();
			e.preventDefault();

		}

	});

	res();
	setTimeout(res, 100);


	$('#status').fadeOut(); 
	$('#preloader').delay(500).fadeOut('slow');

	$('html').css('overflow', 'auto');
	$('body').css('overflow', 'auto');   

});

function res() {

	w = $(window).width();
	h = $(window).height();

	// side buttons position

	var sb_height = $('.side-buttons').height();
	var sp_pos = 0.5 * (h - sb_height);

	if (sp_pos < 0) sp_pos = 0;
		
	$('.side-buttons').css('top', sp_pos+'px');

	screenOrientation = (w >= h) ? 'landscape' : 'portrait';
	screenRatio = w / h;

}


$(document).ready(function() {

	// alert('page ready!');

	// init header slider

	// if ($('.slider_cont').length > 0) {

	// $('.slider_cont').slick({

	// 	dots: true,
	// 	speed: slider_speed,
	//     	infinite: true,
	//     	arrows: true,
	//     	draggable: true,
	//     	adaptiveHeight: false,
	// 	autoplay: true,
	//     	swipeToSlide: true,
	//     	autoplaySpeed: 4000,

	//     	prevArrow: '<img class="slick-prev" src="img/slider-arrow-left.png">',
	//     	nextArrow: '<img class="slick-next" src="img/slider-arrow-right.png">',

	//     	slidesToShow: 1,
	// 	slidesToScroll: 1

	// });

	// }

	// init gallery slider

	// if ($('.gallery_cont').length > 0) {

	// $('.gallery_cont').slick({

	//     	dots: true,
	//     	speed: 500,
	//     	infinite: true,
	//     	arrows: true,
	//     	draggable: true,
	//     	adaptiveHeight: false,
	// 		autoplay: false,
	//     	swipeToSlide: true,
	//     	autoplaySpeed: 4000,

	//     	prevArrow: '<img class="slick-prev" src="img/slider-arrow-left.png">',
	//     	nextArrow: '<img class="slick-next" src="img/slider-arrow-right.png">',

	//     	slidesToShow: 2,
	// 	slidesToScroll: 1

	// });

	// }

	// init tooltipster styles

	$('.tooltip').tooltipster({

		theme: 'tooltipster-borderless',
		animation: 'fade',
		debug: false,
		delay: 250,
		offsetY: 0,
		hideOnClick: true,
		position: 'bottom',
		positionTracker: true

	});

	$('.tooltip_right').tooltipster({

		theme: 'tooltipster-borderless',
		animation: 'fade',
	    	debug: false,
	    	delay: 250,
	    	offsetX: 0,
	    	hideOnClick: true,
	    	position: 'right',
	    	positionTracker: true

	});

	$('.tooltip_left').tooltipster({

	    	theme: 'tooltipster-borderless',
		animation: 'fade',
	    	debug: false,
	    	delay: 250,
	    	offsetX: 0,
	    	hideOnClick: true,
	    	position: 'left',
	    	positionTracker: true

	});

	$('.tooltip_top').tooltipster({

		theme: 'tooltipster-borderless',
		animation: 'fade',
		debug: false,
		delay: 250,
		offsetY: 5,
		hideOnClick: true,
		position: 'top',
		positionTracker: true

	});


});

$('.header-slider').stop().animate(
	{
		backgroundColor: slide_colors[0]
	}, 
	slider_speed
);

// On before slide change
$('.slider_cont').on('beforeChange', function(event, slick, currentSlide, nextSlide) {

	console.log(slide_colors[nextSlide]);

	$('.header-slider').stop().animate(
		{
			backgroundColor: slide_colors[nextSlide]
		}, 
		slider_speed
	);

});





})(jQuery);




function show(cont, change) {

	change = change || false;

	if (change) {
		hideSideMenu();
	} else {
		showCover(); 
	}

	switch (cont) {
		
		case 'side-menu':
			showSideMenu();
		break;
	
		case 'form-call':
		case 'form-calculate':
		case 'form-measure':
		case 'form-message':
			showForm(cont);
		break;

	}

	return false;

}

function hide() {

	switch (cover_cont) {
		
		case 'side-menu':
			hideSideMenu();
		break;

		case 'form-call':
		case 'form-calculate':
		case 'form-measure':
		case 'form-message':
			hideForm(cover_cont);
		break;

	}

	hideCover(); 

	return false;

}


var coverOn = false;
var coverAnimation = false;

function showCover(cont) {

	(function($) {

		if (coverOn || coverAnimation) return;

		coverAnimation = true;
		coverOn = true;

		$('.cover').css('display', 'block');
		$('.cover').fadeTo(500, 0.75, function() { 
			
			coverAnimation = false;

		});


	})(jQuery);

} 

function hideCover() {

	(function($) {

		if (!coverOn) return;
		if (coverAnimation) return;

		coverAnimation = true;
		
		$('.cover').fadeTo(500, 0, function() { 
			
			$('.cover').css('display', 'none');
			coverAnimation = false;
			coverOn = false;

		});


	})(jQuery);

}


var coverContOn = false;
var coverContAnimation = false;

function showSideMenu() {

	(function($) {

		if (coverContOn || coverContAnimation) return;

		coverContAnimation = true;

		var sm_width = $('.side-menu').width();

		$('.side-menu').css('right', (-1*sm_width)+'px');

		$('.side-menu').animate(

			{
				right: 0,
			},

			{
				duration: 250,
				always: function () {

	    				coverContAnimation = false;
					coverContOn = true;
					cover_cont = 'side-menu';
												
				}
			}

		);

	})(jQuery);


} 

function hideSideMenu() {

	(function($) {

		if (!coverContOn) return;
		if (coverContAnimation) return;

		coverContAnimation = true;

		var sm_width = $('.side-menu').width();

		$('.side-menu').animate(

			{
				right: (-1*sm_width)+'px',
				//right: '-320px',
			},

			{
				duration: 250,
				always: function () {

	    				coverContAnimation = false;
					coverContOn = false;
					cover_cont = 'none';

					$('.side-menu').css('right', '-500px');

					//hideCover();
												
				}
			}

		);

	})(jQuery);

}

function showForm(type) {

	(function($) {

		//alert(type);

		//

		cover_cont = type;

	})(jQuery);


	return false;

};

function hideForm() {

	(function($) {

		cover_cont = 'none';

		//

		//hideCover();

	})(jQuery);

};

function showGallery() {

	(function($) {

		//

	})(jQuery);


	return false;

}
