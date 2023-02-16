// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
  requestAnimFrame(animate);
  var currentTime = new Date().getTime();
  if (mLastFrameTime === 0) {
    mLastFrameTime = currentTime;
  }

  if (currentTime - mLastFrameTime > mWaitTime) {
    swapPhoto();
    mLastFrameTime = currentTime;
  }
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
  //Add code here to access the #slideShow element.
  //Access the img element and replace its source
  //with a new image from your images array which is loaded
  //from the JSON string

  //console.log('swap photo');

  //next button
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0;
    /*$('#nextPhoto').click(function(){
			makeGalleryImageOnloadCallback(galleryImage)
		});*/
  }

  //previous button
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1;
    //have minus one because it counts zero as a position so there is an extra number
  }

  document.getElementById("photo").src = mImages[mCurrentIndex].img;

  //location
  var loc = document.getElementsByClassName("location");
  loc[0].innerHTML = "Location: " + mImages[mCurrentIndex].location;

  //description
  var des = document.getElementsByClassName("description");
  des[0].innerHTML = "Description: " + mImages[mCurrentIndex].description;

  //date
  var dt = document.getElementsByClassName("date");
  dt[0].innerHTML = "Date: " + mImages[mCurrentIndex].date;

  mLastFrameTime = 0;
  mCurrentIndex += 1;
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = "extra.json";

// Part 2: Slideshow 1 and 2
//construction - building JSON file
// function to pull information from the JSON file
function fetchJSON() {
  mRequest.onreadystatechange = function () {
    console.log("on ready state change");
    if (this.readyState == 4 && this.status == 200) {
      mJson = JSON.parse(mRequest.responseText);
      //iterateJSON(mJson);
      iterateJSON(mJson);
    }
  };
  mRequest.open("GET", mUrl, true);
  mRequest.send();
}

// when the index changes this will help us move through each variable in the JSON file
// building a new object
function iterateJSON(mJson) {
  for (x = 0; x < mJson.images.length; x++) {
    mImages[x] = new GalleryImage();
    mImages[x].location = mJson.images[x].imgLocation;
    mImages[x].description = mJson.images[x].description;
    mImages[x].date = mJson.images[x].date;
    mImages[x].img = mJson.images[x].imgPath;
  }
}

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
  return function (e) {
    galleryImage.img = e.target;
    mImages.push(galleryImage);
  };
}

$(document).ready(function () {
  fetchJSON();
  // This initially hides the photos' metadata information
  //$('.details').eq(0).hide();
  $("#nextPhoto").position({
    my: "right center",
    at: "right",
    of: "#nav",
  });

  if (mUrl == null){
    mUrl = "images.json";
  }
});


 

window.addEventListener(
  "load",
  function () {
    console.log("window loaded");
	// go to the next photo
 	$("#nextPhoto").click(function(){
		swapPhoto();
 	});
 	// go to the previous photo
 	$("#prevPhoto").click(function () {
		mCurrentIndex -= 2;
   		swapPhoto();
 	});
  },
  false
);

//setting all the variables to eventually pull the data from the JSON list
//assigning data from JSON list to variable that will be used in our slideshow
function GalleryImage() {
  //implement me as an object to hold the following data about an image:
  //1. location where photo was taken
  let location;
  //2. description of photo
  let description;
  //3. the date when the photo was taken
  let date;
  //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  let img;
}

function showDetails() {
  if ($(".moreIndicator").hasClass("rot90")) {
    $(".moreIndicator").removeClass("rot90").addClass("rot270");
  } else {
    $(".moreIndicator").removeClass("rot270").addClass("rot90");
  }

  $(".details").slideToggle("slow", "linear");
}
