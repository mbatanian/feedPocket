

(function($) {

	var sendToPocket = function (toAdd, item) {
		$.ajax({
			url: 'https://getpocket.com/v3/add',
			type: 'POST',
		 	contentType: 'application/json',
		 	dataType: 'json',
			data: JSON.stringify({
		 		'url': toAdd,
		 		'access_token': 'nan',
				'consumer_key': 'nan'
			}),
			success: function () {
				item.addClass('pocketed');
				item.attr('src', chrome.extension.getURL('lib/pocketed.png'));
			},
			error: function (jqXhr, textStatus, errorThrown) {
				alert('error saving to pocket');
			}
		});
	};

	var imgUrl = chrome.extension.getURL('lib/pocket.png');
	var pocketElement = '<img class="pocket" data-page-entry-action="pocketEntry" title="Post to Pocket" src="'+imgUrl+'"">';

	$(document).on('mouseenter', '.u0Entry', function () {

		var ct = $(this).find('.condensedTools');
		if (ct.find('.pocket').length === 0) {
			ct.find('img[data-page-entry-action="facebookEntry"]').after(pocketElement);
			ct.find('img[data-page-entry-action="bufferEntry"]').remove();
		}
		
	});

	$(document).on('click', '.pocket', function () {
		var item = $(this);
		if (!item.hasClass('pocketed')) {
			var url = $(this).closest('.u0Entry').attr('data-alternate-link');
			sendToPocket(url, $(this));
		}
	});

})(jQuery);

