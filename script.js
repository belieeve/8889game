// Game state
let currentQuestions = [];
let maxQuestions = 10;
let currentState = 'start'; // start, quiz, result
let currentQuestionIndex = 0;
let score = 0;
const app = document.getElementById('app');

// Fisher-Yates shuffle
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function initGame() {
    // Check if questionPool is loaded
    if (typeof window.questionPool === 'undefined' || !window.questionPool) {
        alert('Error: Questions could not be loaded.');
        return;
    }

    // Pick random questions from the pool
    // In a full 500-question version, this ensures variety every time
    const shuffledPool = shuffle(window.questionPool);
    currentQuestions = shuffledPool.slice(0, maxQuestions);
}


// Sound effect placeholder
function playSound(type) {
    // Ideally use Web Audio API, for now placeholder
}

function renderStart() {
    initGame(); // Pre-load questions for display or wait until start
    app.innerHTML = `
        <div class="card">
            <span class="retro-tag">1988-1989 BORN</span>
            <h1>懐かしクイズ<br>88-89</h1>
            <div style="margin: 1rem 0;">
                <img src="title_bg.png" alt="Retro 90s Vibes" style="width: 100%; max-width: 300px; border-radius: 10px; border: 2px solid var(--glass-border); box-shadow: 0 0 15px rgba(0,255,204,0.3);">
            </div>
            <p style="margin-bottom: 2rem;">
                たまごっち、ミニ四駆、モー娘。...<br>
                あの頃の記憶、残っていますか？
            </p>
            <button class="btn" onclick="startGame()">START</button>
        </div>
    `;
}


function startGame() {
    initGame();
    currentState = 'quiz';
    currentQuestionIndex = 0;
    score = 0;
    document.documentElement.style.setProperty('--hue-rotate', '0deg'); // Reset
    renderQuestion();
}






function renderQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;

    // Random hue rotation for "unique" feel even with same base image
    const hueRotate = Math.floor(Math.random() * 60) - 30; // +/- 30deg shift
    const filterStyle = `filter: hue-rotate(${hueRotate}deg);`;

    app.innerHTML = `
        <div class="feedback" id="feedback"></div>
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <span class="retro-tag" style="margin-bottom: 0;">Q.${currentQuestionIndex + 1}</span>
                <button onclick="renderStart()" style="background: none; border: none; color: var(--text-main); font-family: 'DotGothic16', sans-serif; cursor: pointer; opacity: 0.7;">
                    ↩ TOP
                </button>
            </div>
            

            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>

            <div class="question-text">${q.question}</div>
            <div class="options-grid">
                ${q.options.map((opt, index) => `
                    <button class="btn" onclick="checkAnswer(${index})">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function checkAnswer(selectedIndex) {
    const q = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.answer;

    // Feedback animation
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = isCorrect ? '○' : '×';
    feedbackEl.className = `feedback active ${isCorrect ? 'correct' : 'wrong'}`;

    if (isCorrect) score++;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            renderQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    let rank = '';
    let title = '';
    let msg = '';

    if (percentage === 100) {
        rank = 'S';
        title = '【ミレニアムの覇者】';
        msg = '完全な88-89年世代！<br>あの頃の思い出は今も輝いています！';
    } else if (percentage >= 80) {
        rank = 'A';
        title = '【ノストラダムスの予言者】';
        msg = '素晴らしい記憶力！<br>ミレニアム前夜を全力で楽しんだ世代ですね。';
    } else if (percentage >= 50) {
        rank = 'B';
        title = '【普通の小学生】';
        msg = 'なかなかの88-89度。<br>思い出補正していきましょう！';
    } else {
        rank = 'C';
        title = '【未来から来た人】';
        msg = 'あれ？<br>もしかして別の世代ですか？';
    }

    app.innerHTML = `
        <div class="card">
            <span class="retro-tag">RESULT</span>
            <h2>あなたの称号</h2>
            <div style="font-size: 1.5rem; color: var(--accent); margin: 0.5rem 0; text-shadow: 0 0 10px rgba(204, 255, 0, 0.5);">
                ${title}
            </div>
            <div style="font-size: 4rem; font-weight: bold; color: var(--primary); margin: 1rem 0;">
                ${score} / ${currentQuestions.length}
            </div>

            <div style="font-size: 1.2rem; margin-bottom: 2rem;">
                ランク: <span style="font-size: 1.5rem; color: var(--secondary);">${rank}</span><br>
                <p style="font-size: 1rem; margin-top: 10px; opacity: 0.9;">${msg}</p>
            </div>
            <button class="btn" onclick="startGame()">もう一度遊ぶ</button>
            <button class="btn" onclick="renderStart()" style="margin-top: 10px; background: transparent; border: 1px solid var(--glass-border); color: var(--text-main);">トップに戻る</button>
        </div>
    `;
}

// Initial render
renderStart();
