var SliderWidget = (function(){

	var _insertValues = function($this) {
		var
				container = $this.closest('.filter__slider'),
				from = container.find('.filter__slider-input_from'),
				to = container.find('.filter__slider-input_to');

		var values = $this.slider('option', 'values');

		from.val(values[0]);
		to.val(values[1]);
	}

	return {
		init: function() {

			$(".filter__slider-element").each(function(){
				var
						$this = $(this),
						min = parseInt($this.data('min')),
						max = parseInt($this.data('max'));

				$this.slider({
		      range: true,
		      min: min,
		      max: max,
		      values: [min, max],
		      slide: function() {
		        _insertValues($this);
		      },
		      create: function() {
		      	_insertValues($this);
		      }
		    });
		  });
		}
	}

}());

var RatingWidget = (function(){

	var _letTheStarsShining = function(ratingAmount) {
		var
				starsArray = [];

				for (var i = 0; i < 5; i++) {
					var
							starClassName = (i < ratingAmount) ? 'products__rating-stars-item products__rating-stars-item_filled icon-star' : 'products__rating-stars-item icon-star-empty';

					var
							star = $('<li>',{
								class: starClassName
							});

					starsArray.push(star);
				}

				return starsArray;

	}

	var _generateMarkup = function(ratingAmount, elementToAppend) {
		var
				ul = $('<ul>', {
					class: 'products__rating-stars',
					html: _letTheStarsShining(ratingAmount)
				});

		var
				ratingDisplay = $('<div>', {
					class: 'products__rating-amount',
					text: ratingAmount
				});
	}

	return {
		init: function(){
			$('.products__rating').each(function() {
				var
						$this = $(this),
						ratingAmount = parseInt($this.data('rating'));

				_generateMarkup(ratingAmount, $this);
			});
		}

	}

}());

var ViewStateChange = (function(){

	var _previousClass = '';

	var _changeState = function($this) {
		var
				item = $this.closest('.sort__view-item'),
				view = item.data('view'),
				listOfItems = $('#products-list'),
				modificationPrefix = 'products__list_',
				classOfViewState = modificationPrefix + view;

		if (_previousClass == '') {
			_previousClass = listOfItems.attr('class');
		}

		_changeActiveClass($this);
		listOfItems.attr('class', _previousClass + ' ' + classOfViewState);
	};

	var _changeActiveClass = function($this) {
		$this
				.closest('.sort__view-icon').addClass('active')
				.siblings().removeClass('active');
	}

	return {
		init: function(){
			$('.sort__view-link').on('click', function(e){
				e.preventDefault();
				_changeState($(this));
			});
		}
	}
}());

$(document).ready(function() {

	ViewStateChange.init();

	if ($('.products__rating').length) {
		RatingWidget.init();
	}
	
	if ($('.filter__slider-element').length) {
		SliderWidget.init();
	}
	
	if ($('.sort__select-elem').length) {
			$('.sort__select-elem').select2({
				minimumResultsForSearch: Infinity
			});
	}

	$('.filter__reset').on('click', function(e){
		e.preventDefault();

		var
				$this = $(this),
				container = $this.closest('.filter__item'),
				checkboxes = container.find('input:checkbox');

		checkboxes.each(function() {
			$(this).removeProp('checked');
		});
	});
});