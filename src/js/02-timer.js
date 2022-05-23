import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      finishTime = selectedDates[0].getTime();
      
      if (getRestOfTime()) {
          startBtnRef.removeAttribute('disabled');
      } else {
        startBtnRef.setAttribute('disabled', "");
        Notiflix.Notify.warning('Please choose a date in the future');
      }
  },
};

let timerID, deltaTime, startTime, finishTime;

const   startBtnRef = document.querySelector('button[data-start]'),
        daysLabelRef = document.querySelector('span[data-days]'),
        hoursLabelRef = document.querySelector('span[data-hours]'),
        minutesLabelRef = document.querySelector('span[data-minutes]'),
        secondsLabelRef = document.querySelector('span[data-seconds]');

flatpickr('#datetime-picker', options);

startBtnRef.setAttribute('disabled', "");

function startCountdown() {
  timerID = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (deltaTime = getRestOfTime()) {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysLabelRef.textContent = addLeadingZero(days);
    hoursLabelRef.textContent = addLeadingZero(hours),
    minutesLabelRef.textContent = addLeadingZero(minutes),
    secondsLabelRef.textContent = addLeadingZero(seconds);
  } else {
    clearInterval(timerID);
  }
}

function getRestOfTime() {
  return (finishTime > Date.now()) ? finishTime - Date.now() : 0;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

startBtnRef.addEventListener('click', startCountdown);

