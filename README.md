# 7-segment display
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
ssd.update("12:00");
```

Options
-------

* frame: true|false show frame
* frame_color: hex frame color
* segment_shadow: true|false show segment shadow if don't light up
* theme: "rainbow"|"red"|"green"|"orange"|"yellow"|"blue"|"indigo"|"violet" default is "plain"

![Seven-segment Display](https://raw.github.com/PuffyCoffee/Seven-segment-display/master/screenshot/ssd.png "Seven-segment display")
