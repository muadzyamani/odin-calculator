const displayBox = document.querySelector('div.display');
const buttons = document.querySelectorAll('button');
const numberBtns = document.querySelectorAll('button#num-btns')
const operatorBtns = document.querySelectorAll('button#operator-btns')
const acBtn = document.querySelector('button.ac');
const equalsBtn = document.querySelector('button.equals')

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
        numberBtns.forEach((numberBtn) => {
            numberBtn.addEventListener('click', () => {
                this.currentValueArray.push(numberBtn.innerHTML);
                this.currentValue = this.currentValueArray.join((''));
                displayBox.innerHTML = this.currentValue;
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
        equalsBtn.addEventListener('click', () => {
            this.currentValueArray = [];
            if (this.operatorSelected === '+') {
                this.result = parseFloat(this.previousValue) + parseFloat(this.currentValue);
            } else if (this.operatorSelected === '-') {
                this.result = parseFloat(this.previousValue) - parseFloat(this.currentValue);
            } else if (this.operatorSelected === '*') {
                this.result = parseFloat(this.previousValue) * parseFloat(this.currentValue);
            } else if (this.operatorSelected === '/') {
                this.result = parseFloat(this.previousValue) / parseFloat(this.currentValue);
            }

            displayBox.innerHTML = this.result;
            this.currentValue = this.result;
        });

    }
}

const calculator = new Calculator();
calculator.start();