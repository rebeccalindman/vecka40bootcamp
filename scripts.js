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

// Toggle Chatbox
const chatbotButton = document.getElementById('chatbot-toggle');
const chatbox = document.getElementById('chatbox');
const chatboxClose = document.getElementById('chatbox-close');

chatbotButton.addEventListener('click', () => {
    chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'block' : 'none';
});

chatboxClose.addEventListener('click', () => {
    chatbox.style.display = 'none';
});

// Reference to chatbot input and chatbox content
const chatboxInput = document.querySelector('.chatbox-input');
const chatboxContent = document.querySelector('.chatbox-content');

// Function to send user message to the server
async function sendMessageToChatGPT(message) {
    try {
        console.log('Sending message to server:', message); // Check what message is being sent

        // Make the API call to your server
        const response = await fetch('http://localhost:3001/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        

        console.log('Response from server:', response); // Check if a response is received

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received from server:', data); // View the data received from server

        // Append AI's response to chatbox
        appendMessage('ChatGPT', data.content);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error', 'Unable to fetch a response. Please try again later.');
    }
}


// Function to append message to the chatbox content
function appendMessage(sender, message) {
    console.log(`${sender} message added to chatbox:`, message); // Log every message added to chatbox
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatboxContent.appendChild(messageElement);
    chatboxContent.scrollTop = chatboxContent.scrollHeight; // Auto-scroll to latest message
}


// Event Listener for User Input
chatboxInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatboxInput.value.trim()) {
        console.log('User pressed Enter. Message:', chatboxInput.value.trim()); // Debug the message input
        sendMessageToChatGPT(chatboxInput.value.trim());
        chatboxInput.value = ''; // Clear the input field
    }
});
