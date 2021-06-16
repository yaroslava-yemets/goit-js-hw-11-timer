'use strict';

const refs = {
    startBtn: document.querySelector('[data-action="start"]'),
    stopBtn: document.querySelector('[data-action="stop"]'),
    daysField: document.querySelector('[data-value="days"]'),
    hoursField: document.querySelector('[data-value="hours"]'),
    minsField: document.querySelector('[data-value="mins"]'),
    secsField: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
    constructor({onCount, targetDate}){
        this.intervalId = null;
        this.isActive = false;
        this.onCount = onCount;
        this.targetDate = targetDate;
    }

    start() {
        if (this.isActive) {
            return;
        };
        const expectedTime = this.targetDate;
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const timeDifference = expectedTime - currentTime;
            const leftTime = this.getTimeElements(timeDifference);
            this.onCount(leftTime);
        }, 1000);
    };

    stop(){
        clearInterval(this.intervalId);
        this.isActive = false;
        const leftTime = this.getTimeElements(0);
        this.onCount(leftTime);
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
};

const timer = new CountdownTimer({
    onCount: unpdateTimerElements,
    targetDate: new Date('August 15 2021'),
});

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

refs.stopBtn.addEventListener('click', () => {
    timer.stop();
});

function unpdateTimerElements ({ days, hours, mins, secs }) {
    refs.daysField.textContent = `${days}`;
    refs.hoursField.textContent = `${hours}`;
    refs.minsField.textContent = `${mins}`;
    refs.secsField.textContent = `${secs}`;
};
