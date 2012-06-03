//remember that jQuery was set to var $jQ = jQuery.noConflict();
//at the very end of the jquery-1.6.2.min.js file 
//

    function geolocate_story(position) {
	var geo_lat = position.coords.latitude;
	var geo_long = position.coords.longitude;
	// Get weather information
	$jQ.ajax({
	    type: 'GET',
            url: 'http://ws.geonames.org/findNearByWeatherXML?lat=' + geo_lat + '&lng=' + geo_long,
            dataType: 'xml',
            success: function (weather_resp, xmlstatus) {
		var temperature_celsius = $jQ(weather_resp).find("temperature").text();
		if (temperature_celsius != "") {
		    // Weather temp data given in Celsius; convert to Fahrenheit, because I'm American
		    var temperature_fahrenheit = 9/5*temperature_celsius + 32;
		    $jQ('#weather_temp').text(temperature_fahrenheit);
		} else {
		    $jQ('#weather_temp').text("TEMP NOT FOUND");
		}
            },
            error: function (xhr, status, error) {
		alert(error);
		$jQ('#weather_temp').text("TEMP NOT FOUND");
            }
	})
	// Get full location information
	$jQ.ajax({
	    type: 'GET',
            url: 'http://ws.geonames.org/extendedFindNearby?lat=' + geo_lat + '&lng=' + geo_long,
            dataType: 'xml',
            success: function (loc_resp, xmlstatus) {
		var city_name = $jQ(loc_resp).find("placename").text();
		if (city_name != "") {
		    $jQ('#city').text(city_name);
		} else {
		    $jQ('#city').text("CITY NOT FOUND");
		}
		var street_address = $jQ(loc_resp).find("streetNumber").text() + " " + $jQ(loc_resp).find("street").text();
		if (street_address != "") {
		    $jQ('#street_address').text(street_address);
		} else {
		    $jQ('#street_address').text("ADDRESS NOT FOUND");
		}
            },
            error: function (xhr, status, error) {
		alert(error);
		$jQ('#city').text("CITY NOT FOUND");
		$jQ('#street_address').text("ADDRESS NOT FOUND");
            }
	})

    }
