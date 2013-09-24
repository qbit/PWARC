function loadPage(page) {
	if (window.location.hash.match(/#/) && !page) {
		page = window.location.hash.replace('#','') + '.md';
	} else {
		if (page) {
			page = page.replace('#','') + '.md';
		} else {
			page = 'club.md';
		}
	}

	$.get('texts/' + page, function(d) {
		$('#main').html(marked(d));
		$('table').addClass('table table-condensed table-hover table-striped table-bordered');
		$('.callsign').click(function() { 
			var self = this; 
			callmgr.get($(this).text(), function(d) { 
				var title = d.callsign;
				$(self).popover({
					title: title,
					content: callmgr.pretty(d),
					html: true
				}); 
				$(self).popover('show');
			}); 
		});
	}); 

}
