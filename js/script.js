// Javascript Code.
$(document).ready(function() {
	$(".partHideTwo").hide();
	$(".search_weather").click(function() {
		var country = $(".country").val();
		var state = $(".state").val();
		var modeTemp = $("input[name=typeWeather]:checked").val();
		if (country != "" && state != "") {
			$.ajax({
				url : "http://api.wunderground.com/api/f7b861602853b78f/geolookup/conditions/q/" + country + "/" + state + ".json",
			  	dataType : "jsonp",
				success : function(parsed_json) {
					var location = parsed_json['location']['city'];
					var temp_f = parsed_json['current_observation']['temp_f'];
					var temp_c = parsed_json['current_observation']['temp_c'];
					var weather = parsed_json['current_observation']['weather'];
					var humidity = parsed_json["current_observation"]["relative_humidity"];
					var wind = parsed_json["current_observation"]["wind_kph"];
					var visibility = parsed_json['current_observation']['visibility_km'];
					var elevation = parsed_json['current_observation']['observation_location']['elevation'];
					var latitude = parsed_json['current_observation']['observation_location']['latitude'];
					var longitude = parsed_json['current_observation']['observation_location']['longitude'];
					$("#city").html(location);
					$("#weather").html(weather);
					$("#humidity").html(humidity);
					$("#wind").html(wind + " Km/h");
					$("#visibility").html(visibility + " Km");
					$("#elevation").html(elevation);
					$("#latitude").html(latitude);
					$("#longitude").html(longitude);
					if (modeTemp === "fahrenheit") {
						$("#temp").html(temp_f + " °F");
					} else if (modeTemp === "celsius") {
						$("#temp").html(temp_c + " °C");
					};
				}
			});
			$(".partHideOne").hide();
			$(".partHideTwo").show();
		} else {
			alert("Fill country and state");
		};
	});
	$(".btnNewSearch").click(function() {
		$(".partHideOne").show();
		$(".partHideTwo").hide();
	});
});