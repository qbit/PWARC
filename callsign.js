var Callsign = function() {
	'use strict';
	this.url = 'http://data.fcc.gov/api/license-view/basicSearch/getLicenses?searchValue=%S&format=json';
	this.cache = {};
};
Callsign.prototype.process = function(data) {
	'use strict';
	var i, l, lic, ret;
	if (typeof data === 'string') {
		data = JSON.parse(data);
	}

	for ( i = 0, l = data.Licenses.length; i < l; i++ ) {
		lic = data.Licenses[i];
		ret[lic.callsign] = lic;
		this.cache[lic.callsign] = lic;
	}

	return ret[lic.callsign];
};
Callsign.prototype.get = function(call, fn) {
	'use strict';
	var self = this;
	if ( this.cache[call] ) {
		fn.call(null, this.cache[call]);
	} else {
		$.ajax({
			url: this.url.replace('%S', call),
			dataType: 'jsonp',
			success: function(d) {
				console.log(d);
				// d = self.process(d);
				// fn.call(null, d);
			}
		});
	}
};
