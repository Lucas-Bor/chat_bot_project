class MyBot {
    constructor(botName) {
        this.messages = [], //array that hold the record of each string in chat
        this.lastUserMessage = "", //keeps track of the most recent input string from the user
        this.botMessage = "", //var keeps track of what the chatbot is going to say
        this.botName = botName, //name of the chatbot
        this.userName = 'Userbot', //name of the chatbot
        this.talking = true; //when false the speach function doesn't work
        this.app = document.querySelector("#app");
        this.run();
    }

    render() {
        
        document.addEventListener("keypress", (e) => {
            this.keyPress();
        })
    }

    //edit this function to change what the chatbot says
    chatbotResponse() {
        this.talking = true;
        this.botMessage = "I'm confused"; //the default message

        if (this.lastUserMessage === 'hi' || this.lastUserMessage =='hello') {
            const hi = ['hi','howdy','hello']
            this.botMessage = hi[Math.floor(Math.random()*(hi.length))];;
        }

        if (this.lastUserMessage === 'name') {
            this.botMessage = 'My name is ' + this.botName;
        }
    }

    //text to Speech
    //https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
    Speech(say) {
    if ('speechSynthesis' in window && this.talking) {
        var utterance = new SpeechSynthesisUtterance(say);
        //msg.voice = voices[10]; // Note: some voices don't support altering params
        //msg.voiceURI = 'native';
        //utterance.volume = 1; // 0 to 1
        //utterance.rate = 0.1; // 0.1 to 10
        //utterance.pitch = 1; //0 to 2
        //utterance.text = 'Hello World';
        //utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
    }

    //runs the keypress() function when a key is pressed
    //if the key pressed is 'enter' runs the function newEntry()
    keyPress(e) {
        var x = e || window.event;
        var key = (x.keyCode || x.which);
        if (key == 13 || key == 3) {
            //runs this function when enter is pressed
            this.newEntry();
        }
        if (key == 38) {
            console.log('hi')
            //document.getElementById("chatbox").value = lastUserMessage;
        }
    }

    //this runs each time enter is pressed.
    //It controls the overall input and output
    newEntry() {
        //if the message from the user isn't empty then run 
        console.log("hello")
        if (document.getElementById("chatbox").value != "") {
            console.log("there")
            //pulls the value from the chatbox ands sets it to lastUserMessage
            this.lastUserMessage = document.getElementById("chatbox").value;
            //sets the chat box to be clear
            document.getElementById("chatbox").value = "";
            //adds the value of the chatbox to the array messages
            this.messages.push("<b>" + this.userName + ":</b> " + this.lastUserMessage);
            //Speech(lastUserMessage);  //says what the user typed outloud
            //sets the variable botMessage in response to lastUserMessage
            this.chatbotResponse();
            //add the chatbot's name and message to the array messages
            this.messages.push("<b>" + this.botName + ":</b> " + this.botMessage);
            // says the message using the text to speech function written below
            this.Speech(this.botMessage);
            //outputs the last few array elements of messages to html
            for (var i = 1; i < 8; i++) {
            if (this.messages[this.messages.length - i])
                document.getElementById("chatlog" + i).innerHTML = this.messages[this.messages.length - i];
            }
        }
    }

    //clears the placeholder text ion the chatbox
    //this function is set to run when the users brings focus to the chatbox, by clicking on it
    placeHolder() {
    document.getElementById("chatbox").placeholder = "";
    }

    run() {
        this.render();
   }
}

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    }

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    } 

const botV1 = new MyBot("Pierre");
const botV2 = new MyBot("John");
const botV3 = new MyBot("Jello");