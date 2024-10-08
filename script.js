// Initialize particles.js with custom settings
particlesJS("particles-js", {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#00bcd4", 
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000",
            },
        },
        opacity: {
            value: 0.5,
            random: true,
        },
        size: {
            value: 3,
            random: true,
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00bcd4", 
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
        },
    },
    retina_detect: true,
});

// Virtual Assistant Code
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to trigger speech synthesis
function speak(text) {
    if ('speechSynthesis' in window) {
        const text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.volume = 1;
        text_speak.pitch = 1;
        window.speechSynthesis.speak(text_speak);
    } else {
        console.error("Speech Synthesis not supported");
    }
}

// Function to greet based on time of day
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Initialize the virtual assistant
window.addEventListener('load', () => {
    speak("Initializing DRAVIN...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    console.error("Speech Recognition not supported");
}

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Add a touch event listener for mobile devices
btn.addEventListener('touchstart', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Function to handle various commands based on speech input
function takeCommand(message) {
    if (message.includes('good morning')) {
        speak("Good Morning Sir, How may I assist you?");
    } else if (message.includes('good afternoon')) {
        speak("Good Afternoon Sir, How may I assist you?");
    } else if (message.includes('good evening')) {
        speak("Good Evening Sir, How may I assist you?");
    } else if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How may I assist you?");
    } else if (message.includes("what is your name") || message.includes("who are you") || message.includes("your name")) {
        speak("I'm DRAVIN");
    } else if (message.includes("tell me about yourself")) {
        speak("I'm DRAVIN, a virtual assistant. My boss is Mr.Bhanu Prasad Mudhiraj. I can recognize your voice and assist you from Google search results.");
    }
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
        speak("I found some information for " + message + " from Google.");
        speak("Thank you for choosing me.");
    }
}
