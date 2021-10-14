'use strict';

import flatpickr from "flatpickr/dist/flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from "notiflix";

const qs = (selector) => document.querySelector(selector);

const startDate = qs('#datetime-picker');
const startButton = qs('button[data-start]');
const timer = qs('.timer');
const days = qs('.field span[data-days]');
const hours = qs('.field span[data-hours]');
const minutes = qs('.field span[data-minutes]');
const seconds = qs('.field span[data-seconds');

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

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    locale: 'pl',

    onClose(selectedDates) {
        let selectedUtcDate = selectedDates[0].getTime();
        let date = new Date();
        let todayUtcDate = date.getTime();

        if (selectedUtcDate < todayUtcDate) {
            Notiflix.Notify.failure('Please choose a date in the future');
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
            const countdown = event => {
                event.preventDefault();
                const currentCounter = setInterval(() => {
                    let ms = selectedUtcDate - new Date().getTime();
                    console.log(ms);
                    startButton.disabled = true;
                    convertMs(ms);
                    console.log(convertMs(ms));

                    days.textContent = addLeadingZero(String(convertMs(ms).days));
                    hours.textContent = addLeadingZero(String(convertMs(ms).hours));
                    minutes.textContent = addLeadingZero(String(convertMs(ms).minutes));
                    seconds.textContent = addLeadingZero(String(convertMs(ms).seconds));

                    if (
                        convertMs(ms).days === 0 &&
                        convertMs(ms).hours === 0 &&
                        convertMs(ms).minutes === 0 &&
                        convertMs(ms).seconds === 0
                    ) {
                        console.log('Counter stop');
                        clearInterval(currentCounter);
                        timer.style.color = 'red';
                    }
                }, 1000);
            };

            startButton.addEventListener('click', countdown);
        }
    },
};

flatpickr(startDate, options);

function addLeadingZero(value) {
    if (value < 10) {
        return value.padStart(2, '0');
    } else {
        return value;
    }
}