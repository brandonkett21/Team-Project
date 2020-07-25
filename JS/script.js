// // initialize sidenav using js
// const sideNav = document.querySelector(".sidenav");
// // using materialize js library
// M.Sidenav.init(sideNav, {});

// initialize navbar using jquery
$(document).ready(function(){
    $('.sidenav').sidenav();
});


// initalize slider using js
const slider = document.querySelector(".slider");
M.Slider.init(slider,{
    // little dots below slider
    indicators: false,
    height: 500,
    // speed of transition
    // transition: 500,
    // 6 seconds
    // interval: 6000,
});

// // initalize slider using jquery
// $(document).ready(function(){
//     $('.slider').slider();
// });



// initialize autocomplete
var ac = document.querySelector(".autocomplete");
M.Autocomplete.init(ac, {
    // add autocomplete data here for example
    data: {
        "Aruba":null,
        "Cancun":null,
    }
});

let API = "1bb4961b1e82421db6b174ff95e35d71";