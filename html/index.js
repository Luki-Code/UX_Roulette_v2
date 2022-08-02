
let spinSound;
let betSound;
let returnSound;
let doubleDownSound;
let placeYourBetsText;
let betsClosedText;
let betsClosed = true;
let algorithmLoseAmount = 0;
let jetonValues = new Array(7);
let notifications = true;
let red;
let black;
let oneToEighteen;
let nineteenToThirtysix
let even;
let odd;
let dozen;
let column;
let currencyText;
let luaRandomNumber;
let counter;
isOpened = false;
isReady = false;
let wasReady = false;


window.addEventListener('message', function (event) {
  var item = event.data;
  guthaben = item.guthaben;
  luaRandomNumber = item.randomNumber
  counter = item.counter;

  //ich habe verbuggte scheiße hier gemacht weil die sahcen also languages nie geladen worden sind und um abzufragen ob der counter null ist oder nicht, weil sonst fatale errors stehen. bitte um fix
  if (isOpened == true){
      if (!betsClosed){
      if (counter != null){

    document.getElementById("status").textContent = statusOpenText + counter + secondsLanguage;
      } else {
        document.getElementById("status").textContent = statusOpenText + " ..." + secondsLanguage;

        }
    } else {
      if (counter != null){

      document.getElementById("status").textContent = statusClosedText + counter + secondsLanguage;

      } else {
        document.getElementById("status").textContent = statusClosedText + " ..." + secondsLanguage;

      }
  }
}

  if (item.action == "startSpin") {
    spin();    // startSpin();
    console.log("Der Spin wurde gestartet");
  }

  if (item.action == 'setHTMLContent') {
    document.body.innerHTML = item.data;
  }
  if (item !== undefined && item.type === "ui") {
    if (item.display === true) {
      setTimeout(function(){
      isOpened = true;
    }, 1000);
      fetch("../settings/config.json").then(function(resp) {
        return resp.json();
      }).then(function(data) {
        returnToPlayerAmount = data.RTP;
        ResourceName = data.resourceName;
        normalColor = data.normalColor;
        gradient = data.gradient;
        normalColor = data.normalColor;
        gradientColors = data.gradientColors;
        gradientSpeed = data.gradientSpeed;
        tableContourColor = data.tableContourColor;
        UXNotify = data.UXNotify;
        CustomNotify = data.CustomNotify;
        CustomNotifyEventName = data.CustomNotifyEventName;
        notifyBorderColor = data.notifyBorderColor;
        notifyBackgroundColor = data.notifyBoxColor;
        notifyTextColor = data.notifyTextColor;
        notifyTitleColor = data.notifyTitleColor;
        Sounds = data.Sounds;
      
      
        if (gradient == true) {
          const purpleLines = Array.from(document.getElementsByClassName("purpleLine"));
      
          purpleLines.forEach(purpleLine => {
            purpleLine.style.background = "linear-gradient(to right, " + gradientColors + ")";
            purpleLine.style.animation = 'colored ' + gradientSpeed + 's linear infinite';
            purpleLine.style.backgroundSize = "200%";
          });
      
          document.getElementById("circle2").style.animation = 'animate ' + gradientSpeed + 's linear infinite';
          document.getElementById("circle3").style.animation = 'animate ' + gradientSpeed + 's linear infinite';
          document.getElementById("circle2").style.background = "linear-gradient(" + gradientColors + ")";
          document.getElementById("circle3").style.background = "linear-gradient(" + gradientColors + ")";
      
        } else {
          const purpleLines = Array.from(document.getElementsByClassName("purpleLine"));
      
          purpleLines.forEach(purpleLine => {
            purpleLine.style.background = normalColor;
          });
          document.getElementById("circle2").style.background = normalColor;
          document.getElementById("circle3").style.background = normalColor;
        }
        for(let i = 0; i < jetonValues.length; i++) {
          jetonValues[i] = data.jetonValues[i].value;
        }


          document.getElementById("topPanel").style.borderColor = tableContourColor;
          document.getElementById("logo").src = data.wheelLogo;
          document.getElementById("gamePanel").style.backgroundColor = data.backgroundColor;
          document.getElementById("gamePanel").style.borderColor = tableContourColor;
        spinSound = new Howl({
          src: data.sounds[0].path,
          html5: true
        });
      
        betSound = new Howl({
          src: data.sounds[1].path,
          html5: true
        });
      
        returnSound = new Howl({
          src: data.sounds[2].path,
          html5: true
        });

        doubleDownSound = new Howl({
          src: data.sounds[3].path,
          html5: true
        });
      
      });
      



      
      let notificationTexts = new Array(7);
      
      fetch("../settings/language.json").then(function(resp) {
        return resp.json();
      }).then(function(data) {
        document.getElementById("title").textContent = data.title;
        document.getElementById("readyText").textContent = data.notReady;
        
        document.getElementById("removeJetonsText").textContent = data.removeJetons;
        setTimeout(function(){
        document.getElementById("status").textContent = data.statusOpen + counter + data.secondsStatus;
        }, 2000);
        document.getElementById("statusText").textContent = data.statusText;
        document.getElementById("jetonText").textContent = data.jetonText;
        document.getElementById("totalBetText").innerHTML= data.totalBetText;
        document.getElementById("totalBetText").innerHTML= data.totalBetText;

        currencyText = data.currencyText;
        document.getElementById("totalBet").innerHTML = "0 <br>" + currencyText;
        statusOpenText = data.statusOpen;
        statusClosedText = data.statusClosed;
        balanceMissing = data.balanceMissing;
        bettedOn = data.bettedOn;
        jetonsCleared = data.jetonsCleared;
        doubleDownText = data.doubleDown;
        repeatBetsText = data.repeatBets;
        readyText = data.ready;
        notReadyText = data.notReady;
        startSpinText = data.startSpin;
        secondsLanguage = data.secondsStatus;
        notificationTitle = data.title;
        youWonText = data.youWonText;
        wereNotReady = data.wereNotReadyText;
        even = data.even;
        document.getElementById("even").textContent = data.even;
        red = data.red;
        document.getElementById("red").textContent = data.red;
        black = data.black;
        document.getElementById("black").textContent = data.black;
        odd = data.odd;
        document.getElementById("odd").textContent = data.odd;
        oneToEighteen = data.oneToEighteen;
        nineteenToThirtysix = data.nineteenToThirtysix;
        dozen = data.dozen;
        column = data.column;
        document.getElementById("doubleDown").textContent = data.doubleDownButton;
        document.getElementById("repeat").textContent = data.repeatBetsButton;
        betsClosed = false;


        if (!betsClosed){
          if (counter != null){
    
        document.getElementById("status").textContent = statusOpenText + counter + secondsLanguage;
          } else {
            document.getElementById("status").textContent = statusOpenText + " ..." + secondsLanguage;
    
            }
        } else {
          if (counter != null){
    
          document.getElementById("status").textContent = statusClosedText + counter + secondsLanguage;
    
          } else {
            document.getElementById("status").textContent = statusClosedText + " ..." + secondsLanguage;
    
          }
      }
      
      
  /*


  for(let i = 0; i < notificationTexts.length; i++) {

    notificationTexts[i] = new Array(4);
    console.log(data.nofitications[i].header);
    notificationTexts[i][0] = data.nofitications[i].header;
    nofitications[i][1] = data.nofitications[i].content;
    nofitications[i][2] = data.nofitications[i].headerColor;
    nofitications[i][3] = data.nofitications[i].contentColor;
  }
  */
});


$(".container").fadeIn();




document.onkeyup = function (data) {
  if (data.which == 27) {
    closeTable()
  }

}
    }
  }
});












