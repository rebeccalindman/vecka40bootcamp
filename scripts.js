// JavaScript for the slider loop
let currentIndex = 0;
const slider = document.querySelector('.slider');
const sliderItems = document.querySelectorAll('.slider-item');
const totalItems = sliderItems.length;

// Function to move to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems; // Loop back to the start
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Set interval to change slides every 3 seconds
setInterval(nextSlide, 3000);
