class Bot {
    constructor(botName, commandNumber, botVoice) {
        this.botName = botName,
        this.commandNumber = commandNumber,
        this.botVoice = botVoice
    }
}

class ChatBot {
    constructor() {
        this.messages = [], //array that hold the record of each string in chat
        this.lastUserMessage = "", //keeps track of the most recent input string from the user
        this.botMessage = "", //var keeps track of what the chatbot is going to say
        this.userName = 'UserName', //name of the user
        this.talking = true; //when false the speach function doesn't work
        this.app = document.querySelector("#app");
        this.today = new Date();
        this.time = this.today.getHours() + ":" + this.today.getMinutes();
        this.botList = {
            botV1: new Bot(
                'ChuckBot',
                1,
                
            ),
            botV2: new Bot(
                'KenuuBot',
                2,
            ),
            botV3: new Bot(
                'CatFactBot',
                3,
            )
        };
        this.run();
    }

    render() {
        for (let i in this.botList) {
            document.getElementById(i).innerHTML = this.botList[i].botName;
        }
        if (sessionStorage.getItem("autosave")) {
            //last Message Restoration
            sessionStorage.value = sessionStorage.getItem("autosave");
            document.getElementById("chatlog" + "1").innerHTML = sessionStorage.value
        }
        document.addEventListener("keypress", (e) => {
            this.keyPress();
        })
        document.getElementById("button-addon2").addEventListener("click", (e) => {
            this.buttonPress();
        })
    }

    async chatbotResponse() {
        this.botName = this.botList.botV1.botName;
        this.talking = true;
        this.botMessage = "I didn't understand this.";
        if (this.lastUserMessage.includes("hello")) {
            for (let i in this.botList) {
                if (this.lastUserMessage.includes(this.botList[i].botName)){
                    const hi = ['hi','howdy',"hello I'm " + this.botList[i].botName]
                    this.botMessage = hi[Math.floor(Math.random()*(hi.length))];;
                    this.botName = this.botList[i].botName;
                }
            }
        }
        if (this.lastUserMessage.includes("name")) {
            for (let i in this.botList) {
                if (this.lastUserMessage.includes(this.botList[i].botName)){
                    this.botMessage = 'My name is ' + this.botList[i].botName;
                    this.botName = this.botList[i].botName;
                }
            }
        }
        if (this.lastUserMessage === 'chuck') {
            async function myFetch() {
                const response = await fetch('https://api.chucknorris.io/jokes/random')
                const url = await response.json();
                return url.value;
            }
            const awaitFunction = async () => {
                const result = await myFetch()
                return result
            }
            this.botMessage = await awaitFunction()
            this.botName = this.botList.botV1.botName;
        }
        if (this.lastUserMessage === 'kenuu') {
            async function myFetch() {
                const response = await fetch('https://api.kanye.rest/')
                const url = await response.json();
                return url.quote;
            }
            const awaitFunction = async () => {
                const result = await myFetch()
                return result
            }
            this.botMessage = await awaitFunction()
            this.botName = this.botList.botV2.botName;
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
            this.botMessage = await awaitFunction()
            this.botName = this.botList.botV3.botName;
        }
        if (this.lastUserMessage === 'help') {
            this.botMessage = 'Commands List : hello, name, chuck, kenuu';
            this.botName = this.botList.botV1.botName;
        }
    }

    //text to Speech
    Speech(say) {
        if ('speechSynthesis' in window && this.talking) {
            var utterance = new SpeechSynthesisUtterance(say);
            utterance.lang = 'en-IN';
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

    buttonPress(e) {
        this.newEntry();
    }

    //this runs each time enter is pressed.
    async newEntry() {
        
        //if the message from the user isn't empty then run 
        if (document.getElementById("chatbox").value != "") {
            this.lastUserMessage = document.getElementById("chatbox").value;
            document.getElementById("chatbox").value = "";
            this.messages.push(this.lastUserMessage + " <b>: " + this.userName + "</b> [" + this.time + "]");
            await this.chatbotResponse();
            //add the chatbot's name and message to the array messages
            this.messages.push("[" +this.time + "] <b>" + this.botName + " :</b> " + this.botMessage);
            this.Speech(this.botMessage);
            for (var i = 1; i < 10; i++) {
                if (this.messages[this.messages.length - i]){
                    document.getElementById("chatlog" + i).innerHTML = this.messages[this.messages.length - i];
                    sessionStorage.setItem("autosave", "[" + this.time + "] <b>" + this.botName + " :</b> " + this.botMessage);
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

const chatbot = new ChatBot();