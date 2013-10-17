var Callsign = function() {
	'use strict';
	this.url = 'http://callsign.qbit.io/%S';
	this.cache = {};
	this.map = {
		lastUpdate: 'Last Update',
		licName:      'License Name',
		frn:          'Federal Registration Number (FRN)',
		callsign:     'Call Sign',
		categoryDesc: 'Category Description',
		statusDesc:   'License Status',
		expiredDate:  'Date Expires',
		licenseID:    'License ID',
		licDetailURL: 'FCC ULS'
	};
};
Callsign.prototype.process = function(data) {
	'use strict';
	var i, l, lic, ret = {}, rval;
	if (typeof data === 'string') {
		data = JSON.parse(data);
	}

	if ( data && data.Licenses && data.Licenses.License ) {
		for ( i = 0, l = data.Licenses.License.length; i < l; i++ ) {
			lic = data.Licenses.License[i];
			ret[lic.callsign] = lic;
			this.cache[lic.callsign] = lic;
		}
		rval = ret[lic.callsign];
	} else {
		rval = ret;
	}

	return rval;
};
Callsign.prototype.pretty = function(d) {
	'use strict';
	var o = [], i;
	for( i in d ) {
		if ( d.hasOwnProperty(i) ) {
			if ( this.map[i] ) {
				if ( i === 'licDetailURL' ) {
					o.push( '<b>' + this.map[i] + '</b>: ' + '<a target="_blank" href="' + d[i] + '">link</a>' + '<br />' );
				} else {
					o.push( '<b>' + this.map[i] + '</b>: ' + d[i] + '<br />' );
				}
			}
		}
	}

	return o;
};
Callsign.prototype.get = function(call, fn) {
	'use strict';
	var self = this;
	if ( this.cache[call] ) {
		fn.call(null, this.cache[call]);
	} else {
		$.ajax({
			url: this.url.replace('%S', call),
			type: 'POST',
			dataType: 'jsonp',
			success: function(d) {
				d = self.process(d);
				fn.call(null, d);
			}
		});
	}
};
