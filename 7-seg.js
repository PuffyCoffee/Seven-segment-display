/** 
 * Seven-segment display
 * @author pzhang
 * 2012
 */

(function(global) {
	var SevenSegDisplay = function(id, option) {
		var div = document.getElementById(id),
			width = parseFloat(global.getComputedStyle(div).width),
			height = parseFloat(window.getComputedStyle(div).height),
			//num_length = num.length,
			//d_width = width/num_length,
			d_height = height/2,
			digit_array = [], shape_set = [],
			paper = Raphael(div, width, height),
			shadow = (typeof option.segment_shadow !== "undefined" && 
				option.segment_shadow),
			theme = (typeof option.theme !== "undefined") ? option.theme :
				"plain",
			thickness = (typeof option.segment_thickness !== "undefined") ?
				option.segment_thickness : 1,
			background_color = (typeof option.background_color !== "undefined") ?
				option.background_color : "#ffffff";

		document.getElementById(id).style.backgroundColor = background_color;

		function getCoordinate(d_width) {
			var o = {A: {x: 0, y: 0, w: 0, h: 0},B: {x: 0, y: 0, w: 0, h: 0},
					 C: {x: 0, y: 0, w: 0, h: 0},D: {x: 0, y: 0, w: 0, h: 0},
					 E: {x: 0, y: 0, w: 0, h: 0},F: {x: 0, y: 0, w: 0, h: 0},
					 G: {x: 0, y: 0, w: 0, h: 0}
				};
			o.A.x = .1*d_width;	o.A.y = .2*d_height; o.A.w = .8*d_width; o.A.h = 0;
			o.B.x = .9*d_width; o.B.y = .3*d_height; o.B.w = 0; o.B.h = .6*d_height;
			o.C.x = .9*d_width; o.C.y = d_height + .1*d_height; o.C.w = 0; o.C.h = .6*d_height;
			o.D.x = .1*d_width; o.D.y = d_height + .8*d_height; o.D.w = .8*d_width; o.D.h = 0;
			o.E.x = .1*d_width; o.E.y = d_height + .1*d_height; o.E.w = 0; o.E.h = .6*d_height;
			o.F.x = .1*d_width; o.F.y = .3*d_height; o.F.w = 0; o.F.h = .6*d_height; 
			o.G.x = .1*d_width; o.G.y = d_height; o.G.w = .8*d_width; o.G.h = 0;
			return o;
		}

		function getCenter(d_width) {
			return {
				topCir: {
					x: d_width/2,
					y: d_height/2
				},
				botCir: {
					x: d_width/2,
					y: d_height + d_height/2
				}
			}
		}

		function lightUp(num, segmentSet) {
			var seg_display_array = [
				[1, 1, 1, 1, 1, 1, 0],
				[0, 1, 1, 0, 0, 0, 0],
				[1, 1, 0, 1, 1, 0, 1],
				[1, 1, 1, 1, 0, 0, 1],
				[0, 1, 1, 0, 0, 1, 1],
				[1, 0, 1, 1, 0, 1, 1],
				[1, 0, 1, 1, 1, 1, 1],
				[1, 1, 1, 0, 0, 0, 0],
				[1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 0, 1, 1]
			],	
			theme_rainbow = [
				"#ff0000",
				"#ff7f00",
				"#ffff00",
				"#00ff00",
				"#0000ff",
				"#4b0082",
				"#8f00ff"
			];
			
			for (var i = 0; i < 7; i += 1) {
				if (seg_display_array[num][i]) {
					switch (theme) {
						case "rainbow":
							segmentSet[i].attr({
								stroke: theme_rainbow[i],
								'stroke-width': thickness
							});
							break;
						case "red":
							segmentSet[i].attr({
								stroke: "#ff0000",
								'stroke-width': thickness
							});
							break;
						case "green":
							segmentSet[i].attr({
								stroke: "#00ff00",
								'stroke-width': thickness
							});
							break;
						case "orange":
							segmentSet[i].attr({
								stroke: "#ff7f00",
								'stroke-width': thickness
							});
							break;
						case "yellow":
							segmentSet[i].attr({
								stroke: "#ffff00",
								'stroke-width': thickness
							});
							break;
						case "blue":
							segmentSet[i].attr({
								stroke: "#0000ff",
								'stroke-width': thickness
							});
							break;
						case "indigo":
							segmentSet[i].attr({
								stroke: "#4b0082",
								'stroke-width': thickness
							});
							break;
						case "violet":
							segmentSet[i].attr({
								stroke: "#8f00ff",
								'stroke-width': thickness
							});
							break;
						default:
							segmentSet[i].attr({
								stroke: "#000000",
								'stroke-width': thickness
							});
					}
				}
			}
		}

		function displayDigit(num, paper) {
			var segments = paper.set(), i = 0, num_array = [],
				d_width = width/num.length;
			for (var o in getCoordinate(d_width)) {
				if (getCoordinate(d_width).hasOwnProperty(o)) {					
					var coord = getCoordinate(d_width)[o],
					seg = paper.path("M"+coord.x+","+coord.y+"L"+(coord.x+coord.w)+","+(coord.y+coord.h));
					segments.push(seg);
				}
				i += 1;
			}
			(shadow) ? segments.attr({
				'stroke-width': thickness,
				stroke : (typeof option.background_color == "undefined") ? 
							"#eee" : 
							option.background_color
			}) : segments.attr({
				stroke : background_color
			});
			shape_set[0] = segments;
			digit_array = num.split('');
			num_array = num.split('');
			lightUp(parseInt(digit_array[0]), segments);
			digit_array.forEach(function(item, idx) {
				digit_array[idx] = parseInt(item);
				if (isNaN(digit_array[idx])) {
					digit_array[idx] = false;					
				} else {
					digit_array[idx] = true;
					if (idx !== 0) {
						segments.clone();
						(shadow) ? segments.attr({
							'stroke-width': thickness,
							stroke : (typeof option.background_color == "undefined") ? 
										"#eee" : 
										option.background_color
						}) : segments.attr({
							stroke : background_color
						});
						segments.transform("t"+idx*d_width+",0");
						lightUp(num_array[idx], segments);
						shape_set[idx] = segments;
					}
				}
			});
		}

		function displayColon(paper, d_width) {
			var colon = paper.set(), hasColon = false,
			theme_rainbow = [
				"#ff0000",
				"#ff7f00",
				"#ffff00",
				"#00ff00",
				"#0000ff",
				"#4b0082",
				"#8f00ff"
			];
			topCircle = paper.circle(getCenter(d_width).topCir.x, getCenter(d_width).topCir.y, 2);
			botCircle = paper.circle(getCenter(d_width).botCir.x, getCenter(d_width).botCir.y, 2);
			colon.push(topCircle, botCircle);
			switch (theme) {
				case "rainbow":
					colon.attr({
						fill: theme_rainbow[0],
						stroke: "#ffffff"
					});
					break;
				case "red":
					colon.attr({
						fill: "#ff0000",
						stroke: "#ffffff"
					});
					break;
				case "green":
					colon.attr({
						fill: "#00ff00",
						stroke: "#ffffff"
					});
					break;
				case "orange":
					colon.attr({
						fill: "#ff7f00",
						stroke: "#ffffff"
					});
					break;
				case "yellow":
					colon.attr({
						fill: "#ffff00",
						stroke: "#ffffff"
					});
					break;
				case "blue":
					colon.attr({
						fill: "#0000ff",
						stroke: "#ffffff"
					});
					break;
				case "indigo":
					colon.attr({
						fill: "#4b0082",
						stroke: "#ffffff"
					});
					break;
				case "violet":
					colon.attr({
						fill: "#8f00ff",
						stroke: "#ffffff"
					});
					break;
				default:
					colon.attr({
						fill: "#000000",
						stroke: "#ffffff"
					});
			}
			for (var i = 0; i < digit_array.length; i += 1) {
				if (!digit_array[i]) {
					colon.transform("t"+i*d_width+",0");
					hasColon = true;
				}
			}
			if (!hasColon) {
				colon.remove();
			}
		}
		
		this.update = function(num) {
			if (typeof num == "number") {
				num = num + "";
			}
			paper.clear();
			if (typeof option.frame !== "undefined" && option.frame) {
				var frameColor = "#eee", d_width = width/num.length;
				if ( typeof option.frame_color !== "undefined") {
					frameColor = option.frame_color;
				}
				paper.rect(0, 0, width, height).attr({
					stroke: frameColor
				});
				for (var i = 0; i < num.length; i += 1) {
					paper.path("M"+i*d_width+","+0+"L"+i*d_width+","+height).attr({
						'stroke-width': .5,
						stroke: frameColor
					});
				}
			}
			
			displayDigit(num, paper);
			displayColon(paper, d_width);
		};
	}
	global.SevenSegDisplay = SevenSegDisplay;
} (window))