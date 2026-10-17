// ==========================
// ELEMENTS
// ==========================

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

const history = document.getElementById("history");
const clearHistory = document.getElementById("clearHistory");

const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");
const clickSound = document.getElementById("clickSound");

// ==========================
// VARIABLES
// ==========================

let expression = "";
let historyList = [];

// ==========================
// CLICK SOUND
// ==========================

function playClick() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }
}

// ==========================
// DISPLAY
// ==========================

function updateDisplay() {
    display.value = expression;
}

// ==========================
// BUTTON EVENTS
// ==========================

buttons.forEach(button => {

    button.addEventListener("click", () => {

        playClick();

        const value = button.textContent;

        switch (value) {

            case "C":

                expression = "";
                updateDisplay();
                break;

            case "⌫":

                expression = expression.slice(0, -1);
                updateDisplay();
                break;

            case "=":

                calculate();
                break;

            case "÷":

                expression += "/";
                updateDisplay();
                break;

            case "×":

                expression += "*";
                updateDisplay();
                break;

            default:

                scientificFunctions(value);
                break;
        }

    });

});

// ==========================
// NORMAL INPUT
// ==========================

function handleInput(value) {

    expression += value;

    updateDisplay();

}

// ==========================
// CALCULATE
// ==========================

function calculate() {

    try {

        let answer = eval(expression);

        historyList.unshift(expression + " = " + answer);

        renderHistory();

        expression = answer.toString();

        updateDisplay();

    }

    catch {

        display.value = "Error";

        expression = "";

    }

}

// ==========================
// HISTORY
// ==========================

function renderHistory() {

    history.innerHTML = "";

    historyList.forEach(item => {

        let div = document.createElement("div");

        div.textContent = item;

        history.appendChild(div);

    });

}

clearHistory.addEventListener("click", () => {

    playClick();

    historyList = [];

    renderHistory();

});

// ==========================
// COPY RESULT
// ==========================

copyBtn.addEventListener("click", () => {

    playClick();

    navigator.clipboard.writeText(display.value);

});

// ==========================
// DARK MODE
// ==========================

themeBtn.addEventListener("click", () => {

    playClick();

    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
            ? "☀️"
            : "🌙";

});

// ==========================
// KEYBOARD SUPPORT
// ==========================

document.addEventListener("keydown", (e) => {

    const key = e.key;

    if ("0123456789.+-*/()%".includes(key)) {

        expression += key;

        updateDisplay();

    }

    else if (key === "Enter") {

        calculate();

    }

    else if (key === "Backspace") {

        expression = expression.slice(0, -1);

        updateDisplay();

    }

    else if (key === "Escape") {

        expression = "";

        updateDisplay();

    }

});
// ==========================
// SCIENTIFIC FUNCTIONS
// ==========================

function scientificFunctions(value) {

    switch (value) {

        // ---------- Square Root ----------
        case "√":

            if (expression === "") return;

            expression = Math.sqrt(Number(expression)).toString();

            updateDisplay();

            break;

        // ---------- Square ----------
        case "x²":

            if (expression === "") return;

            expression = Math.pow(Number(expression), 2).toString();

            updateDisplay();

            break;

        // ---------- Cube ----------
        case "x³":

            if (expression === "") return;

            expression = Math.pow(Number(expression), 3).toString();

            updateDisplay();

            break;

        // ---------- SIN ----------
        case "sin":

            if (expression === "") return;

            expression = Math.sin(Number(expression) * Math.PI / 180).toString();

            updateDisplay();

            break;

        // ---------- COS ----------
        case "cos":

            if (expression === "") return;

            expression = Math.cos(Number(expression) * Math.PI / 180).toString();

            updateDisplay();

            break;

        // ---------- TAN ----------
        case "tan":

            if (expression === "") return;

            expression = Math.tan(Number(expression) * Math.PI / 180).toString();

            updateDisplay();

            break;

        // ---------- NORMAL BUTTONS ----------
        default:

            handleInput(value);

    }

}