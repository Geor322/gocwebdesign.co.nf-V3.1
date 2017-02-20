var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
console.log(width)

function toggleNavPanel() {
	var nav = document.getElementById("nav");
	if(nav.style.left == "-600px") {
		nav.style.left = "0px"
		nav.style.opacity = .75;
	}
	else {
		nav.style.left = "-600px"
		nav.style.opacity = 0;
	}
}

function checkSize() {
	var nav = document.getElementById("nav");
	var width = window.innerWidth;

	if(width > 600) {
		nav.style.opacity = 1;
	};

	if(width <= 350) {
		document.getElementById('footer').innerHTML = "Mobile -- -- Type 1";
		window.location.href = "/m/games/";
	}
	else if((width > 350) && (width <= 600)) {
		document.getElementById('footer').innerHTML = "Mobile -- -- Type 2";
		window.location.href = "/m/games/";
	}
	else if((width > 600) && (width <= 850)) {
		document.getElementById('footer').innerHTML = "Desktop -- -- Type 3";
	}
	else {
		document.getElementById('footer').innerHTML = "Desktop -- -- Type 4";
	};
};
setInterval(checkSize, 1000);

//http://stackoverflow.com/a/26607063
(function(window, location) {
	history.replaceState(null, document.title, location.pathname+"#!/stealingyourhistory");
	history.pushState(null, document.title, location.pathname);

	window.addEventListener("popstate", function() {
			if(location.hash === "#!/stealingyourhistory") {
    		history.replaceState(null, document.title, location.pathname);
    		setTimeout(function(){
      			location.replace("/");
    		},0);
			}
	}, false);
}(window, location));