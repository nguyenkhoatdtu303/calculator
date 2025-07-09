const operation = {
    operand1: null,
    operand2: null,
    operator: null,
    
    operate: function() {
        if (this.operand1 === null || this.operand2 === null) return;

        switch (this.operator) {
            case '+':                
                return this.operand1 + this.operand2;
            case '-':
                return this.operand1 - this.operand2;
            case '*':
                return this.operand1 * this.operand2;
            case '/':
                if (this.operand2 === 0) {
                    display('Error!');
                    clearAll();
                    return;
                }

                return this.operand1 / this.operand2;
        }    
    }
}

const screen = document.querySelector('.screen');

// A temporary number to store the number the user click.
let number = '';
let result;

const digits = document.querySelectorAll('.number');
digits.forEach(digit => {
    digit.addEventListener('click', () => { 
        // if result is being displayed and there is no operator like: 2 +
        // enter new number will reset the operation
        if (result != undefined && operation.operator === null) {
            clearAll();
            result = undefined;
        }

        // In case user enter multiple '.'
        if(number.includes('\.')) {
            if (digit.value === '\.') {
                digit.value = '';
            }
        }

        number += digit.value;
        display(number);
    });
})

const operators = document.querySelectorAll('.operator')
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        display('');

        // in case user enter multiple operator ex: 1 + - *
        // so the operator will be the last one
        if (number === '') {
            operation.operator = operator.value;
            return;
        }

        // decide to convert number from text to float or int
        number = (number.includes('\.'))? parseFloat(number): parseInt(number);

        if (operation.operand1 === null) {
            operation.operand1 = number;
        } else if(operation.operand2 === null) {
            operation.operand2 = number;
        }
        
        // we have 2 two operands and 1 operator so that we can operate
        // if we click another operator it will act like equal button
        // ex: 2 + 3 -
        if (operation.operand2 !== null) {
            result = calculate();
            display(result);
            clearAll();

            operation.operand1 = result;
        }

        number = '';
        operation.operator = operator.value;
    });
})

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
    if (number === '' || operation.operand1 === null) return;

    // update operand2 so that we have 2 operand2, we can operate.
    operation.operand2 = Number(number);

    result = calculate();
    display(result);
    clearAll();

    // if user want to keep operating with the result
    operation.operand1 = result;
})

const clear = document.querySelector('.ac');
clear.addEventListener('click', () => {
    clearAll()
    display('');
});

const undo = document.querySelector('.del');
undo.addEventListener('click', () => {
    // in case user undo the result
    // this will act as clear button
    if (result != undefined) clearAll();

    else number = number.slice(0, number.length - 1);
    display(number);
})

function calculate() {
    let result = operation.operate();
    result = (result % 1 !== 0)? result.toFixed(3): result;
    return result;
}

function clearAll() {
    operation.operand1 = null;
    operation.operand2 = null;
    operation.operator = null;
    number = '';
}

const MAX_LENGTH = 16;
function display(text) {
    // the max length the screen can display
    if (text.length === MAX_LENGTH) {
        text = '';
        clearAll();
    } 

    screen.textContent = text;
}

let click = new Event('click', {bubble: true, cancelable: true})
document.addEventListener('keydown', (e) => {
    let key = e.key;
    let button;

    switch (key) {
        case '0':
            button = document.getElementById('zero');
            break;
        case '1':
            button = document.getElementById('one');
            break;
        case '2':
            button = document.getElementById('two');
            break;
        case '3':
            button = document.getElementById('three');
            break;
        case '4':
            button = document.getElementById('four');
            break;
        case '5':
            button = document.getElementById('five');
            break;
        case '6':
            button = document.getElementById('six');
            break;
        case '7':
            button = document.getElementById('seven');
            break;
        case '8':
            button = document.getElementById('eigth');
            break;
        case '9':
            button = document.getElementById('nine');
            break;
        case '.':
            button = document.getElementById('dot');
            break;
        case '+':
            button = document.getElementById('plus');
            break;
        case '-':
            button = document.getElementById('minute');
            break;  
        case '*':
            button = document.getElementById('multi');
            break;
        case '/':   
            button = document.getElementById('divide');    
        case '=', 'Enter':
            button = document.querySelector('.equal');
            break;
        case 'Backspace':
            button = document.querySelector('.del');
            break;
        default:
            break;
    }

    button.dispatchEvent(click);
})


