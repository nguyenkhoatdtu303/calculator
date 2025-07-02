const screen =  document.querySelector('.screen');
const digits = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');

let number = "";
let expression = [];

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        number += digit.value;
        screen.textContent = number;
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        expression.push(number);

        if(expression.length === 3) {
            let result = evaluate(expression);
            screen.textContent = result;
            expression = [];
            expression.push(result)
        } else {
            screen.textContent = "";
        }

        expression[1] = operator.value;
        number = "";
    });
});


equal.addEventListener('click', () => {
    expression.push(number);
    screen.textContent = evaluate(expression);    
})

function evaluate(express) {
    let num1 = parseInt(express[0]);
    let num2 = parseInt(express[2]);

    switch(express[1]) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return Math.floor(num1 / num2);
    }
}