const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

let moneyPlaced = 0;
let lastRoundMoneyPlaced = 0;
let lastRoundBets = new Map();
let lastRoundLastBets = [];
let currentChip;
let bets = new Map();




function repeatBets() {
  if (betsClosed == false) {

    if (lastRoundBets.size != 0 && guthaben > lastRoundMoneyPlaced) {
      moneyPlaced = lastRoundMoneyPlaced;

      var oldBets = new Map(bets);
      bets = new Map(lastRoundBets);
      lastBets = [].concat(lastRoundLastBets);
      for (var [key, value] of oldBets.entries()) {
        refreshButtonChip(key, 0);
      }
      for (var [key, value] of bets.entries()) {
        refreshButtonChip(key, value);
      }
      document.getElementById("totalBet").innerHTML = moneyPlaced +"<br>" + currencyText;
      if (UXNotify == true) {
        const notification = new Notification({


          text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + repeatBetsText +``,
        });
        const notifications = Array.from(document.getElementsByClassName("notification"));

        notifications.forEach(nuttifications => {
          nuttifications.style.borderColor = notifyBorderColor;
          nuttifications.style.backgroundColor = notifyBackgroundColor;
        });
      } else if (UXNotify == false && CustomNotify == true) {
        
        let notificationMessage = repeatBetsText
        $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))
      }

    } else if (guthaben < lastRoundMoneyPlaced) {
        let missingMoney = lastRoundMoneyPlaced - guthaben;
        //notification(notificationTexts[0][0],notificationTexts[0][1],notificationTexts[0][2],notificationTexts[0][3]);
        return;
    } else if (lastRoundBets.size == 0){
      //notification(notificationTexts[5][0],notificationTexts[5][1],notificationTexts[5][2],notificationTexts[5][3]);



    }

  } else {
    //notification(notificationTexts[6][0],notificationTexts[6][1],notificationTexts[6][2],notificationTexts[6][3]);
    return;
  }
}

