'use strict';

const refs = {
    startBtn: document.querySelector('[data-action="start"]'),
    stopBtn: document.querySelector('[data-action="stop"]'),
};

class CountdownTimer {
    constructor({targetDate, selector}){
        this.intervalId = null;
        this.isActive = false;
        this.targetDate = targetDate;
        this.selector = selector;
    }

    start() {
        if (this.isActive) {
            return;
        };
        const expectedTime = this.targetDate;
        this.isActive = true;
        
        document.querySelector(this.selector)
            .insertAdjacentHTML('beforeend', this.createTimerTemplateEls());
        
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const timeDifference = expectedTime - currentTime;
            const leftTime = this.getTimeElements(timeDifference);
            this.unpdateTimerElements(leftTime);
        }, 1000);
    };


    stop(){
        clearInterval(this.intervalId);
        this.isActive = false;
        const leftTime = this.getTimeElements(0);
        this.unpdateTimerElements(leftTime);
        document.querySelector(this.selector).innerHTML = '';
    };

    getTimeElements (time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
        return { days, hours, mins, secs };
    };

    pad(value) {
        return String(value).padStart(2, '0');
    };

    createTimerTemplateEls () {
        return `<div class="field">
            <span class="value" data-value="days">00</span>
            <span class="label">Days</span>
            </div>
    
             <div class="field">
              <span class="value" data-value="hours">00</span>
              <span class="label">Hours</span>
            </div>
          
            <div class="field">
              <span class="value" data-value="mins">00</span>
              <span class="label">Minutes</span>
            </div>
          
            <div class="field">
              <span class="value" data-value="secs">00</span>
              <span class="label">Seconds</span>
            </div>`;
    };

    unpdateTimerElements ({ days, hours, mins, secs }) {
        document.querySelector('[data-value="days"]').textContent = `${days}`;
        document.querySelector('[data-value="hours"]').textContent = `${hours}`; 
        document.querySelector('[data-value="mins"]').textContent = `${mins}`;
        document.querySelector('[data-value="secs"]').textContent = `${secs}`;
    };
};

const timer = new CountdownTimer({
    targetDate: new Date('March 21 2022'),
    selector: '#timer-1',
});

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

refs.stopBtn.addEventListener('click', () => {
    timer.stop();
});


