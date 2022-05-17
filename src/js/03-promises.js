import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formRef = document.querySelector('.form'),
      delayInputRef = document.querySelector('input[name="delay"]'),
      stepInputRef = document.querySelector('input[name="step"]'),
      amountInputRef = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function startChaining(e) {
  e.preventDefault();
  const delay = +delayInputRef.value,
        step = +stepInputRef.value,
        amount = +amountInputRef.value;
  for (let i = 0; i < amount; i++) {
    createPromise((i + 1), (delay + i * step))
      .then(resolve => {
        Notiflix.Notify.success(resolve);
      })
      .catch(reject => {
        Notiflix.Notify.failure(reject);
      })
  }
}

formRef.addEventListener('submit', startChaining)