function getTranslation(text) {
  switch(text) {
    case "rot":
      text = red;
      break;
    case "schwarz":
      text = black;
      break;
    case "gerade":
      text = even;
      break;
    case "ungerade":
      text = odd;
      break;
    case "einsbisachtzehn":
      text = oneToEighteen;
      break;
    case "neunzehnbissechsunddreizig":
      text = nineteenToThirtysix;
      break;
    case "erstesduzend":
      text = "1. " + dozen;
      break;
    case "zweitesduzend":
      text = "2. " + dozen;
      break;
    case "drittesduzend":
      text = "3. " + dozen;
      break;
    case "erstekolonne":
      text = "1. " + column;
      break;
    case "zweitekolonne":
      text = "1. " + column;
      break;
    case "drittekolonne":
      text = "1. " + column;
      break;
    default:

  }
  return text;
}


function closeTable(){

  if (betsClosed == true){ //needs new method while spinning cancel this (betsClosed) doesnt work anymore!
    return;

}
  if (betsClosed == false){ //needs new method while spinning cancel this (betsClosed) doesnt work anymore!
    setTimeout(function(){
    $.post('http://'+ResourceName+'/NUIOFF', JSON.stringify({}));
    $(".container").fadeOut();
    return;
  }, 500);

}

}


function doubleDown() {

  if (betsClosed == false) {

    if (bets.size != 0 && guthaben >= moneyPlaced * 2) {

      moneyPlaced *= 2;


      for (var [key, value] of bets.entries()) {
        bets.set(key, value * 2);
      }
      for (var [key, value] of bets.entries()) {
        refreshButtonChip(key, value);
      }

      if (UXNotify == true) {
        const notification = new Notification({


          text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + doubleDownText +``,
        });
        const notifications = Array.from(document.getElementsByClassName("notification"));

        notifications.forEach(nuttifications => {
          nuttifications.style.borderColor = notifyBorderColor;
          nuttifications.style.backgroundColor = notifyBackgroundColor;
        });
      } else if (UXNotify == false && CustomNotify == true) {
        
        let notificationMessage = doubleDownText
        $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))
      }


      if (Sounds == true){
      doubleDownSound.play();
      }
      lastBets.push("double");
      document.getElementById("totalBet").innerHTML = moneyPlaced +"<br>" + currencyText;

    } else {
      if (bets.size != 0) {

        let missingMoney = moneyPlaced * 2 - guthaben;

        //notification(notificationTexts[0][0],notificationTexts[0][1],notificationTexts[0][2],notificationTexts[0][3]);

        var luawert = moneyPlaced * 2;

        if (UXNotify == true) {


    const notification = new Notification({


      text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + balanceMissing + missingMoney +``,
    });
          const notifications = Array.from(document.getElementsByClassName("notification"));

          notifications.forEach(nuttifications => {
            nuttifications.style.borderColor = notifyBorderColor;
            nuttifications.style.backgroundColor = notifyBackgroundColor;
          });
        } else if (UXNotify == false && CustomNotify == true) {
          
          let notificationMessage = balanceMissing + missingMoney
          $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))
        }
      return;
      }
    }
  } else {
    //notification(notificationTexts[6][0],notificationTexts[6][1],notificationTexts[6][2],notificationTexts[6][3]);
    return;
  }
}


