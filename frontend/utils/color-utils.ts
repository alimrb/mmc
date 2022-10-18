const Gradient = {
	inputA : '',
	inputB : '',
	inputC : '',
	gradientElement : '',
	
	// Convert a hex color to an RGB array e.g. [r,g,b]
	// Accepts the following formats: FFF, FFFFFF, #FFF, #FFFFFF
	hexToRgb : function(hex: string){
		var r, g, b, parts;
	    // Remove the hash if given
	    hex = hex.replace('#', '');
	    // If invalid code given return white
	    if(hex.length !== 3 && hex.length !== 6){
	        return [255,255,255];
	    }
	    // Double up charaters if only three suplied
	    if(hex.length == 3){
	        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	    }
	    // Convert to [r,g,b] array
	    r = parseInt(hex.substr(0, 2), 16);
	    g = parseInt(hex.substr(2, 2), 16);
	    b = parseInt(hex.substr(4, 2), 16);

	    return [r,g,b];
	},
	
	// Converts an RGB color array e.g. [255,255,255] into a hexidecimal color value e.g. 'FFFFFF'
	rgbToHex : function(color: { toString: (arg0: number) => any; }[]){
		// Set boundries of upper 255 and lower 0
		color[0] = (color[0] > 255) ? 255 : (color[0] < 0) ? 0 : color[0];
		color[1] = (color[1] > 255) ? 255 : (color[1] < 0) ? 0 : color[1];
		color[2] = (color[2] > 255) ? 255 : (color[2] < 0) ? 0 : color[2];
		
		return this.zeroFill(color[0].toString(16), 2) + this.zeroFill(color[1].toString(16), 2) + this.zeroFill(color[2].toString(16), 2);
	},
	
	// Pads a number with specified number of leading zeroes
	zeroFill : function( number: string, width: number ){
		width -= number.toString().length;
		if ( width > 0 ){
	  		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		}
		return number;
	},

	// Generates an array of color values in sequence from 'colorA' to 'colorB' using the specified number of steps
	generate : function(colorA: string, colorB: string, steps: number){
		var result = [], rInterval, gInterval, bInterval;
		
		const colorARGB = this.hexToRgb(colorA); // [r,g,b]
		const colorBRGB = this.hexToRgb(colorB); // [r,g,b]
		steps -= 1; // Reduce the steps by one because we're including the first item manually
		
		// Calculate the intervals for each color
		const rStep = ( Math.max(colorARGB[0], colorBRGB[0]) - Math.min(colorARGB[0], colorBRGB[0]) ) / steps;
		const gStep = ( Math.max(colorARGB[1], colorBRGB[1]) - Math.min(colorARGB[1], colorBRGB[1]) ) / steps;
		const bStep = ( Math.max(colorARGB[2], colorBRGB[2]) - Math.min(colorARGB[2], colorBRGB[2]) ) / steps;
	
		result.push( '#'+this.rgbToHex(colorARGB) );
		
		// Set the starting value as the first color value
		var rVal = colorARGB[0],
			gVal = colorARGB[1],
			bVal = colorARGB[2];
	
		// Loop over the steps-1 because we're includeing the last value manually to ensure it's accurate
		for (var i = 0; i < (steps-1); i++) {
			// If the first value is lower than the last - increment up otherwise increment down
			rVal = (colorARGB[0] < colorBRGB[0]) ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
			gVal = (colorARGB[1] < colorBRGB[1]) ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
			bVal = (colorARGB[2] < colorBRGB[2]) ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
			result.push( '#'+this.rgbToHex([rVal, gVal, bVal]) );
		};
		
		result.push( '#'+this.rgbToHex(colorBRGB) );
		
		return result;
	},
}

export function generateGradient(colorA:string, colorB: string, steps: number) {
    return Gradient.generate(colorA, colorB, steps);
}