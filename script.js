const displayBox = document.querySelector('div.display');
const buttons = document.querySelectorAll('button');
const numberBtns = document.querySelectorAll('button#num-btns')
const operatorBtns = document.querySelectorAll('button#operator-btns')
const acBtn = document.querySelector('button.ac');
const equalsBtn = document.querySelector('button.equals');
const deleteBtn = document.querySelector('button.delete');
const posNegBtn = document.querySelector('button.posneg');

class Calculator {
    constructor() {
        this.result = 0;
        this.currentValue = 0;
        this.previousValue = 0;
        this.currentValueArray = [];
        this.previousValueArray = [];
        this.operatorSelected = undefined;
    }

    start() {
        this.clear();
        this.getCurrentValue();
        this.decideOperator();
        this.compute();
        
    }

    getCurrentValue() {
        this.delete();
        this.togglePosNeg();

        numberBtns.forEach((numberBtn) => {
            numberBtn.addEventListener('click', () => {
                this.currentValueArray.push(numberBtn.innerHTML);
                this.updateDisplay();
            });
        });
    }

    decideOperator() {
        operatorBtns.forEach((operatorBtn) => {
            operatorBtn.addEventListener('click', () => {
                this.operatorSelected = operatorBtn.innerHTML;
                this.previousValue = this.currentValue;
                this.clearDisplay();
            });
        });
    }

    clearDisplay() {
        this.currentValueArray = [];
        this.currentValue = 0;
        this.previousValueArray = [];
        displayBox.innerHTML = 0;
    }

    clear() {
        acBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    compute() {
        const decimalPrecison = 8;

        equalsBtn.addEventListener('click', () => {
            this.currentValueArray = [];
            if (this.operatorSelected === '+') {
                this.result = parseFloat(this.previousValue) + parseFloat(this.currentValue);
            } else if (this.operatorSelected === '-') {
                this.result = parseFloat(this.previousValue) - parseFloat(this.currentValue);
            } else if (this.operatorSelected === '*') {
                this.result = parseFloat(this.previousValue) * parseFloat(this.currentValue);
            } else if (this.operatorSelected === '/') {
                this.result = this.round(parseFloat(this.previousValue) / parseFloat(this.currentValue), decimalPrecison);
            }

            displayBox.innerHTML = this.result;
            this.currentValue = this.result;
            // this.currentValue = 0;
        });
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    updateDisplay() {
        this.currentValue = this.currentValueArray.join((''));
        displayBox.innerHTML = this.currentValue;
    }

    delete() {
        deleteBtn.addEventListener('click', () => {
            this.currentValueArray.pop();
            this.updateDisplay();
        });
    }

    togglePosNeg() {
        posNegBtn.addEventListener('click', () => {
            if (!this.currentValueArray.includes('-')) {
                this.currentValueArray.unshift('-')
            } else {
                this.currentValueArray.shift();
            }

            this.updateDisplay();
        });
    }
}

const calculator = new Calculator();
calculator.start();