function grabChip(color) {
  let amount;
  switch(color) {
    case "blue":
      amount = jetonValues[0];
      break;
    case "green":
      amount = jetonValues[1];
      break;
    case "pink":
      amount = jetonValues[2];
      break;
    case "red":
      amount = jetonValues[3];
      break;
    case "yellow":
      amount = jetonValues[4];
      break;
    case "grey":
      amount = jetonValues[5];
      break;
    case "black":
      amount = jetonValues[6];
      break;
  }
  if (guthaben - moneyPlaced < amount) {
    if (betsClosed) {

      //notification(notificationTexts[6][0],notificationTexts[6][1],notificationTexts[6][2],notificationTexts[6][3]);
      return;
    }
    let missingMoney = amount - (guthaben - moneyPlaced);

    if (UXNotify == true) {
    const notification = new Notification({


      text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + balanceMissing + missingMoney +``,
    });
      const notifications = Array.from(document.getElementsByClassName("notification"));

      notifications.forEach(nuttifications => {
        nuttifications.style.borderColor = notifyBorderColor;
        nuttifications.style.backgroundColor = notifyBackgroundColor;
      });
    } else if (UXNotify == false && CustomNotify == true) {
        

        let notificationMessage = balanceMissing + missingMoney
        $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))
    }

    //notification(notificationTexts[0][0],notificationTexts[0][1],notificationTexts[0][2],notificationTexts[0][3]);



    return;

  }
  currentChip = amount;
  document.getElementById("selectedJeton").textContent = currentChip;

  var elems = document.querySelectorAll('button, img');

  for (var i = 0; i < elems.length; i++) {

    elems[i].style.cursor = "url(images/" + color + "Chip.png) 14 14, auto";

  }



}

let lastBets = [];

function setBet(field) {




  if (betsClosed || currentChip == undefined) {

    return;
  }
  if (guthaben - moneyPlaced < currentChip) {

    let missingMoney = currentChip - (guthaben - moneyPlaced);


    //notification(notificationTexts[0][0],notificationTexts[0][1],notificationTexts[0][2],notificationTexts[0][3]);
    return;
  }
  if (Sounds == true){
  betSound.play();
  }
  lastBets.push([field, currentChip]);
  var moneyToAdd = currentChip;
  if (bets.get(field) != null) {
    moneyToAdd += bets.get(field);
  }





  bets.set(field, moneyToAdd);
  let fieldTranslation = getTranslation(field);


  if (UXNotify == true) {
  const notification = new Notification({


    text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + moneyToAdd + bettedOn + fieldTranslation +``,
  });
    const notifications = Array.from(document.getElementsByClassName("notification"));

    notifications.forEach(nuttifications => {
      nuttifications.style.borderColor = notifyBorderColor;
      nuttifications.style.backgroundColor = notifyBackgroundColor;
    });
    } else if (UXNotify == false && CustomNotify == true) {
        
        let notificationMessage = moneyToAdd + bettedOn + fieldTranslation
        $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))

  }

  //$.post('http://'+ResourceName+'/SendBetNotify', JSON.stringify({ field, moneyToAdd }));
  //notification(notificationTexts[1][0],notificationTexts[1][1],notificationTexts[1][2],notificationTexts[1][3]);


  refreshButtonChip(field, moneyToAdd);




  moneyPlaced += currentChip;
  document.getElementById("totalBet").innerHTML = moneyPlaced +"<br>" + currencyText;
}


