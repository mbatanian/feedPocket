

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
				if (condensedItem.length > 0) {
					condensedItem.addClass('pocketed');
					condensedItem.attr('src', chrome.extension.getURL('lib/pocketed.png'));
				}
			},
			error: function (jqXhr, textStatus, errorThrown) {
				alert('Error saving to Pocket');
			}
		});
	};

	var addPocketDOMItem = function (item) {
		var ct = item.find('.condensedTools');
		if (ct.find('.pocket').length === 0) {
			ct.find('img[data-page-entry-action="facebookEntry"]').after(pocketElement);
			ct.find('img[data-page-entry-action="bufferEntry"]').remove();
		}
	};

	var scutKey = 188; // ','

	var imgUrl = chrome.extension.getURL('lib/pocket.png');
	var pocketElement = '<img class="pocket" data-page-entry-action="pocketEntry" title="Post to Pocket" src="'+imgUrl+'"">';

	$(document).on('mouseenter', '.u0Entry', function () {
		addPocketDOMItem($(this));
	});

	$(document).on('keyup', function (e) {
		// find the selected entry...
		var item = $('.selectedEntry')

		// if it's the proper key, send to pocket
		if (e.which === scutKey) {
			// first, make sure the dom item exists...
			addPocketDOMItem(item);
	
			var pkitem = item.find('.pocket');
			url = item.attr('data-alternate-link');
			// hacky, but when the item is expanded, it doesn't have a data attr for the link...
			// so dig and find it.
			if (url.length <= 0) {
				url = item.find('.u100Entry').attr('data-alternate-link');
			}
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

