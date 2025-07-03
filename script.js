const screen =  document.querySelector('.screen');
const digits = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.ac');
const deleleButton = document.querySelector('.del');
let number = '';

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
                return Math.floor(this.number / num2);
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

        if (number != '') {
            if (operation.number === null) {
                operation.number = parseInt(number);
            }
            else {
                let result = operation.evaluate(parseInt(number));
                operation.number = result;
                screen.textContent = result;
            }
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
    operation.number = null;
    operation.operator = null;
    number = '';
    screen.textContent = number;
})

deleleButton.addEventListener('click', () => {
    number = number.slice(0, number.length - 1);
    screen.textContent = number;
})




