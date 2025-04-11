const questions = [
    { question: "Vad är skillnaden mellan Internet och webben?", answer: ["Internet är nätverket", "webben är tjänsten på det"] },
    { question: "Vem skapade webben?", answer: ["Tim Berners-Lee"] },
    { question: "Fördelar och nackdelar med webben?", answer: ["Fördelar: tillgång till information, kommunikation", "Nackdelar: fake news, cyberhot"] },
    { question: "Vad är ett protokoll?", answer: ["Regler för kommunikation över nätverk"] },
    { question: "Hur skickas data över Internet?", answer: ["Genom paket som följer protokoll som TCP/IP"] },
    { question: "Hur får datorer adresser?", answer: ["Genom IP-adresser tilldelade av ISP"] },
    { question: "Vad är säkerhet?", answer: ["Skydd mot hot som virus, hacking"] },
    { question: "Vad är klient och server?", answer: ["Klienten gör förfrågningar", "servern svarar"] },
    { question: "Vad säger GDPR?", answer: ["Regler om skydd av personuppgifter i EU"] },
    { question: "Vad innebär upphovsrätten?", answer: ["Skydd för skapade verk"] },
    { question: "Ge exempel på vad man inte får göra på webben?", answer: ["Sprida falsk information", "hacka", "trakassera"] },
    { question: "Vad betyder integritet?", answer: ["Rätten till privatliv och kontroll över egna data"] }
];

let currentQuizQuestion = 0;
let attempts = 0;
let quizResults = [];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const quizDiv = document.getElementById("quizContainer");
const flashcardsDiv = document.getElementById("flashcardsContainer");
const flashcardsContainer = document.getElementById("flashcards");
const matchingContainer = document.getElementById("matchingContainer");

function showQuiz() {
    flashcardsDiv.style.display = "none";
    matchingContainer.style.display = "none";
    quizDiv.style.display = "block";
    resetQuiz();
    showQuizQuestion(currentQuizQuestion);
}

function showQuizQuestion(index) {
    if (index >= questions.length) {
        showResults();
        return;
    }

    quizContainer.innerHTML = '';
    const q = questions[index];
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `
        <p>${q.question}</p>
        <input type='text' id='answer${index}'>
        <button onclick="nextQuestion()">Svara</button>
        <button onclick="giveUp()">Ge upp</button>
    `;
    quizContainer.appendChild(div);
    attempts = 0;
}

function nextQuestion() {
    const input = document.getElementById(`answer${currentQuizQuestion}`);
    const userAnswer = input.value.trim();
    const correctAnswers = questions[currentQuizQuestion].answer.map(a => a.toLowerCase());

    if (correctAnswers.some(answer => userAnswer.toLowerCase().includes(answer))) {
        quizResults.push({
            question: questions[currentQuizQuestion].question,
            correctAnswer: questions[currentQuizQuestion].answer.join(", "),
            userAnswer: userAnswer,
            correct: true
        });
        currentQuizQuestion++;
        showQuizQuestion(currentQuizQuestion);
    } else {
        attempts++;
        if (attempts < 3) {
            alert(`Försök ${attempts}/3: Fel svar, försök igen.`);
        } else {
            alert(`Rätt svar: ${questions[currentQuizQuestion].answer.join(", ")}`);
            quizResults.push({
                question: questions[currentQuizQuestion].question,
                correctAnswer: questions[currentQuizQuestion].answer.join(", "),
                userAnswer: userAnswer,
                correct: false
            });
            currentQuizQuestion++;
            showQuizQuestion(currentQuizQuestion);
        }
    }
}

function giveUp() {
    const input = document.getElementById(`answer${currentQuizQuestion}`);
    const userAnswer = input ? input.value.trim() : "";
    alert(`Rätt svar: ${questions[currentQuizQuestion].answer.join(", ")}`);
    quizResults.push({
        question: questions[currentQuizQuestion].question,
        correctAnswer: questions[currentQuizQuestion].answer.join(", "),
        userAnswer: userAnswer,
        correct: false
    });
    currentQuizQuestion++;
    showQuizQuestion(currentQuizQuestion);
}