function refreshButtonChip(field, money) {
  var highestChip;
  let chips = Array.from(jetonValues);
  chips.reverse();
  for (var i = 0; i < chips.length; i++) {
    if (money - chips[i] >= 0) {
      highestChip = chips[i];

      break;


    }
  }


  let element = document.getElementById(field);
  let color;

  switch(jetonValues.indexOf(highestChip)) {
    case 0:
      color = "blue";
      break;
    case 1:
      color = "green";
      break;
    case 2:
      color = "pink";
      break;
    case 3:
      color = "red";
      break;
    case 4:
      color = "yellow";
      break;
    case 5:
      color = "grey";
      break;
    case 6:
      color = "black";
      break;
  }

  if (highestChip == undefined) {
    element.innerHTML = '';
  } else {
    element.innerHTML = '<img class="chipPlaced" src=images/' + color + 'Chip.png />';
  }


}



const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};



function makeReady () {
  

  console.log(isReady)

      console.log(isReady)
if (!isSpinning){
      if (isReady) {
        document.getElementById("readyText").textContent = notReadyText;
        isReady = false;
        document.getElementById("totalBet").style.color = "red";

        

        return;
      }
      if (!isReady) {
        document.getElementById("readyText").textContent = readyText;
        isReady = true;
        document.getElementById("totalBet").style.color = "green";

        return;
      }
    }
}


function spin() {
  if (betsClosed == true) {
    return;
  }

  var elems = document.querySelectorAll('button, img')

  for (var i = 0; i < elems.length; i++) {

    elems[i].style.cursor = "auto";

  }
  counter = 12;
  if (guthaben - moneyPlaced < 0) {
    return;
  }
  if (isReady == true){
  guthaben -= moneyPlaced;
  wasReady = true;
  betsClosed = true;

}

  if (UXNotify == true) {
    if (wasReady == true ){
    const notification = new Notification({

      text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + startSpinText +``,
    });
  } else {
    const notification = new Notification({

      text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + wereNotReady +``,
    });
  }
    const notifications = Array.from(document.getElementsByClassName("notification"));

    notifications.forEach(nuttifications => {
      nuttifications.style.borderColor = notifyBorderColor;
      nuttifications.style.backgroundColor = notifyBackgroundColor;
    });
  } else if (UXNotify == false && CustomNotify == true) {
    let notificationMessage = startSpinText
    $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))

  }

  $.post('http://'+ResourceName+'/RemoveMoneyFromBets', JSON.stringify({ moneyPlaced }));

  document.getElementById("status").textContent = statusClosedText + counter + secondsLanguage;
  document.getElementById("status").style.color = "red";
  if (Sounds == true){
  spinSound.play();
  }
  spinWheel();
}


const numbers = [34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25, 17, ].reverse()
const redNumbers = [3, 12, 7, 18, 9, 14, 1, 16, 5, 23, 30, 36, 27, 34, 25, 21, 19, 32];
const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 19, 29, 31, 33, 35];
let rotationAfterSpin = 0;


let numberScreenRefresher;

let isSpinning;
 
function spinWheel() {
  let wheel = document.getElementById("wheel");
  var randomNumber = luaRandomNumber
  var rotation = 0;
  console.log(randomNumber)
   isSpinning = true;
  let algorithmLoseAmount = (((returnToPlayerAmount / 100)*37)/36 -  1) * (-1);
  if (randomNumber < algorithmLoseAmount) {

    var losingNumbers = [];

    for (var i = 0; i < 37; i++) {
      if (calculateWins(i) == 0) {
        losingNumbers.push(randomNumber);
      }
    }
    if (losingNumbers.length == 0) {
      randomNumber = luaRandomNumber
      rotation = rotationAfterSpin + 2 * randomNumber * 360 + 1089;
    } else {
      var randomIndex = Math.floor(luaRandomNumber * losingNumbers.length);
      randomNumber = losingNumbers[randomIndex];
      rotation = rotationAfterSpin + ((numbers.indexOf(randomNumber) * 9.72972972972973) - (rotationAfterSpin % 360)) + 1089;

    }
  } else {

    randomNumber = luaRandomNumber;
    rotation = rotationAfterSpin + 2 * randomNumber * 360 + 1089;

  }

  rotationAfterSpin = rotation;
  wheel.setAttribute("style", 'transform: rotate(' + rotation + 'deg)');

   numberScreenRefresher = setInterval(function () {

    var numberScreen = document.getElementById("numberScreen");
    var number = getNumber();
    numberScreen.innerHTML = number;
    var color;
    if (number == 0) {
      color = "green";
    } else if (redNumbers.includes(number)) {
      color = "red";
    } else {
      color = "black";
    }

    document.getElementById("numberScreenPanel").style.backgroundColor = color;

  }, 33)


   spinTimeout = setTimeout(function () {




    setTimeout(function() {
      if (wasReady == true){

      addWins(); 
      }
      setTimeout(function() {
      if (wasReady == true){

      clearBets();
      }
      document.getElementById("status").textContent = statusOpenText + counter + secondsLanguage;
      document.getElementById("status").style.color = "green";
    }, 1000);
    }, 1000);
    var number = getNumber();
    var numberScreen = document.getElementById("numberScreen");
    numberScreen.innerHTML = number;
    var color;
    if (number == 0) {
      color = "green";
    } else if (redNumbers.includes(number)) {
      color = "red";
    } else {
      color = "black";
    }
  
    document.getElementById("numberScreenPanel").style.backgroundColor = color;
  
  }, 12000);
  setTimeout( function(){ isSpinning = false }, 15000)
}

