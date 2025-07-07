const screen =  document.querySelector('.screen');
const digits = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.ac');
const deleleButton = document.querySelector('.del');
let number = '';

const operation = {
    number1: null,
    operator: null,
    number2: null,
    evaluate: function() {
        switch(this.operator) {
            case '+':
                return this.number1 + this.number2;
            case '-':
                return this.number - this.number2;
            case '*':
                return this.number * this.number2;
            case '/':
                return Math.floor(this.number / num2);
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
        if (number === '') return;
        
        number = number.includes('\.')? parseFloat(number): parseInt(number);

        if (operation.number1 === null) {
            operation.number1 = number;
        } else if (operation.number2 === null) {
            operation.number2 = number;
        } 

        number = '';
        operation.operator = operator.value;
    });
});


equalButton.addEventListener('click', () => {
    let result = operation.evaluate(parseInt(number))
    screen.textContent = result;
})

clearButton.addEventListener('click', () => {
    operation.number1 = null;
    operation.number2 = null;
    operation.operator = null;
    number = '';
    screen.textContent = number;
})





