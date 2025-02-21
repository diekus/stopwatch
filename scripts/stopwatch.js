const statMsg = document.getElementById('statusMessage');
const btnReqNot = document.getElementById('btnReqNot');
const btnStart = document.getElementById('btnStart');
const numMinutes = document.getElementById('numMinutes');
const lblTimer = document.getElementById('lblTimer');
const selNotifyEvery = document.getElementById('selNotifyEvery');

/* if theres not permissions for notifications, request it */

const notificationsEnabled = () => {
  statMsg.innerText = '✔️ notifications enabled';
  btnReqNot.style.display = 'none';
};

const notificationsDisabled = () => {
  statMsg.innerText = '❌notifications disabled';
  btnReqNot.style.display = 'block';
};

const reqPerm = () => {
  if(!('Notification' in window)) {
    console.log('this browser does not support notifications.');
    return;
  }
  
  Notification.requestPermission().then((permission) => {
    permission === 'granted' ? notificationsEnabled() : notificationsDisabled();
    console.log(`the current notification permission is ${permission}`);
  });
};

btnReqNot.addEventListener('click', reqPerm);


/* Will trigger the before unload event */

const beforeUnloadHandler = (event) => {
  event.preventDefault();
  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

window.addEventListener("beforeunload", beforeUnloadHandler);

const init = () => {
  //checks for notificatin permissions
  switch(Notification.permission) {
    case 'default':
    case 'denied':
      notificationsDisabled();
      break;
    case 'granted':
      notificationsEnabled();
      break;
  }
};

init();

const timer = () => {
  var sec = 30;
  var timer = setInterval(function(){
      document.getElementById('safeTimerDisplay').innerHTML='00:'+sec;
      sec--;
      if (sec < 0) {
          clearInterval(timer);
      }
  }, 1000);
}

/* timer functionality */

let isRunning = false;
let interval;
let minutes;
let seconds = 59;
let totalRunningMillis = 0;

function updateTimer() {
  lblTimer.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

/* sends a notification */
const timerNotify = (milisecs) => {
  let notifyEvery = parseInt(selNotifyEvery.options[selNotifyEvery.selectedIndex].value);
  if(milisecs % notifyEvery == 0){
    const img = `../images/${notifyEvery/1000}.png`;
    const text = `${milisecs/1000} seconds have passed`;
    const notification = new Notification("stoPWAtch", { body: text, icon: img });
  }
};

// Start/Stop button functionality
btnStart.addEventListener("click", function () {
  if (!isRunning) {
      isRunning = true;
      btnStart.value = "Stop";
      minutes = numMinutes.value - 1;

      interval = setInterval(() => {
          if (seconds > 0 || minutes > 0) {
              seconds--;
              if (seconds === 0 && minutes > 0) {
                  seconds = 59;
                  minutes--;
              }
              updateTimer();
              totalRunningMillis += 1000;
              timerNotify(totalRunningMillis);
          } else {
              clearInterval(interval);
              isRunning = false;
              btnStart.value = "Start";
          }
      }, 1000);
  } else {
      clearInterval(interval);
      isRunning = false;
      btnStart.value = "Start";
  }
});