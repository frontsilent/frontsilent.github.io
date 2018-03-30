$('.review__items').slick({
	mobileFirst: true,
	slidesToShow: 1,
	speed: 300,
	cssEase: "ease-in",
	dots: true,
	arrows: false,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				dots: false,
				arrows: true
			}
    }
  ]

});
$('.tariffs__slider').slick({
	mobileFirst: true,
	slidesToShow: 1,
	speed: 300,
	cssEase: "ease-in",
	dots: true,
	arrows: false,
	initialSlide: 1,
	responsive: [
		{
			breakpoint: 700,
			settings: "unslick"
    }
  ]

});

function initMap() {
	var coords = {
		lat: 59.9391,
		lng: 30.3232
	};
	var markerUrl = "../img/contacts-marker.svg"
	var myMap = new google.maps.Map(document.querySelector(".map"), {
		zoom: 17,
		scrollwheel: false,
		center: coords
	});

	var markers = [
		{
			coordinates: {
				lat: 59.93895,
				lng: 30.32329
			},
			image: markerUrl,
			info: "ул. Большая Конюшенная,19/8"
		}
	]

	for (var i = 0; i < markers.length; i++) {
		addMarker(markers[i]);
	}

	function addMarker(properties) {
		var marker = new google.maps.Marker({
			position: properties.coordinates,
			map: myMap
		});
		if (properties.image) {
			marker.setIcon(properties.image);
		}
		if (properties.info) {
			var infoWindow = new google.maps.InfoWindow({
				content: properties.info
			})

			marker.addListener("click", function () {
				infoWindow.open(myMap, marker);
			})
			infoWindow.open(myMap, marker);
		}
	}
}