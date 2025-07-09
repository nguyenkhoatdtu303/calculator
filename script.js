const operation = {
    number1: null,
    number2: null,
    operator: null,
    
    operate: function() {
        if (this.number1 === null || this.number2 === null) return;

        switch (this.operator) {
            case '+':                
                return this.number1 + this.number2;
            case '-':
                return this.number1 - this.number2;
            case '*':
                return this.number1 * this.number2;
            case '/':
                return this.number1 / this.number2;
        }    
    }
}

const digits = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const screen = document.querySelector('.screen');
const clear = document.querySelector('.ac');
const undo = document.querySelector('.del');
const equal = document.querySelector('.equal');

// A temporary number to store the number the user click.
let number = '';
let result;

digits.forEach(digit => {
    digit.addEventListener('click', () => { 
        if (operation.operator === null) {
            operation.number1 = null;
        }
        number += digit.value;
        display(number);
    });
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        display('');
        if (number === '') {
            operation.operator = operator.value;
            return;
        }

        number = (number.includes('\.'))? parseFloat(number): parseInt(number);

        if (operation.number1 === null) operation.number1 = number;
        else if(operation.number2 === null) operation.number2 = number;
        
        // we have 2 two numbers so that we can operate
        if (operation.number2 != null) {
            
            //store the result to display
            result = calculate();
            display(result);

            // store result so that we can keep operate with that result
            operation.number1 = result;
            operation.number2 = null;
        }

        number = '';
        operation.operator = operator.value;
    });
})

equal.addEventListener('click', () => {
    if (number === '' || operation.number1 === null) return;

    operation.number2 = Number(number);

    result = calculate();
    display(result);

    operation.number1 = result;
    operation.number2 = null;
    operation.operator = null;
    number = '';
})

clear.addEventListener('click', () => {
    clearAll()
    display(number);
});

function calculate() {
    let result = operation.operate();
    result = (result % 1 !== 0)? result.toFixed(3): result;
    return result;
}

function clearAll() {
    operation.number1 = null;
    operation.number2 = null;
    operation.operator = null;
    number = '';
}

undo.addEventListener('click', () => {

    // in case user undo the result
    // this will act as clear button
    if (number === '') clearAll();

    else number = number.slice(0, number.length - 1);

    display(number);
})


function display(number) {
    screen.textContent = number;
}

