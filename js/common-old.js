$(document).ready(function(){


	if($('.gallery-inner').length){
		$('.gallery-inner').fancybox();
	}

	if (('#slider').length){
		initSlider(0);
	}
	if(! $('.news-header .imgwrap').length){
		$('.news-header .wrapper').width('100%');
	}

	$('.accordion .name').on('click',function(){
		var accordion = $(this).parents('.accordion');
		for (var i = 0; i<999; i++){ clearInterval(i);}
		if(accordion.hasClass('a1')){
			setTimeout(function(){
				startInterval(accordion);
			}, 7000);
			startInterval($('.accordion.a2'));
		}
		if(accordion.hasClass('a2')){
			setTimeout(function(){
				startInterval(accordion);
			}, 7000);
			startInterval($('.accordion.a1'));
		}
		var slide = $('#slider').slick('slickCurrentSlide');
		$('#slider').slick('unslick');
		initSlider(slide);
	});

	$('#menu-btn').on('click',function(){
		$('#main-menu').slideToggle(200);
	});

	$('.to.log-in').on('click',function(){
		$.fancybox.open({'scrolling':'auto',
			'autoScale': true,
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 500,
			'speedOut': 300,
			'autoDimensions': true,
			'centerOnScroll': true,
			'href' : '#login',
			'padding' : '0',
			'height' : 'auto',
			'closeBtn':true,
			helpers: {
				overlay: {
					locked: false
					}
				}
			});
	});

	$('.regist-form').on('submit',function(){
		$.fancybox.open({'scrolling':0,
			'autoScale': true,
			'transitionIn': 'elastic',
			'transitionOut': 'elastic',
			'speedIn': 500,
			'speedOut': 300,
			'autoDimensions': true,
			'centerOnScroll': true,
			'href' : '#done-regist',
			'padding' : '0',
			'height' : 'auto',
			'closeBtn':true,
			helpers: {
				overlay: {
					locked: false
					}
				}
			});
		return false;
	});

	$('input.input-file').on('change', function(){
		var current = $(this);
		current.parent('div').find('.file-name').text(current.val());
	});

	$('[id^="social"]').on('change',function(){
		if($(this).is(':checked')){
			$(this).parents('li').find('input').removeAttr('disabled');
		}
		else{
			$(this).parents('li').find('input').attr('disabled','disabled');
		}
	});

	// tabs
	$('.tab-navi .btn').on('click',function(){
		if($(this).hasClass('active')){return false;}
		var current = $(this),
			wrapper  = current.parents('.tabs-wrapper'),
			inner = wrapper.find('.tabs-inner');
		wrapper.find('.tab-navi .btn').removeClass('active');
		inner.find('.tab').slideUp(300).removeClass('active');
		current.addClass('active');
		inner.find('.tab.t'+current.attr('data-tab')).slideDown(300).addClass('active');
	});

	// categories
	$('.category .name').on('click',function(){
		var category = $(this).parent('.category');
		if(category.hasClass('active')) { return false; }
		var wrapper = category.parents('.categories');
		wrapper.find('.category').removeClass('active').find('.drop').slideUp(300);
		category.find('.drop').slideDown(300);
		category.addClass('active');
	});

	// brands
	$('.brands-wrapper .brand .imgwrap').on('click',function(){
		var current = $(this).siblings('.description'),
			brand = current.parent('.brand'),
			wrapper = brand.parent('.brands-wrapper'),
			adress = current.find('.adress');

		if (current.hasClass('active')) { return false;}
		current.removeClass('last-in-row');
		if (brand.position().left > wrapper.width() - brand.width()-10) { current.addClass('last-in-row');}
		if (adress.find('.item').length > 10){
			current.addClass('big');
			adress.fadeOut(0);
		}else{
			if(adress.find('.item').length>1){
				adress.slick().css('opacity',0).slick('slickGoTo');
				adress.on('afterChange', function(event, slick, currentSlide, nextSlide){
					adress.css('opacity',1);
				});;
			}
		}
		wrapper.append('<div class="overlay" onclick="closeDescription();"></div>').fadeIn(300);
		current.addClass('active').fadeIn(300);
	});

	$('.brand .close').on('click', closeDescription);
	initAccordion();

	$('.brand .description .count').on('click',function(){
		if($(this).siblings('.adress').find('.item').length>10){
			$(this).toggleClass('active');
			$(this).siblings('.adress').slideToggle(400);
			$(this).siblings('.paginator').slideToggle(400);
			$(this).parents('.brand').toggleClass('static');
			if($(window).scrollTop()>$('.brands-wrapper').offset().top-20){
				scrollToElement($('.brands-wrapper'));
			}
		}
	});

	$('.reviews-toggle').on('click', function(){
		$('.reviews-wrapper').slideToggle(300);
	});

	// gallery slider
	if($('.gallery-slider').length){
		setVideoHeight();
		$('.gallery-slider').bxSlider({
			video: true,
			useCSS: false,
		});
		// $('.gallery-slider').slick({
		// 	arrows:true,
		// 	dots:true,
		// 	swipe:false,
		// });
	}
	if($('.news-slider').length){
		$('.news-slider').slick({
			arrows:true,
			dots:false,
			slidesToShow:5,
			slidesToScroll:5,
			responsive: [
				{
					 breakpoint: 991,
					 settings: {
						 slidesToShow: 4,
						 slidesToScroll: 4,
					 }
				},
				{
					breakpoint: 677,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
			]
		});
		$('.news-slider-item').fancybox();
	}

	// calendar init
	if($('#calendar').length){
		$('#calendar').pickadate({
			// min:[2015,9,9],
			// max: [2016,9,9],
			// Translations
			monthsFull: [ 'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь' ],
			monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
			weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
			weekdaysShort: [ 'В', 'П', 'В', 'С', 'Ч', 'П', 'С' ],
			today: 'сегодня',
			clear: 'удалить',
			close: 'закрыть',
			firstDay: 1,
			format: 'd mmmm yyyy г.',
			formatSubmit: 'yyyy/mm/dd',
			// buttuns
			today: false,
			clear: false,
			close: false,
		});
	}

});

$(window).resize(function(){
	if($('.gallery-slider').length){
		setVideoHeight();
	}
});


function accordionAutoplay(accordion){
	var current = accordion.find('.slick-current'),
		next = current.next();
	if (!next.length){next =accordion.find('li').first();}
	next.trigger('click');
	next.trigger('hover');
}

function startInterval(accordion){
	 setInterval(function(){
		accordionAutoplay(accordion)},3000);
}

function closeDescription(){
	var brands = $('.brands-wrapper'),
		description = brands.find('.description.active');
		item = description.parent('.brand');

	if (description.parent('.brand').hasClass('static')||description.parent('.brand').find('.adress .item').length<2){
		setTimeout(function(){
			$('.brands-wrapper .brand').removeClass('static').find('.description .paginator').fadeOut(0);
		},1000);
	}else{
		setTimeout(function(){
			description.parent('.brand').find('.adress').slick('unslick');
		},700);
	}
	description.fadeOut(1000).removeClass('active');
	setTimeout(function(){
		brands.find('.overlay').fadeOut(100).remove();
		description.removeClass('big');
	},900);
}

function initSlider(slide){
	$('#slider').slick({
			slidesToShow:3,
			slidesToScroll:3,
			arrows:false,
			dots:true,
			autoplay:true,
			autoplaySpeed:3500,
			speed:1000,
			initialSlide:slide,
			responsive: [
				 {
					 breakpoint: 767,
					 settings: {
						slidesToShow:2,
						slidesToScroll:2,
					 }
				 }
			]
		});
}

function initAccordion(){
	var accord1 = $('.accordion.a1'),
		accord2 = $('.accordion.a2');
	startInterval(accord1);
	startInterval(accord2);
	accord1.slick({
		vertical:true,
		dots:false,
		arrows:false,
		slidesToShow:4,
		asNavFor: '.accord-img.a1',
		focusOnSelect: true,
		autoplay:true,
	});
	$('.accord-img.a1').slick({
		vertical:true,
		dots:false,
		arrows:false,
		asNavFor: '.accordion.a1',
		speed:800,
		swipe:false,
	});
	accord2.slick({
		vertical:true,
		dots:false,
		arrows:false,
		slidesToShow:4,
		asNavFor: '.accord-img.a2',
		focusOnSelect: true
	});
	$('.accord-img.a2').slick({
		vertical:true,
		dots:false,
		arrows:false,
		asNavFor: '.accordion.a2',
		speed:800,
		swipe:false,
	});
}

function scrollToElement(element){
	$('html, body').animate({scrollTop: element.offset().top-20}, 300);
}

function setVideoHeight(){
	 $('.gallery-slider iframe').height($('.gallery-slider .imgwrap').first().height());
}