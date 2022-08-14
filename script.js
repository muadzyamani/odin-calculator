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
        this.maximumDisplayValues = 9;
        this.lengthOfResult = 1;
    }

    start() {
        window.addEventListener('keydown', (event) => { this.handleKeyPress(event) });

        acBtn.addEventListener('click', () => { this.clear() });

        numberBtns.forEach((numberBtn) => {
            numberBtn.addEventListener('click', () => { this.setCurrentValue(numberBtn.textContent) });
        });

        operatorBtns.forEach((operatorBtn) => {
            operatorBtn.addEventListener('click', () => { this.setOperator(operatorBtn.textContent) });
        });

        equalsBtn.addEventListener('click', () => { this.compute() });

        deleteBtn.addEventListener('click', () => { this.deleteNumber() });

        posNegBtn.addEventListener('click', () => { this.togglePosNeg()} );
    }

    handleKeyPress(event) {
        if (event.key >= 0 && event.key <= 9) {
            this.setCurrentValue(event.key);
        }
        if (event.key === '.') {
            this.currentValueArray.push('.');
        }
        if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            this.setOperator(event.key);
        }
        if (event.key === '=' || event.key === 'Enter') {
            this.compute();
        }
        if (event.key === 'Backspace' || event.key === 'Delete') {
            this.deleteNumber();
        }
        if (event.key === 'Escape') {
            this.clear();
        }
        if (event.key === '`') {
            this.togglePosNeg();
        }
    }

    setCurrentValue(number) {
        if (this.currentValueArray.length <= this.maximumDisplayValues) {
            this.currentValueArray.push(number);
        } else {
            this.clear();
        }
        
        this.updateDisplay();
    }

    setOperator(operator) {
        this.operatorSelected = operator;
        this.previousValue = this.currentValue;
        this.clearDisplay();
    }

    clearDisplay() {
        this.currentValueArray = [];
        this.currentValue = 0;
        this.previousValueArray = [];
        displayBox.innerHTML = 0;
    }

    clear() {
        this.result = 0;
        this.currentValue = 0;
        this.previousValue = 0;
        this.currentValueArray = [];
        this.previousValueArray = [];
        this.operatorSelected = undefined;
        displayBox.innerHTML = 0;
    }

    compute() {
        const decimalPrecison = 8;

        this.currentValueArray = [];
        if (this.operatorSelected === '+') {
            this.result = parseFloat(this.previousValue) + parseFloat(this.currentValue);
        } else if (this.operatorSelected === '-') {
            this.result = parseFloat(this.previousValue) - parseFloat(this.currentValue);
        } else if (this.operatorSelected === '*') {
            this.result = parseFloat(this.previousValue) * parseFloat(this.currentValue);
        } else if (this.operatorSelected === '/') {
            this.result = this.roundNumber(parseFloat(this.previousValue) / parseFloat(this.currentValue), decimalPrecison);
        }

        this.lengthOfResult = this.result.toString().length;
        this.handleLargeResult();
        this.currentValue = this.result;
    }

    handleLargeResult() {
        if (this.lengthOfResult <= this.maximumDisplayValues) {
            displayBox.innerHTML = this.result;
        } else {
            displayBox.innerHTML = 'sorry'
        }
    }

    roundNumber(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    updateDisplay() {
        this.currentValue = this.currentValueArray.join((''));
        displayBox.innerHTML = this.currentValue;
    }

    deleteNumber() {
        this.currentValueArray.pop();
        this.updateDisplay();
    }

    togglePosNeg() {
        if (!this.currentValueArray.includes('-')) {
            this.currentValueArray.unshift('-')
        } else {
            this.currentValueArray.shift();
        }
        this.updateDisplay();
    }
}

const calculator = new Calculator();
calculator.start();