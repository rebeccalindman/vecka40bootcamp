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

// Simple cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    alert(product + ' has been added to your cart.');
    console.log('Cart:', cart);
}

// JavaScript for nav-bar
const hamburger = document.querySelector('.hamburger');
const dropdownMenu = document.querySelector('.dropdown-menu');

hamburger.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});
