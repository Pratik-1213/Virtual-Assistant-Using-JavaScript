// Function to make JARVIS speak text
function speak(text) {
  var text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;
  window.speechSynthesis.speak(text_speak);
}

// Function to wish user based on time of day
function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evening Sir...");
  }
}

// Call this function immediately when the page loads
function initializeJARVIS() {
  speak("Initializing JARVIS...");
}

// Trigger JARVIS on page load
window.addEventListener("load", function () {
  initializeJARVIS();
});

// Speech recognition setup
var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  var recognition = new SpeechRecognition();

  // Event when speech is recognized
  recognition.onresult = function (event) {
    var currentIndex = event.resultIndex;
    var transcript = event.results[currentIndex][0].transcript;
    document.querySelector(".content").textContent = transcript;
    takeCommand(transcript.toLowerCase());
  };

  // Error handling in speech recognition
  recognition.onerror = function (event) {
    console.error("Speech recognition error detected: " + event.error);
    speak("Sorry, I didn't catch that. Could you please repeat?");
  };

  // Click event for starting speech recognition
  document.querySelector(".talk").addEventListener("click", function () {
    document.querySelector(".content").textContent = "Listening...";
    recognition.start();
  });
} else {
  speak("Sorry, your browser does not support speech recognition.");
  console.error("Speech recognition not supported by this browser.");
}

// Adding the function to capture and process the typed command
document
  .querySelector("#submitCommand")
  .addEventListener("click", function () {
    var typedCommand = document
      .querySelector("#typedCommand")
      .value.toLowerCase();
    document.querySelector(".content").textContent = typedCommand;
    takeCommand(typedCommand);
  });

// Function to handle recognized commands
function takeCommand(message) {
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello! How can I assist you today?");
  } else if (message.includes("how are you")) {
    speak("I don't have emotions, but thank you for asking!");
  } else if (message.includes("open google")) {
    window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening YouTube...");
  } else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (message.includes("open twitter")) {
    window.open("https://twitter.com", "_blank");
    speak("Opening Twitter...");
  } else if (message.includes("time")) {
    var time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak("The current time is " + time);
  } else if (message.includes("date")) {
    var date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    speak("Today's date is " + date);
  } else if (message.includes("wish me")) {
    wishMe();
  } else if (message.includes("who are you")) {
    speak(
      "I am Jarvis, your virtual assistant, designed to assist you with various tasks."
    );
  } else if (message.includes("your name")) {
    speak("My name is Jarvis!");
  } else if (message.includes("creator")) {
    speak("I was created by Pratik S. Kumbhar!");
  } else if (message.includes("who is pratik")) {
    speak(
      "Pratik is my creator! A talented individual with expertise in AI and coding!"
    );
  } else if (message.includes("who is mayuri")) {
    speak(
      "Mayuri A talented individual with expertise in AI and coding!"
    );
  } else if (message.includes("how old are you")) {
    speak("Age is just a number! I’m timeless.");
  } else if (message.startsWith("search for")) {
    var query = message.replace("search for", "").trim();
    if (query !== "") {
      var searchUrl =
        "https://www.google.com/search?q=" + query.replace(/ /g, "+");
      window.open(searchUrl, "_blank");
      speak("Searching for: " + query);
    } else {
      speak("Please specify what to search for.");
    }
  } else if (message.includes("what is ai")) {
    speak(
      "Artificial Intelligence is the simulation of human intelligence in machines that are programmed to think and learn."
    );
  } else {
    speak("Sorry, I am not sure how to respond to that.");
  }
}