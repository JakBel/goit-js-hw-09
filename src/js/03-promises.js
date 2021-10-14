'use strict';

import Notiflix from "notiflix";

const qs = (selector) => document.querySelector(selector);
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}

function startPromises({ delay, step, amount }) {
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    
    delay += step;
  }
}

function createPromiseBtn(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  startPromises({
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  });

  event.currentTarget.reset();
}

form.addEventListener('submit', createPromiseBtn);