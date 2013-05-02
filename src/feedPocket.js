

(function($) {

	var sendToPocket = function (urlToAdd, condensedItem) {

		$.ajax({
			url: 'https://getpocket.com/v3/add',
			type: 'POST',
		 	contentType: 'application/json',
		 	dataType: 'json',
			data: JSON.stringify({
		 		'url': urlToAdd,
		 		'access_token': 'nan',
		 		'consumer_key': 'nan'
			}),
			success: function () {
				condensedItem.addClass('pocketed');
				condensedItem.attr('src', chrome.extension.getURL('lib/pocketed.png'));
			},
			error: function (jqXhr, textStatus, errorThrown) {
				alert('error saving to pocket');
			}
		});
	};

	var addPocketDOMItem = function (item) {
		console.log('writing');
		var ct = item.find('.condensedTools');
		if (ct.find('.pocket').length === 0) {
			ct.find('img[data-page-entry-action="facebookEntry"]').after(pocketElement);
			ct.find('img[data-page-entry-action="bufferEntry"]').remove();
		}
	};

	var scutKey = 67; // 'C'

	var imgUrl = chrome.extension.getURL('lib/pocket.png');
	var pocketElement = '<img class="pocket" data-page-entry-action="pocketEntry" title="Post to Pocket" src="'+imgUrl+'"">';

	$(document).on('mouseenter', '.u0Entry', function () {
		addPocketDOMItem($(this));
	});

	$(document).on('keyup', function (e) {
		// find the selected entry...
		var item = $('.selectedEntry')
		// first, make sure the dom item exists...
		addPocketDOMItem(item);
		// then, if it's the proper key, send to pocket
		if (e.which === scutKey) {
			var pkitem = item.find('.pocket');
			url = item.attr('data-alternate-link');
			sendToPocket(url, pkitem);
		}
	});

	$(document).on('click', '.pocket', function () {
		var item = $(this);
		if (!item.hasClass('pocketed')) {
			var url = item.closest('.u0Entry').attr('data-alternate-link');
			sendToPocket(url, item);
		}
	});

})(jQuery);

