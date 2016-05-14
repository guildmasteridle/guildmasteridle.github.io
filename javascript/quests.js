/* Global variables */

var c_nbQuests = 0;
var maxQuests = 3;
var nbQuests = 0;
var listAcceptedQuests = [];
var listAvailableQuests = [];
var listQuests = [];

/* Constructors */

function Quest(options) {
  this.id = nbQuests;
  nbQuests++;
  this.type = options.type;
  this.details = options.details;
  this.number = options.number;
  this.name = options.name;
  this.available = options.available;
  this.active = 0;
  this.progress = 0;
  this.finished = false;
  this.rewardXP = options.XP;
  this.rewardMoney = options.money;
  this.areabegin = options.areabegin;
  this.areaend = options.areaend;
  this.unlockedP = options.unlockedP;
  this.textbegin = options.textbegin;
  this.textend = options.textend;
  this.unlockedQ = [];
  for(var i = 0; i < options.unlockedQ.length; i++) {
    this.unlockedQ.push(searchByName(listQuests,options.unlockedQ[i]));
  }
  options.unlockedQ;
}

/* JSON */

var listQuestsJSON ={
  "Troubles in Wheatcity2" : {"type" : "kill", "details" : "Wheatcity's mafia leader",  "number" : 1, "name" : "Troubles in Wheatcity2", "XP" : 1000, "areabegin" : "Wheatcity", "areaend" : "Wheatcity", "available" : 0, "unlockedP" : "none", "textbegin" : "Wait.. are you dumb ? You forget their chief ! Kill him !", "textend" : "Well, during your fight I have remarked that your sword is really bad, let me show you how to craft a new one.", "money" : 100, "unlockedQ" : []},
  "Troubles in Wheatcity" : {"type" : "kill", "details" : "Wheatcity's mafia sbire",  "number" : 10, "name" : "Troubles in Wheatcity", "XP" : 500, "areabegin" : "Wheatcity", "areaend" : "Wheatcity", "available" : 0, "unlockedP" : "none", "textbegin" : "Now you know how to make armors so you can at least be useful ! There are bad guys in the tavern and i'd like to drink something.. could you kill them for me please ?", "textend" : "Well played !", "money" : 100, "unlockedQ" : ["Troubles in Wheatcity2"]},
  "There's more of them?" : {"type" : "kill", "details" : "Rabbit", "number" : 20, "name" : "There's more of them?", "XP" : 100, "areabegin" : "Wheatcity", "areaend" : "Wheatcity", "available" : 0, "unlockedP" : "none", "textbegin" : "Hello again, adventurer!<br/><br/>We've got even more rabbits than before here. It almost looks like a sabotage...--<br/><br/>Haha, that's silly, everybody likes us here! Could you take care of that again for me, please?", "textend" : "Oh, thank you my friend but... I have bad news. Do you remember when I spoke to you about sabotage?", "money" : 0, "unlockedQ" : []},
  "A feast for a mayor" : {"type" : "kill", "details" : "Chicken", "number" : 5, "name" : "A feast for a mayor", "XP" : 100, "areabegin" : "Wheatcity", "areaend" : "Wheatcity", "available" : 0, "unlockedP" : "none", "textbegin" : "Hi, I'm Granny Knajo.<br/><br/>Would you mind catching some chickens for me with that sword of yours? I got an order from the mayor for tonight; I don't have time for this.<br/><br/>Take care, they're the strongest chickens around!", "textend" : "Oh, thank you for your help dear. You can keep your loot then, I'll just take the meat. Here, have a chicken.", "money" : 0, "unlockedQ" : []},
  "Sewing socks for winter" : {"type" : "collect", "details" : "Rabbit hide", "number" : 3, "name" : "Sewing socks for winter", "XP" : 100, "areabegin" : "Wheatcity", "areaend" : "Wheatcity", "available" : 0, "unlockedP" : "Tailoring", "textbegin" : "They announced a strong winter this year. With all these rabbits, we could make some socks and such.<br/><br/>Go bring me some rabbit hides.<br/><br/>...<br/><br/>What? Yeah, that's the first time seeing you too and so what? My nephew talked about you but he never mentioned you were this chatty.<br/><br/>Less talk, more hides, and I'll teach you how to make an armor.", "textend" : "Hah, once you don't talk, you're effective! Good. There, I'll show you.", "money" : 50, "unlockedQ" : ["Troubles in Wheatcity"]},
  "The cereal killers" : {"type" : "kill", "details" : "Rabbit", "number" : 2, "name" : "The cereal killers", "XP" : 100, "areabegin" : "Wheatcity", "areaend" : "Wheatcity", "available" : 1, "unlockedP" : "none", "textbegin" : "Hello there! Are you new here? I am John Knajo.<br/><br/>You are searching for a job? There's actually some rabbits annoying us in the corn fields. They're eating our crops and that's bad for business.<br/><br/>Kill some of them for me and I will gladly pay you for your help.", "textend" : "I knew I could count on you; there, take these few coppers and stay around. My family might find some jobs for you too.", "money" : 50, "unlockedQ" : ["There's more of them?", "A feast for a mayor", "Sewing socks for winter"]}
};


/* Init */
function initQuests() {
  console.log("Initialisation des quêtes..");
  listQuests = [];
  listAcceptedQuests = [];
  listAvailableQuests = [];
  
  for (var property in listQuestsJSON) {
    if (listQuestsJSON.hasOwnProperty(property)) {
      listQuests.push(new Quest(listQuestsJSON[property]));
    }
  }
  for (var i = 0; i < listQuests.length; i++) {
    var quest = listQuests[i];
    if(quest.available == 1) {
      listAvailableQuests.push(quest);
    }
  }
}

