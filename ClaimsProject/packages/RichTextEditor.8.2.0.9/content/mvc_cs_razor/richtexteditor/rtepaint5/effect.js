var define = jsml.class_define("__ImageEditorEffect", "jsml");
define.constructor(function (doc) {
	this._doc = doc;
});
define.method("__UnsharpMask", function (canvas, percent) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 1; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var ix = w * j + i;
			var ix2 = w * j + i - 1;
			for (var t = 0; t < 3; t++) {
				data[ix * 4 + t] += percent * Math.abs(imgdata.data[ix * 4 + t] - imgdata.data[ix2 * 4 + t]);
				if (data[ix * 4 + t] > 255)
					data[ix * 4 + t] = 255;
				if (data[ix * 4 + t] < 0)
					data[ix * 4 + t] = 0;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__Invert", function (canvas) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < times; i++) {
		data[i * 4] = 255 - data[i * 4];
		data[i * 4 + 1] = 255 - data[i * 4 + 1];
		data[i * 4 + 2] = 255 - data[i * 4 + 2];
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__TwoValue", function (canvas) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < times; i++) {
		var avg = parseInt((data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / 3 + "");
		if (avg >= 128)
			avg = 255;
		else
			avg = 0;
		data[i * 4] = avg;
		data[i * 4 + 1] = avg;
		data[i * 4 + 2] = avg;
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__GrayScale", function (canvas) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < times; i++) {
		var gray = (data[i * 4] * 299 + data[i * 4 + 1] * 587 + data[i * 4+2] * 114 + 500) / 1000;
		data[i * 4] = gray;
		data[i * 4 + 1] = gray;
		data[i * 4 + 2] = gray;
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__Smooth", function (canvas, weights, exceptradius) {
	if (!canvas)
		return;
	var s = Math.round(Math.sqrt(weights.length));
	var hs = Math.floor(s / 2);
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var outimgdata = ctx.createImageData(w, h);
	var outdata = data; // outimgdata.data;
	var times = w * h;
	var radius = 0;
	if (exceptradius) radius = hs;
	for (var j = radius; j < h - radius; j++) {
		for (var i = radius; i < w - radius; i++) {
			var si = i;
			var sj = j;
			var ix = (w * j + i) * 4;
			var r = 0, g = 0, b = 0, a = 0;
			for (var cj = 0; cj < s; cj++) {
				for (var ci = 0; ci < s; ci++) {
					var sci = si + ci - hs;
					var scj = sj + cj - hs;
					if (scj >= 0 && scj < h && sci >= 0 && sci < w) {
						var six = (scj * w + sci) * 4;
						var wt = weights[cj * s + ci];
						r += data[six] * wt;
						g += data[six + 1] * wt;
						b += data[six + 2] * wt;
						a += data[six + 3] * wt;
					}
					else {
						if (scj < 0) scj = 0 - scj;
						if (sci < 0) sci = 0 - sci;
						if (scj >= h) scj = 2 * h - scj - 1;
						if (sci >= w) sci = 2 * w - sci - 1;
						var six = (scj * w + sci) * 4;
						var wt = weights[cj * s + ci];
						r += data[six] * wt;
						g += data[six + 1] * wt;
						b += data[six + 2] * wt;
						a += data[six + 3] * wt;
					}
				}
			}
			outdata[ix] = r;
			outdata[ix + 1] = g;
			outdata[ix + 2] = b;
			outdata[ix + 3] = a;
		}
	}
	imgdata.data = outdata;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__Neon", function (canvas) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < w - 1; i++) {
		for (var j = 0; j < h - 1; j++) {
			var ix = w * j + i;
			var ix1 = w * j + i + 1;
			var ix2 = w * (j + 1) + i;
			for (var t = 0; t < 3; t++) {
				var v1 = data[ix * 4 + t] - data[ix1 * 4 + t];
				v1 = v1 * v1;
				var v2 = data[ix * 4 + t] - data[ix2 * 4 + t];
				v2 = v2 * v2;
				var v = parseInt(Math.sqrt(v1 + v2) + "") * 2;
				if (v > 255) v = 255;
				data[ix * 4 + t] = v;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__Relief", function (canvas) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < w - 1; i++) {
		for (var j = 0; j < h; j++) {
			var ix = w * j + i;
			var ix1 = w * j + i + 1;
			for (var t = 0; t < 3; t++) {
				var v = data[ix * 4 + t] - data[ix1 * 4 + t] + 128;
				if (v > 255) v = 255;
				if (v < 0) v = 0;
				data[ix * 4 + t] = v;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__Fog", function (canvas, radius) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < w - 1; i++) {
		for (var j = 0; j < h - 1; j++) {
			var k = parseInt(Math.random() * (46913)) - 23456;
			var di = i + k % radius;
			var dj = j + k % radius;
			if (di >= w) di = w - 1;
			if (dj >= h) dj = h - 1;
			if (di < 0) di = 0;
			if (dj < 0) dj = 0;
			var ix = w * j + i;
			var ix1 = w * dj + di;
			for (var t = 0; t < 3; t++) {
				data[ix * 4 + t] = data[ix1 * 4 + t];
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__Mosaic", function (canvas, m) {
	if (!canvas)
		return;
	if (!m || m < 2) m = 5;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	var tdata = [0, 0, 0, 1];
	for (var j = 0; j < h; j++) {
		for (var i = 0; i < w; i++) {
			var ix = w * j + i;
			if (j % m == 0) {
				if (i % m == 0) {
					for (var t = 0; t < 3; t++) {
						tdata[t] = data[ix * 4 + t];
					}
				}
				else {
					//for (var t = 0; t < 3; t++) {
						//data[ix * 4 + t] = tdata[t];
					//}
				}
			}
			else {
				var ix1 = w * (j - 1) + i;
				for (var t = 0; t < 3; t++) {
					data[ix * 4 + t] = data[ix1 * 4 + t];
				}
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

// grain : 0-2
define.method("__Bright", function (canvas, grain) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	var tdata = [0, 0, 0, 1];
	for (var j = 0; j < h; j++) {
		for (var i = 0; i < w; i++) {
			var ix = w * j + i;
			for (var t = 0; t < 3; t++) {
				data[ix * 4 + t] = data[ix * 4 + t] * grain;
				if (data[ix * 4 + t] < 0) data[ix * 4 + t] = 0;
				if (data[ix * 4 + t] > 255) data[ix * 4 + t] = 255;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

//degree [-100, 100]
define.method("__Contrast", function (canvas, degree) {
	if (!canvas)
		return;
	if (degree < -100) degree = -100;
	if (degree > 100) degree = 100;
	var contrast = (100 + degree) / 100;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	var tdata = [0, 0, 0, 1];
	for (var j = 0; j < h; j++) {
		for (var i = 0; i < w; i++) {
			var ix = w * j + i;
			for (var t = 0; t < 3; t++) {
				var v = ((data[ix * 4 + t] / 255 - 0.5) * contrast + 0.5) * 255;
				if (v < 0) v = 0;
				if (v > 255) v = 255;
				data[ix * 4 + t] = v;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__HSL", function (canvas, _hue, _s, _l) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < times; i++) {
		var hue = _hue, s = _s, l = _l;
		if (!hue) hue = 0;
		if (!s) s = 0;
		if (!l) l = 0;
		var rgb = { "r": data[i * 4], "g": data[i * 4 + 1], "b": data[i * 4 + 2] };
		var hsl = this.__RgbToHsl(rgb);
		hue += hsl.h * 360;
		s += hsl.s * 100;
		l += hsl.l * 100;
		if (hue > 360) hue = 360;
		if (hue < 0) hue = 0;
		if (s > 100) s = 100;
		if (s < 0) s = 0;
		if (l > 100) l = 100;
		if (l < 0) l = 0;
		hsl.h = hue / 360;
		hsl.s = s / 100;
		hsl.l = l / 100;
		rgb = this.__HslToRgb(hsl);
		data[i * 4] = rgb.r;
		data[i * 4 + 1] = rgb.g;
		data[i * 4 + 2] = rgb.b;
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

//Hue [0,360] Saturation [0,100] Lightness [0,100]
define.method("__RgbToHsl", function (rgb) {
	if (!rgb)
		return { "h": 0, "s": 0, "l": 0 };
	var r = rgb.r / 255;
	var g = rgb.g / 255;
	var b = rgb.b / 255;
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if (max == min)
		h = s = 0;
	else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return { "h": h, "s": s, "l": l };
});

define.method("__HslToRgb", function (hsl) {
	if (!hsl)
		return { "r": 0, "g": 0, "b": 0 };
	var h = hsl.h;
	var s = hsl.s;
	var l = hsl.l;
	var r, g, b;
	if (s == 0)
		r = g = b = l;
	else {
		var m2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var m1 = 2 * l - m2;
		r = this.__HueToRgb(m1, m2, h + 1 / 3);
		g = this.__HueToRgb(m1, m2, h);
		b = this.__HueToRgb(m1, m2, h - 1 / 3);
	}
	return { "r": r * 255, "g": g * 255, "b": b * 255 };
});

define.method("__HueToRgb", function (m1, m2, hue) {
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;
	if (hue * 6 < 1)
		return m1 + (m2 - m1) * 6 * hue;
	if (hue * 2 < 1)
		return m2;
	if (hue * 3 < 2)
		return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
	return m1;
});

define.method("__Blur", function (canvas, radius) {
	if (!canvas)
		return;
	var sr = Math.pow(radius, 2);
	var arr = [];
	for (var i = 0; i < sr; i++)
		arr[i] = 1 / sr;
	this.__Smooth(canvas, arr, false);
});

define.method("__RedEye", function (canvas) {
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var ix = w * j + i;
			var redinten = data[ix * 4] / ((data[ix * 4 + 1] + data[ix * 4 + 2]) / 2);
			if (redinten > 1.5) {//2.2 90?
				data[ix * 4] = (data[ix * 4 + 1] + data[ix * 4 + 2]) / 2;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__ColorBalance", function (canvas, rv, gv, bv, av) {
	if (!av) av = 0;
	if (rv > 255 || rv < -255 || gv > 255 || gv < -255 || bv > 255 || bv < -255 || av > 255 || av < -255) {
		return;
	}
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			var ix = w * j + i;
			data[ix * 4] += rv;
			data[ix * 4 + 1] += gv;
			data[ix * 4 + 2] += bv;
			data[ix * 4 + 3] += av;
			for (var t = 0; t < 4; t++) {
				if (data[ix * 4 + t] > 255) {
					data[ix * 4 + t] = 255;
					continue;
				}
				if (data[ix * 4 + t] < 0)
					data[ix * 4 + t] = 0;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});

define.method("__Pencil", function (canvas, sens) {
	if (!sens) sens = 25;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < w - 1; i++) {
		for (var j = 0; j < h; j++) {
			var ix = w * j + i;
			var ix1 = w * j + i + 1;
			var gray = data[ix * 4] * 0.3 + data[ix * 4 + 1] * 0.6 + data[ix * 4 + 2] * 0.1;
			var gray1 = data[ix1 * 4] * 0.3 + data[ix1 * 4 + 1] * 0.6 + data[ix1 * 4 + 2] * 0.1;
			var nv = (gray - gray1) > sens ? 0 : 255;
			for (var t = 0; t < 3; t++) {
				data[ix * 4 + t] = nv;
			}
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});
define.method("__ExchangeChannel", function (canvas, type) {
	if (!canvas)
		return;
	var ctx = canvas.getContext("2d");
	var w = canvas.width;
	var h = canvas.height;
	var imgdata = ctx.getImageData(0, 0, w, h);
	var data = imgdata.data;
	var times = w * h;
	for (var i = 0; i < times; i++) {
		switch (type) {
			case 1:
				var t = data[i * 4 + 1];
				data[i * 4 + 1] = data[i * 4];
				data[i * 4] = t;
				break;
			case 2:
				var t = data[i * 4 + 2];
				data[i * 4 + 2] = data[i * 4];
				data[i * 4] = t;
				break;
			case 3:
				var t = data[i * 4 + 2];
				data[i * 4 + 2] = data[i * 4 + 1];
				data[i * 4 + 1] = t;
				break;
			case 4:
				var t1 = data[i * 4 + 1];
				var t2 = data[i * 4 + 2];
				data[i * 4 + 2] = t1;
				data[i * 4 + 1] = data[i * 4];
				data[i * 4] = t2;
				break;
			case 5:
				var t1 = data[i * 4 + 1];
				var t2 = data[i * 4 + 2];
				data[i * 4 + 2] = data[i * 4];
				data[i * 4 + 1] = t2;
				data[i * 4] = t1;
				break;
			default:
				break;
		}
	}
	imgdata.data = data;
	ctx.putImageData(imgdata, 0, 0);
});