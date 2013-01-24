# 7-segment display
- Useful web component
- Small library (7KB uncompressed)
- MIT license

Example
-------

```
var ssd = new SevenSegDisplay("display", {
	frame: true,
	frame_color: "#fff",
	segment_shadow: true,
	theme: "blue"
});
ssd.update("20:52");
```

Options
-------

* frame: true|false show frame
* frame_color: hex frame color
* segment_shadow: true|false show segment shadow if don't light up
* theme: "rainbow"|"red"|"green"|"orange"|"yellow"|"blue"|"indigo"|"violet" default is "plain"
* segment_thickness: set thickness for all segments
* background_color: hex set background color

![Seven-segment Display](https://raw.github.com/PuffyCoffee/Seven-segment-display/master/screenshot/ssd.png "Seven-segment display")

![Seven-segment Display](https://raw.github.com/PuffyCoffee/Seven-segment-display/master/screenshot/ssd2.png "Seven-segment display")

![Seven-segment Display](https://raw.github.com/PuffyCoffee/Seven-segment-display/master/screenshot/ssd3.png "Seven-segment display")

![Seven-segment Display](https://raw.github.com/PuffyCoffee/Seven-segment-display/master/screenshot/ssd4.png "Seven-segment display")

![Seven-segment Display](https://raw.github.com/PuffyCoffee/Seven-segment-display/master/screenshot/ssd5.png "Seven-segment display")