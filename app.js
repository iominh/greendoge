var options = {
	words: [
		"wow",
		"such green",
		"much good",
		"plz more",
		"much cool",
		"teh amazing",
		"so mystery",
		"way best",
		"many doge",
		"few energies"
	],
	colors: [
		"#FFB347",
		"#FF6961",
		"#DEA5A4",
		"#CFCFC4",
		"#AEC6CF",
		"#966FD6",
		"#779ECB",
		"#C23B22",
		"#836953",
		"#03C03C",
		"#77DD77",
		"#B19CD9",
		"#CB99C9",
		"#F49AC2",
		"#00ffff"				
	],
	dogeSayingLength: 1500 //much speed
};  
function makeDoge(id){
	var word = options.words[Math.abs(id % options.colors.length)];
	var color = options.colors[Math.floor(Math.random() * options.colors.length)];
	var x = Math.max(0, Math.floor($("body").width() * Math.random()) - 100);
	var y = Math.max(0, Math.floor($("body").height() * Math.random()) - 100);
	$("body").append("<div id='doge-"+id+"' class='doge'></div>");
	$("#doge-"+id).css("color", color)
		.css("font-family", "'Comic Sans MS', cursive, sans-serif")
		.css("display", "none")
		.css("font-size", "30px")
		.css("position", "absolute")
		.css("top", y)
		.css("left", x)
		.css("z-index", "100")
		.text(word)
		.fadeIn(options.dogeSayingLength, function(){
			$("#doge-"+id).fadeOut(options.dogeSayingLength, function(){
				$("#doge-"+id).remove();
			});
		});
}

function positionTrack() {
	var $img = $("#map-img");
	var $track = $("#track");

	var height = $img.height();

	var top = (.44 * height) + "px";
	$track.css("top", top);

	var left = ($img.offset().left + 30) + "px";
	$track.css("left", left);

	var width = $img.width() * .83;
	$track.width(width);
};

function positionCars() {
	var $track = $("#track");
	// console.log($track.offset());
	var $cars = $(".car");

	var width = $track.width();
	var left = $track.offset().left;
	var top = $track.offset().top;

	$cars.css("top", (top - 40) + "px");

	$cars.each(function (car) {
		var $car = $($cars[car]);
		if($car.attr("id") === "car-template") {
			return;
		}
		$car.css("left", ((left - 20) + (width * $car.attr("percentComplete")) + "px"));
		$car.show();
	});

}

function addCar(carId, colorClass, image) {
	var $carTemplate = $("#car-template");
	var $car = $carTemplate.clone();
	var $img = $car.find("img");
	$img.attr("src", image);
	$car.attr("id", "car-" + carId);
	$car.attr("percentComplete", .0);
	$car.addClass(colorClass);
	var $bigMap = $("#big").find(".map");
	$bigMap.append($car);
}

function moveCar(id, percent) {
	var $car = $("#car-" + id);
	$car.attr("percentComplete", percent);
	positionCars();
}

$(document).ready(function() {
	var x = 0;
	var foo = function () {
		makeDoge(++x);
	}
	foo();
	setInterval(foo, options.dogeSayingLength * 2);


	addCar(1, "red", "vespa.svg");
	addCar(2, "blue", "leaf.svg");
	

	positionTrack();
	positionCars();
	$(window).resize(function () {
		positionTrack();
		positionCars();
	});



	var car1 = 1;
	var car2 = 1;
	setInterval(function () {
		moveCar(1, car1 / 100);
		moveCar(2, car2 / 100);
		car1 = car1 + 1;
		car2 = car2 + 1.5;

		if(car1 > 100) { car1 = 100; }
		if(car2 > 100) { car2 = 100; }
	}, 100);
});