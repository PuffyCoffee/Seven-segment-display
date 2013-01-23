/** 
 * Seven-segment display
 * @author pzhang
 * 2012
 */

(function(global) {
	var SevenSegDisplay = function(id, num, option) {
		this.time = num;		
		var div = document.getElementById(id),
			width = parseFloat(global.getComputedStyle(div).width),
			height = parseFloat(window.getComputedStyle(div).height),
			num_length = num.length,
			d_width = width/num_length,
			d_height = height/2,
			digit_array = [];

		function getCoordinate() {
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

		function getCenter() {
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
			];
			// console.log(segmentSet[1].attr({
			// 	stroke: "#f00"
			// }));
			console.log(num);
			console.log(seg_display_array[num]);
			for (var i = 0; i < 7; i += 1) {
				if (seg_display_array[num][i]) {
					segmentSet[i].attr({
						stroke: "#f00"
					});
				}
			}
		}

		function displayDigit(paper) {
			var segments = paper.set(), i = 0, num_array = [];
			for (var o in getCoordinate()) {
				if (getCoordinate().hasOwnProperty(o)) {					
					var coord = getCoordinate()[o],
					seg = paper.path("M"+coord.x+","+coord.y+"L"+(coord.x+coord.w)+","+(coord.y+coord.h)).attr({
						'stroke-width': 1,
						stroke: "#eee"
					});
					segments.push(seg);
				}
				i += 1;
			}
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
						segments.attr({
							stroke: "#eee"
						});
						segments.transform("t"+idx*d_width+",0");
						lightUp(num_array[idx], segments);
					}
				}
			});
		}

		function displayColon(paper) {
			var colon = paper.set(), hasColon = false;
			topCircle = paper.circle(getCenter().topCir.x, getCenter().topCir.y, 2).attr({
				fill: "#f00",
				stroke: "#fff"
			});
			botCircle = paper.circle(getCenter().botCir.x, getCenter().botCir.y, 2).attr({
				fill: "#f00",
				stroke: "#fff"
			});
			colon.push(topCircle, botCircle);
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

		this.display = function() {
			var paper = Raphael(div, width, height);
			//paper.rect(0, 0, width, height);
			// for (var i = 0; i < num_length; i += 1) {
			// 	paper.path("M"+i*d_width+","+0+"L"+i*d_width+","+height).attr({
			// 		'stroke-width': .5
			// 	});
			// }

			displayDigit(paper);
			displayColon(paper);
		};
	}
	global.SevenSegDisplay = SevenSegDisplay;
} (window))