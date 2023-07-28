
// Start theme switcher

const btnLight = document.querySelector(".theme__option--light ");
const btnDark = document.querySelector(".theme__option--dark ");

btnLight.addEventListener("click", () => {
    document.body.classList.remove("dark");
    btnLight.classList.add("active");
    btnDark.classList.remove("active");
});

btnDark.addEventListener("click", () => {
    document.body.classList.add("dark");
    btnLight.classList.remove("active");
    btnDark.classList.add("active");
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark");
    btnDark.classList.add("active");
} else {
    document.body.classList.remove("dark");
    btnLight.classList.add("active");
}

// End theme switcher

// Start calculator

const operation = document.querySelector(".calculator__display--operation");
const result = document.querySelector(".calculator__display--result");

const addToOperation = (num) => {

    if (result.textContent === "0") {
        operation.textContent += num
        return;
    }

    operation.textContent = `${result.textContent} ${num} `;
    result.textContent = "0";
}

let isAddedOperator = false;

const resetFields = () => {
    operation.textContent = "";
    result.textContent = "0";
    isAddedOperator = false;
}


/** NUMBERS **/

const numbers = document.querySelectorAll(".calculator__keys--number");

numbers.forEach((number) => {

    if (number.value === ".") {
        number.addEventListener("click", () => {
            const lastNumber = operation.textContent.split(" ").pop();
            if (!lastNumber.includes(".") && operation.textContent !== "") addToOperation(number.value);
        });
        return;
    }

    if (number.value === "⟳") return;

    number.addEventListener("click", () => {
        addToOperation(number.value);
        isAddedOperator = false;
    });
});

/** OPERATORS **/

const operators = document.querySelectorAll(".calculator__keys--operation");

operators.forEach((operator) => {

    switch (operator.value) {
        case '+':
        case '-':
            operator.addEventListener("click", () => { !isAddedOperator? addToOperation(` ${operator.value} `) : null });
            isAddedOperator = true;
            break;
        case '×':
        case '÷':
            operator.addEventListener("click", () => {
                if (operation.textContent !== "" && !isAddedOperator) addToOperation(` ${operator.value} `);
                isAddedOperator = true;
            });
            break;
        case '=':
            operator.addEventListener("click", () => {
                const evaluate = operation.textContent.replace(/×/g, '*').replace(/÷/g, '/');
                operation.textContent !== "" && !isAddedOperator? result.textContent = eval(evaluate) : null;
            });
            break;
    }
});

/** CONTROLS **/

const controls = document.querySelectorAll(".calculator__keys--control");

controls.forEach((control) => {
    switch (control.value) {
        case 'AC':
            control.addEventListener("click", () => { resetFields() });
            break;
        case '+/-':
            control.addEventListener("click", () => {
                const lastNumber = operation.textContent.split(" ").pop();
                const negative = lastNumber * -1;
                
                if (operation.textContent !== "")
                    operation.textContent = operation.textContent.replace(lastNumber, negative);
            });
            break;
        case '%':
            control.addEventListener("click", () => { 
                const lastNumber = operation.textContent.split(" ").pop();
                const percentage = (lastNumber / 100).toFixed(2);

                if (operation.textContent !== "")
                    operation.textContent = operation.textContent.replace(lastNumber, percentage);
            });
            break;
    }
})

// End calculator