lastBets = [];

function clearBetsButton() {
  if (betsClosed == false && moneyPlaced != 0) {
    if (UXNotify == true) {
      const notification = new Notification({


        text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + jetonsCleared +``,
      });
      const notifications = Array.from(document.getElementsByClassName("notification"));

      notifications.forEach(nuttifications => {
        nuttifications.style.borderColor = notifyBorderColor;
        nuttifications.style.backgroundColor = notifyBackgroundColor;
      });
    } else if (UXNotify == false && CustomNotify == true) {
      
      let notificationMessage = jetonsCleared
      $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))
    }

    clearBets();
    //notification(notificationTexts[4][0],notificationTexts[4][1],notificationTexts[4][2],notificationTexts[4][3]);

  }
}

function clearBets() {
  lastRoundMoneyPlaced = moneyPlaced;
  lastRoundBets = new Map(bets);
  lastRoundLastBets = [].concat(lastBets);
  bets.clear();
  lastBets = [];
  moneyPlaced = 0;
  document.getElementById("totalBet").innerHTML = moneyPlaced +"<br>" + currencyText;
  currentChip = undefined
  if(!betsClosed) {
    if (Sounds == true){
    returnSound.play();
    }
  }else {
    betsClosed = false;
  }
  const buttons = [].concat(document.getElementsByClassName("number"), document.getElementsByClassName("half"), document.getElementsByClassName("duzend"), document.getElementsByClassName("number0"));
  for (let i = 0; i < buttons.length; i++) {
    for(let k = 0; k < buttons[i].length; k++) {
      let el = buttons[i][k];
      el.innerHTML = "";
    }
  }

  var elems = document.querySelectorAll('button, img')

  for (var i = 0; i < elems.length; i++) {

    elems[i].style.cursor = "auto";

  }

  wasReady = false;

}

function returnChip() {
  if (lastBets.length != 0 && betsClosed == false) {
    if (lastBets[lastBets.length - 1] === "double") {
      moneyPlaced /= 2;
      for (var [key, value] of bets.entries()) {
        bets.set(key, value / 2);
      }
      for (var [key, value] of bets.entries()) {
        refreshButtonChip(key, value);
      }

    } else {
      var lastField = lastBets[lastBets.length - 1][0];
      var lastAmount = lastBets[lastBets.length - 1][1];
      moneyPlaced -= lastAmount;
      bets.set(lastField, bets.get(lastField) - lastAmount);
      refreshButtonChip(lastField, bets.get(lastField));
    }
    document.getElementById("totalBet").innerHTML = moneyPlaced +"<br>" + currencyText;
    //notification(notificationTexts[3][0],notificationTexts[3][1],notificationTexts[3][2],notificationTexts[3][3]);

    if (Sounds == true){
    returnSound.play();
    }
    lastBets.pop();
  }


}


function getNumber() {
  var rotation = getRotation(wheel);
  rotation -= 6.8109;
  if (rotation < 0) {
    rotation = 360 + rotation;
  }
  var index = Math.floor(rotation / 9.72972972972973);
  var number = numbers[index];
  return number;
}


