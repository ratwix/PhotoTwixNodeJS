 function hueSaturation(data, hue, saturation) {
	var angle = hue * 3.14159265;
	var s = Math.sin(angle), c = Math.cos(angle);
			
	for (var i = 0; i < data.length; i += 4) {	  
		var r = data[i] / 255.0;
		var g = data[i + 1] / 255.0;
		var b = data[i + 2] / 255.0;
		var average = (r + g + b) / 3.0;
		
		if (saturation > 0.0) {
			r += (average - r) * (1.0 - 1.0 / (1.001 - saturation));
			g += (average - g) * (1.0 - 1.0 / (1.001 - saturation));
			b += (average - b) * (1.0 - 1.0 / (1.001 - saturation));
		} else {
			r += (average - r) * (-saturation);
			g += (average - g) * (-saturation);
			b += (average - b) * (-saturation);
		}
		
		data[i] = Math.floor(r * 255);
		data[i + 1] = Math.floor(g * 255);
		data[i + 2] = Math.floor(b * 255);
	}
}

function sepia(data, amount) {
	for (var i = 0; i < data.length; i += 4) {	  
		var or = data[i] / 255.0;
		var og = data[i + 1] / 255.0;
		var ob = data[i + 2] / 255.0;
	
        var r = Math.min(1.0, (or * (1.0 - (0.607 * amount))) + (og * (0.769 * amount)) + (ob * (0.189 * amount)));
        var g = Math.min(1.0, (or * 0.349 * amount) + (og * (1.0 - (0.314 * amount))) + (ob * 0.168 * amount));
        var b = Math.min(1.0, (or * 0.272 * amount) + (og * 0.534 * amount) + (ob * (1.0 - (0.869 * amount))));
	  
		data[i] = Math.floor(r * 255);
		data[i + 1] = Math.floor(g * 255);
		data[i + 2] = Math.floor(b * 255);
   }
}

function brightnessContrast(data, brightness, contrast) {
	for (var i = 0; i < data.length; i += 4) {	  
		var r = data[i] / 255.0;
		var g = data[i + 1] / 255.0;
		var b = data[i + 2] / 255.0;
		
		r += brightness;
		g += brightness;
		b += brightness;
		
		if (contrast > 0.0) {
            r = (r - 0.5) / (1.0 - contrast) + 0.5;
			g = (g - 0.5) / (1.0 - contrast) + 0.5;
			b = (b - 0.5) / (1.0 - contrast) + 0.5;
        } else {
		    r = (r - 0.5) * (1.0 + contrast) + 0.5;
			g = (g - 0.5) * (1.0 + contrast) + 0.5;
			b = (b - 0.5) * (1.0 + contrast) + 0.5;
        }
		
		data[i] = Math.floor(r * 255);
		data[i + 1] = Math.floor(g * 255);
		data[i + 2] = Math.floor(b * 255);
   }
}