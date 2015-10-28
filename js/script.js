// Javascript Code.
$(document).ready(function() {
	$(".partHideTwo").hide(); //We hide the part we want
	$(".search_weather").click(function() {
		//First we obtain the country and the state and the kind of grades we want to show
		var country = $(".country").val();
		var state = $(".state").val();
		var modeTemp = $("input[name=typeWeather]:checked").val();
		//Verify if country and state camps aren't empty
		if (country != "" && state != "") {
			$.ajax({
				url : "http://api.wunderground.com/api/f7b861602853b78f/geolookup/conditions/q/" + country + "/" + state + ".json",
			  	dataType : "jsonp",
				success : function(parsed_json) {
					//We obtain the information we want
					var location = parsed_json['location']['city'];
					var temp_f = parsed_json['current_observation']['temp_f'];
					var temp_c = parsed_json['current_observation']['temp_c'];
					var weather = parsed_json['current_observation']['weather'];
					var icon = parsed_json["current_observation"]["icon_url"];
					var humidity = parsed_json["current_observation"]["relative_humidity"];
					var wind = parsed_json["current_observation"]["wind_kph"];
					var visibility = parsed_json['current_observation']['visibility_km'];
					var elevation = parsed_json['current_observation']['observation_location']['elevation'];
					var latitude = parsed_json['current_observation']['observation_location']['latitude'];
					var longitude = parsed_json['current_observation']['observation_location']['longitude'];
					$("#city").html(location);
					$("#weather").html(weather);
					$('#icon').append("<img src= \""+ icon +"\" alt =\"Image of weather\">");
					$("#humidity").html(humidity);
					$("#wind").html(wind + " Km/h");
					$("#visibility").html(visibility + " Km");
					$("#elevation").html(elevation);
					$("#latitude").html(latitude);
					$("#longitude").html(longitude);
					//Decide what kind of grades we want
					if (modeTemp === "fahrenheit") {
						$("#temp").html(temp_f + " °F");
					} else if (modeTemp === "celsius") {
						$("#temp").html(temp_c + " °C");
					};
				}
			});
			$(".partHideOne").hide(); //Hides the first part where ask the country and the state
			$(".partHideTwo").show(); //Shows the second part where shows the information of the weather
		} else {
			alert("Fill country and state");
		};
	});

	$(".btnNewSearch").click(function() {
		/*This is the button New Search*/
		document.getElementById("countryAndState").reset(); //Reset the camps country and state
		location.reload();
		$(".partHideOne").show(); //Shows the first part where ask the country and the state
		$(".partHideTwo").hide(); //Hides the second part where shows the information of the weather
	});
});