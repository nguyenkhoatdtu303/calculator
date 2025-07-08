const screen =  document.querySelector('.screen');
const digits = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.ac');
const deleleButton = document.querySelector('.del');
const equalButton = document.querySelector('.equal');
let number = '';
let result; 

const operation = {
    number: null,
    operator: null,
    evaluate: function(num2) {
        switch(this.operator) {
            case '+':
                return this.number + num2;
            case '-':
                return this.number - num2;
            case '*':
                return this.number * num2;
            case '/':
                return this.number / num2;
            default:
                return number;
        }
    }
}

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        number += digit.value;
        screen.textContent = number;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (number === '') {
            operation.operator = operator.value;    
            return;
        }

        number = number.includes('\.')? parseFloat(number): parseInt(number);
    
        if (operation.number === null) {
            operation.number = number;
        }else {
            equal();
        }

        operation.operator = operator.value;
        number = '';
    });
});

function equal() {
    result = operation.evaluate(number);
    result = (result % 1 !== 0)? result.toFixed(3): result;
    operation.number = Number(result);
    screen.textContent = result;
}

equalButton.addEventListener('click', () => {
    if (number === '') return;
    number = number.includes('\.')? parseFloat(number): parseInt(number);
    
    equal()
    number = '';
});

clearButton.addEventListener('click', () => {
    operation.number = null;
    operation.operator = null;
    number = '';
    screen.textContent = number;
})

deleleButton.addEventListener('click', () => {
    number = number.slice(0, number.length - 1);
    screen.textContent = number;
})




