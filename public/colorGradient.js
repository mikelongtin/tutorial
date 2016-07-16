
// inspired by http://krazydad.com/tutorials/makecolors.php

'use strict';

(function ($)
{
	$.colorGradient = function (frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width, len)
	{
		// $.colorGradient(.3, .3, .3, 2, 4, 0);
		// var output = '<font color="' + color + '">&#9608;</font>';

		center = center || 128;
		width  = width || 127;
		len    = len || 50;

		function byte2Hex (n)
		{
			var nybHexString = "0123456789ABCDEF";
			return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
		}

		function RGB2Color (r, g, b)
		{
			return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
		}

		var gradient = [];

		for (var i = 0; i < len; i += 1)
		{
			var red = Math.sin(frequency1 * i + phase1) * width + center;
			var grn = Math.sin(frequency2 * i + phase2) * width + center;
			var blu = Math.sin(frequency3 * i + phase3) * width + center;
			gradient.push(RGB2Color(red, grn, blu));
		}

		return gradient;
	};

})(jQuery);