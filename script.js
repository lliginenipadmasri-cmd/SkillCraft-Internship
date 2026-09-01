// ==============================
// GET HTML ELEMENTS
// ==============================

const display = document.getElementById("display");
const millisecondsDisplay = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const status = document.getElementById("status");
const lapsContainer = document.getElementById("lapsContainer");
const lapCount = document.getElementById("lapCount");


// ==============================
// STOPWATCH VARIABLES
// ==============================

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

let lapNumber = 0;


// ==============================
// FORMAT TIME
// ==============================

function formatTime(time) {

    const hours = Math.floor(time / 3600000);

    const minutes = Math.floor(
        (time % 3600000) / 60000
    );

    const seconds = Math.floor(
        (time % 60000) / 1000
    );

    const milliseconds = Math.floor(
        (time % 1000) / 10
    );

    return {
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        milliseconds: String(milliseconds).padStart(2, "0")
    };
}


// ==============================
// UPDATE DISPLAY
// ==============================

function updateDisplay() {

    const time = formatTime(elapsedTime);

    display.childNodes[0].nodeValue =
        `${time.hours}:${time.minutes}:${time.seconds}`;

    millisecondsDisplay.textContent =
        `.${time.milliseconds}`;
}


// ==============================
// START
// ==============================

startBtn.addEventListener("click", function () {

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(function () {

        elapsedTime = Date.now() - startTime;

        updateDisplay();

    }, 10);


    startBtn.disabled = true;

    pauseBtn.disabled = false;

    lapBtn.disabled = false;

    status.textContent = "Stopwatch running";
});


// ==============================
// PAUSE
// ==============================

pauseBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    startBtn.disabled = false;

    pauseBtn.disabled = true;

    lapBtn.disabled = true;

    status.textContent = "Stopwatch paused";
});


// ==============================
// RESET
// ==============================

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    timerInterval = null;

    startTime = 0;

    elapsedTime = 0;

    lapNumber = 0;

    updateDisplay();

    startBtn.disabled = false;

    pauseBtn.disabled = true;

    lapBtn.disabled = true;

    status.textContent = "Ready to start";

    lapsContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🏁</div>

            <p>
                Your lap times will appear here.
            </p>
        </div>
    `;

    lapCount.textContent = "0 Laps";
});


// ==============================
// LAP
// ==============================

lapBtn.addEventListener("click", function () {

    if (!timerInterval) {
        return;
    }

    lapNumber++;

    const time = formatTime(elapsedTime);

    const lapTime =
        `${time.hours}:${time.minutes}:${time.seconds}.${time.milliseconds}`;


    // Remove empty message

    const emptyState =
        lapsContainer.querySelector(".empty-state");

    if (emptyState) {
        emptyState.remove();
    }


    // Create lap

    const lapItem =
        document.createElement("div");

    lapItem.className = "lap-item";

    lapItem.innerHTML = `
        <span class="lap-number">
            Lap ${lapNumber}
        </span>

        <span class="lap-time">
            ${lapTime}
        </span>
    `;


    // Add newest lap to the top

    lapsContainer.prepend(lapItem);


    // Update counter

    lapCount.textContent =
        `${lapNumber} ${lapNumber === 1 ? "Lap" : "Laps"}`;
});


// ==============================
// INITIAL DISPLAY
// ==============================

updateDisplay();