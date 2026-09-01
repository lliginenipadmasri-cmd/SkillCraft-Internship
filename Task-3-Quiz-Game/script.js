// ==============================
// QUIZ QUESTIONS
// ==============================

const questions = [
    {
        question: "Which language is used to structure a webpage?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        question: "Which language is mainly used to style a webpage?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: "CSS"
    },

    {
        question: "Which language is used to add interactivity to webpages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<p>", "<a>", "<h1>", "<img>"],
        answer: "<a>"
    },

    {
        question: "Which CSS property is used to change text color?",
        options: ["font-size", "background", "color", "border"],
        answer: "color"
    }
];


// ==============================
// GET HTML ELEMENTS
// ==============================

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const currentQuestionElement =
    document.getElementById("currentQuestion");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const progressBar =
    document.getElementById("progressBar");

const nextBtn =
    document.getElementById("nextBtn");

const quizCard =
    document.querySelector(".quiz-card");

const resultCard =
    document.getElementById("resultCard");

const scoreElement =
    document.getElementById("score");

const resultMessage =
    document.getElementById("resultMessage");

const restartBtn =
    document.getElementById("restartBtn");


// ==============================
// QUIZ VARIABLES
// ==============================

let currentQuestionIndex = 0;

let score = 0;

let selectedAnswer = null;


// ==============================
// START QUIZ
// ==============================

function loadQuestion() {

    const currentQuestion =
        questions[currentQuestionIndex];


    questionElement.textContent =
        currentQuestion.question;


    currentQuestionElement.textContent =
        currentQuestionIndex + 1;


    totalQuestionsElement.textContent =
        questions.length;


    optionsElement.innerHTML = "";

    selectedAnswer = null;

    nextBtn.disabled = true;


    // Progress bar

    const progress =
        ((currentQuestionIndex + 1) /
        questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    // Create options

    currentQuestion.options.forEach(
        function(option, index) {

            const optionButton =
                document.createElement("button");

            optionButton.className = "option";

            const optionNumber = document.createElement("span");

            optionNumber.className = "option-number";

            optionNumber.textContent =
                String.fromCharCode(65 + index);


            const optionText = document.createElement("span");

            optionText.textContent = option;


            optionButton.appendChild(optionNumber);

            optionButton.appendChild(optionText);
                    

            optionButton.addEventListener(
                "click",
                function() {

                    selectAnswer(
                        optionButton,
                        option
                    );

                }
            );


            optionsElement.appendChild(
                optionButton
            );

        }
    );
}


// ==============================
// SELECT ANSWER
// ==============================

function selectAnswer(
    selectedButton,
    selectedOption
) {

    const allOptions =
        document.querySelectorAll(".option");


    // Remove previous selection

    allOptions.forEach(function(option) {

        option.classList.remove(
            "selected"
        );

    });


    // Select current option

    selectedButton.classList.add(
        "selected"
    );


    selectedAnswer = selectedOption;

    nextBtn.disabled = false;
}


// ==============================
// NEXT QUESTION
// ==============================

nextBtn.addEventListener(
    "click",
    function() {

        if (selectedAnswer === null) {
            return;
        }


        const correctAnswer =
            questions[currentQuestionIndex].answer;


        // Check answer

        if (selectedAnswer === correctAnswer) {

            score++;

        }


        currentQuestionIndex++;


        // More questions?

        if (
            currentQuestionIndex <
            questions.length
        ) {

            loadQuestion();

        } else {

            showResult();

        }

    }
);


// ==============================
// SHOW RESULT
// ==============================

function showResult() {

    quizCard.hidden = true;

    resultCard.hidden = false;


    scoreElement.textContent =
        `${score} / ${questions.length}`;


    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Excellent! You got every question right.";

    } else if (percentage >= 60) {

        resultMessage.textContent =
            "Good job! Keep learning and improving.";

    } else {

        resultMessage.textContent =
            "Keep practicing. You can do better next time.";

    }
}


// ==============================
// RESTART QUIZ
// ==============================

restartBtn.addEventListener(
    "click",
    function() {

        currentQuestionIndex = 0;

        score = 0;

        resultCard.hidden = true;

        quizCard.hidden = false;

        loadQuestion();

    }
);


// ==============================
// INITIALIZE QUIZ
// ==============================

loadQuestion();