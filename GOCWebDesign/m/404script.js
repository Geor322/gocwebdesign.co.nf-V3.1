var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
console.log(width)
var navDisplayed = false;
var nav = document.getElementById("nav");

// function toggleNavPanel() {
// 	if(nav.style.left == "-600px") {
// 		nav.style.left = "0px"
// 		nav.style.opacity = .75;
// 	}
// 	else {
// 		nav.style.left = "-600px"
// 		nav.style.opacity = 0;
// 	}
// }

function toggleNavPanel() {
	nav = document.getElementById("nav");
	if(navDisplayed == false) {
		nav.style.left = "0px";
		nav.style.opacity = .75;
		navDisplayed = true;
	}

	else if(navDisplayed == true) {
		nav.style.opacity = 0;
		nav.style.left = "-600px";
		navDisplayed = false;
	}
}

function checkSize() {
	var width = window.innerWidth;
	nav = document.getElementById("nav");

	if(width > 600) {
		nav.style.opacity = 1;
	}

	if(width <= 350) {
		document.getElementById('footer').innerHTML = "Mobile -- -- Type 1"
	}
	else if((width > 350) && (width <= 600)) {
		document.getElementById('footer').innerHTML = "Mobile -- -- Type 2"
	}
	else if((width > 600) && (width <= 850)) {
		document.getElementById('footer').innerHTML = "Desktop -- -- Type 3"
	}
	else {
		document.getElementById('footer').innerHTML = "Desktop -- -- Type 4"
	}
}
setInterval(checkSize, 1000)