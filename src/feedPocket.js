

// $('.u0Entry').hover(function () {
// $('.pageActionBar').hover(function () {
// 	console.log('hello');
// }, function () {
// 	console.log('wrld');
// });

(function($) {

	var imgUrl = chrome.extension.getURL('lib/pocket.png');
	var pocketElement = '<img class="pocket" data-page-entry-action="pocketEntry" title="Post to Pocket" src="'+imgUrl+'"">';

	$(document).on('mouseenter', '.u0Entry', function () {
		console.log('dowork');
		console.log(pocketElement);
		var ct = $(this).find('.condensedTools');
		if (ct.find('.pocket').length === 0) {
			ct.find('img[data-page-entry-action="facebookEntry"]').after(pocketElement);
			ct.find('img[data-page-entry-action="bufferEntry"]').remove();
		}
		
	});

		

})(jQuery);

