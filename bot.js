class MyBot {
    constructor(botName,triggerNumber,botVoice) {
        this.messages = [], //array that hold the record of each string in chat
        this.lastUserMessage = "", //keeps track of the most recent input string from the user
        this.botMessage = "", //var keeps track of what the chatbot is going to say
        this.botName = botName, //name of the chatbot
        this.triggerNumber = triggerNumber, //number defining command
        this.botVoice = botVoice, //text-to-speech voice of the bot
        this.userName = 'UserName', //name of the user
        this.talking = true; //when false the speach function doesn't work
        this.app = document.querySelector("#app");
        this.run();
        this.today = new Date();
        this.time = this.today.getHours() + ":" + this.today.getMinutes();
    }

    render() {
        document.getElementById("bot1").innerHTML = this.botName;
        if (sessionStorage.getItem("autosave")) {
            // Last Message Restoration
            sessionStorage.value = sessionStorage.getItem("autosave");
            document.getElementById("chatlog" + "1").innerHTML = sessionStorage.value
        }
        document.addEventListener("keypress", (e) => {
            this.keyPress();
        })
    }

    async chatbotResponse() {
        this.talking = true;
        this.botMessage = "I didn't understand this.";
        if (this.lastUserMessage =='hello') {
            const hi = ['hi','howdy','hello']
            this.botMessage = hi[Math.floor(Math.random()*(hi.length))];;
        }
        if (this.lastUserMessage === 'name') {
            this.botMessage = 'My name is ' + this.botName;
        }
        if (this.lastUserMessage === 'chuck' && this.triggerNumber === 1) {
            async function myFetch() {
                const response = await fetch('https://api.chucknorris.io/jokes/random')
                const url = await response.json();
                return url.value;
            }
            const awaitFunction = async () => {
                const result = await myFetch()
                return result
            }
            (async () => {
                this.botMessage = await awaitFunction()
                return this.botMessage
            })()
            this.botMessage = await awaitFunction()
            console.log(this.botMessage)
        }
        if (this.lastUserMessage === 'kenuu' && this.triggerNumber === 2) {
            async function myFetch() {
                const response = await fetch('https://api.kanye.rest/')
                const url = await response.json();
                return url.quote;
            }
            const awaitFunction = async () => {
                const result = await myFetch()
                return result
            }
            (async () => {
                this.botMessage = await awaitFunction()
                return this.botMessage
            })()
            this.botMessage = await awaitFunction()
            console.log(this.botMessage)
        }
        if (this.lastUserMessage === 'catfact') {
            async function myFetch() {
                const response = await fetch('https://cat-fact.herokuapp.com/facts/random')
                const url = await response.json();
                return url.text;
            }
            const awaitFunction = async () => {
                const result = await myFetch()
                return result
            }
            (async () => {
                this.botMessage = await awaitFunction()
                return this.botMessage
            })()
            this.botMessage = await awaitFunction()
            console.log(this.botMessage)
        }
        if (this.lastUserMessage === 'help') {
            this.botMessage = 'Commands List : hello, name, chuck, kenuu';
        }
    }

    //text to Speech
    Speech(say) {
        if ('speechSynthesis' in window && this.talking) {
            var utterance = new SpeechSynthesisUtterance(say);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }
    }

    //runs the keypress() function when a key is pressed
    keyPress(e) {
        var x = e || window.event;
        var key = (x.keyCode || x.which);
        if (key == 13 || key == 3) {
            this.newEntry();
        }
        if (key == 38) {
            console.log('hi')
        }
    }

    //this runs each time enter is pressed.
    async newEntry() {
        
        //if the message from the user isn't empty then run 
        if (document.getElementById("chatbox").value != "") {
            console.log(this.botName)
            this.lastUserMessage = document.getElementById("chatbox").value;
            document.getElementById("chatbox").value = "";
            this.messages.push(this.lastUserMessage + " <b>: " + this.userName + "</b> " + this.time);
            await this.chatbotResponse();
            //add the chatbot's name and message to the array messages
            this.messages.push(this.time + " <b>" + this.botName + " :</b> " + this.botMessage);
            this.Speech(this.botMessage);
            for (var i = 1; i < 10; i++) {
                if (this.messages[this.messages.length - i]){
                    document.getElementById("chatlog" + i).innerHTML = this.messages[this.messages.length - i];
                    sessionStorage.setItem("autosave", this.time + " " + this.botName + " : " + this.botMessage);
                }
            }
        }
    }

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

const botV1 = new MyBot("ChuckJokeBot",1,'en-US');
const botV2 = new MyBot("KenuuBot",2,'en-US');
const botV3 = new MyBot("CatFactBot",3,'en-US');