function calculateWins(number) {
  var totalWin = 0;
  if (bets.has(number.toString())) {
    totalWin += bets.get(number.toString()) * 36;
  }
  if (number != 0) {
    if (bets.has("rot") && redNumbers.includes(number)) {
      totalWin += bets.get("rot") * 2;
    } else if (bets.has("schwarz") && blackNumbers.includes(number)) {
      totalWin += bets.get("schwarz") * 2;
    }
    if (bets.has("einsbisachtzehn") && number <= 18) {
      totalWin += bets.get("einsbisachtzehn") * 2;
    } else if (bets.has("neunzehnbissechsunddreizig") && number >= 19) {
      totalWin += bets.get("neunzehnbissechsunddreizig") * 2;
    }
    if (bets.has("gerade") && number % 2 == 0) {
      totalWin += bets.get("gerade") * 2;
    } else if (bets.has("ungerade") && number % 2 == 1) {
      totalWin += bets.get("ungerade") * 2;
    }
    if (bets.has("erstesduzend") && number <= 12) {
      totalWin += bets.get("erstesduzend") * 3;
    } else if (bets.has("zweitesduzend") && number >= 13 && number <= 24) {
      totalWin += bets.get("zweitesduzend") * 3;
    } else if (bets.has("drittesduzend") && number >= 25) {
      totalWin += bets.get("drittesduzend") * 3;
    }
    if (bets.has("erstekolonne") && number % 3 == 0) {
      totalWin += bets.get("erstekolonne") * 3;
    } else if (bets.has("zweitekolonne") && number % 3 == 2) {
      totalWin += bets.get("zweitekolonne") * 3;
    } else if (bets.has("drittekolonne") && number % 3 == 1) {
      totalWin += bets.get("drittekolonne") * 3;
    }
  }
  return totalWin;
}

function addWins() {
  var number = getNumber();
  var win = calculateWins(number);


  var numberScreen = document.getElementById("numberScreen");
  numberScreen.innerHTML = number;
  var color;
  if (number == 0) {
    color = "green";
  } else if (redNumbers.includes(number)) {
    color = "red";
  } else {
    color = "black";
  }

  document.getElementById("numberScreenPanel").style.backgroundColor = color;



  if(win > 0 && wasReady == true) {


    if (UXNotify == true) {
      const notification = new Notification({
  
  
        text: `<center style="font-size: larger"><b style="color: ` + notifyTitleColor + `">` + notificationTitle + `</center></b><br> <b style="font-size: medium"><center style="color:` + notifyTextColor + `;">` + youWonText + win +``,
      });
        const notifications = Array.from(document.getElementsByClassName("notification"));
  
        notifications.forEach(nuttifications => {
          nuttifications.style.borderColor = notifyBorderColor;
          nuttifications.style.backgroundColor = notifyBackgroundColor;
        });
      } else if (UXNotify == false && CustomNotify == true) {
  
          let notificationMessage = youWonText + win
          $.post('http://'+ResourceName+'/CustomNotifyEvent', JSON.stringify({notificationTitle, notificationMessage}))
      }
    $.post('http://'+ResourceName+'/AddMoneyFromWin', JSON.stringify({win}))
    //notification(notificationTexts[2][0],notificationTexts[2][1],notificationTexts[2][2],notificationTexts[2][3]);
  }
  clearInterval(numberScreenRefresher)

  var numberScreen = document.getElementById("numberScreen");
  numberScreen.innerHTML = number;
  var color;
  if (number == 0) {
    color = "green";
  } else if (redNumbers.includes(number)) {
    color = "red";
  } else {
    color = "black";
  }

  document.getElementById("numberScreenPanel").style.backgroundColor = color;
}



function getRotation(el) {


  //needs statement to ask if the player has opened it, if the player has not opened it or nui is hidden cancel this! otherwise there is error: https://prnt.sc/WDGSeKDWvhAG
  var style = window.getComputedStyle(el, null);
  var transform = style.getPropertyValue("transform");

  

  var values = transform.split('(')[1];
  values = values.split(')')[0];
  values = values.split(',');
  var a = values[0];
  var b = values[1];

  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
  
  
}