function showResults() {
    quizContainer.innerHTML = "<h3>Dina resultat:</h3>";

    let correctCount = quizResults.filter(r => r.correct).length;
    quizContainer.innerHTML += `<p>Du fick ${correctCount} av ${questions.length} rätt.</p>`;

    quizResults.forEach((res, index) => {
        const resultItem = document.createElement("div");
        resultItem.innerHTML = `
            <h4>Fråga ${index + 1}:</h4>
            <p><strong>Fråga:</strong> ${res.question}</p>
            <p><strong>Ditt svar:</strong> ${res.userAnswer || "Inget svar"}</p>
            <p><strong>Rätt svar:</strong> ${res.correctAnswer}</p>
            <p style="color: ${res.correct ? 'green' : 'red'}">
                ${res.correct ? '✔️ Rätt' : '❌ Fel'}
            </p>
            <hr>
        `;
        quizContainer.appendChild(resultItem);
    });

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Starta om quizet";
    restartBtn.onclick = showQuiz;
    quizContainer.appendChild(restartBtn);
}

function resetQuiz() {
    currentQuizQuestion = 0;
    attempts = 0;
    quizResults = [];
    quizContainer.innerHTML = '';
    resultContainer.innerText = '';
}

// Flashcards
let showAnswerFirst = false;

function showFlashcards() {
    quizDiv.style.display = "none";
    matchingContainer.style.display = "none";
    flashcardsDiv.style.display = "block";
    generateFlashcards();
}

function generateFlashcards() {
    flashcardsContainer.innerHTML = '';
    questions.forEach((q) => {
        const flashcard = document.createElement("div");
        flashcard.classList.add("flashcard");

        const frontText = showAnswerFirst ? q.answer.join(', ') : q.question;
        const backText = showAnswerFirst ? q.question : q.answer.join(', ');

        flashcard.innerHTML = `<p>${frontText}</p><div class="flashcard-answer">${backText}</div>`;

        flashcard.onclick = () => {
            const answer = flashcard.querySelector('.flashcard-answer');
            answer.style.display = answer.style.display === "none" ? "block" : "none";
        };

        flashcardsContainer.appendChild(flashcard);
    });
}

function shuffleFlashcards() {
    questions.sort(() => Math.random() - 0.5);
    generateFlashcards();
}

function toggleFlashcardOrder() {
    showAnswerFirst = !showAnswerFirst;
    generateFlashcards();
}

// Matching
let selectedQuestion = null;
let correctMatches = 0;

function showMatching() {
    quizDiv.style.display = "none";
    flashcardsDiv.style.display = "none";
    matchingContainer.style.display = "block";
    generateMatching();
}

function generateMatching() {
    correctMatches = 0;
    selectedQuestion = null;
    const matchingDiv = document.getElementById("matching");
    const result = document.getElementById("matchingResult");
    matchingDiv.innerHTML = '';
    result.innerHTML = '';

    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const shuffledAnswers = [...questions].map(q => q.answer.join(", ")).sort(() => Math.random() - 0.5);

    const questionCol = document.createElement("div");
    questionCol.classList.add("matching-column");
    const answerCol = document.createElement("div");
    answerCol.classList.add("matching-column");

    shuffledQuestions.forEach(q => {
        const div = document.createElement("div");
        div.classList.add("matching-item");
        div.innerText = q.question;
        div.dataset.type = "question";
        div.dataset.key = q.answer.join(", ");
        div.onclick = () => selectItem(div);
        questionCol.appendChild(div);
    });

    shuffledAnswers.forEach(a => {
        const div = document.createElement("div");
        div.classList.add("matching-item");
        div.innerText = a;
        div.dataset.type = "answer";
        div.dataset.key = a;
        div.onclick = () => selectItem(div);
        answerCol.appendChild(div);
    });

    matchingDiv.appendChild(questionCol);
    matchingDiv.appendChild(answerCol);
}

function selectItem(item) {
    if (item.classList.contains("correct")) return;

    if (item.dataset.type === "question") {
        document.querySelectorAll('.matching-item.selected').forEach(el => el.classList.remove("selected"));
        item.classList.add("selected");
        selectedQuestion = item;
    } else if (item.dataset.type === "answer" && selectedQuestion) {
        if (selectedQuestion.dataset.key === item.dataset.key) {
            selectedQuestion.classList.add("correct");
            item.classList.add("correct");
            selectedQuestion.classList.remove("selected");
            selectedQuestion = null;
            correctMatches++;

            if (correctMatches === questions.length) {
                const btn = document.createElement("button");
                btn.innerText = "Starta om";
                btn.onclick = showMatching;
                document.getElementById("matchingResult").innerHTML = `<p>Du har ${correctMatches} rätt av ${questions.length}.</p>`;
                document.getElementById("matchingResult").appendChild(btn);
            }
        } else {
            item.classList.add("incorrect");
            setTimeout(() => item.classList.remove("incorrect"), 800);
        }
    }
}
