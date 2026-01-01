const questions = [
    // Level 1: Everyone knows (Easy)
    {
        question: "1996年、ゲームボーイソフト『ポケットモンスター 赤』と対になって同時発売されたのは？",
        options: ["青", "緑", "黄", "金"],
        answer: 1,
        note: "「赤・緑」が最初でした。「青」は少し後の限定販売でしたね。"
    },
    {
        question: "1996年発売。社会現象になり、入手困難でニセモノも出回った卵型携帯ゲームは？",
        options: ["デジモン", "たまごっち", "てんしっち", "ポケットピカチュウ"],
        answer: 1,
        note: "「白」のデザインが特にレアでした。"
    },
    {
        question: "1999年リリース。「日本の未来は〜♪」のフレーズでおなじみ、モーニング娘。の大ヒット曲は？",
        options: ["抱いてHOLD ON ME!", "恋のダンスサイト", "LOVEマシーン", "ハッピーサマーウェディング"],
        answer: 2,
        note: "後藤真希さんが加入してすぐの衝撃的なヒットでした。"
    },

    // Level 2: You probably remember (Medium)
    {
        question: "バラエティ番組『学校へ行こう！』で、屋上から生徒が想いを叫ぶ人気コーナーの名前は？",
        options: ["東京ラブストーリー", "B-RAP HIGH SCHOOL", "癒し系ミュージシャン", "未成年の主張"],
        answer: 3,
        note: "V6のメンバーが寄り添ってくれました。"
    },
    {
        question: "1997年頃ブーム。「ハイパー〇〇〇」。『ロング・スリーパー』や『犬のさんぽ』などの技を競った玩具は？",
        options: ["ヨーヨー", "ディアボロ", "コマ", "けん玉"],
        answer: 0,
        note: "中村名人のパフォーマンスに憧れました。"
    },
    {
        question: "『ダッシュ!四駆郎』に続く第2次ミニ四駆ブームを牽引した、星馬烈と豪が主人公のアニメは？",
        options: ["爆走兄弟レッツ&ゴー!!", "激闘!クラッシュギアTURBO", "スーパードール★リカちゃん", "超速スピナー"],
        answer: 0,
        note: "「マグナム」と「ソニック」、あなたはどっち派でしたか？"
    },

    // Level 3: Specific Memory (Hard)
    {
        question: "1997年発売。「たまごっち」の男の子版として登場し、端末同士を接続して「バトル」ができたのは？",
        options: ["デジタルモンスター", "ヨーカイザー", "メダロット", "モンスターファーム"],
        answer: 0,
        note: "振ってトレーニングするのが日課でした。"
    },
    {
        question: "1999年発売。宇多田ヒカルの1stアルバム。日本歴代1位の売上（約765万枚）を記録したタイトルの名前は？",
        options: ["Automatic", "First Love", "Distance", "Addicted To You"],
        answer: 1,
        note: "シングル『Automatic』も有名ですが、アルバム名は『First Love』でした。"
    },
    {
        question: "1998年長野五輪、スキージャンプ団体。「ふなき〜」と祈る原田雅彦選手。その後に飛んで金メダルを決めた選手は？",
        options: ["葛西紀明", "岡部孝信", "斉藤浩哉", "船木和喜"],
        answer: 3,
        note: "あの瞬間の感動は忘れられません。"
    },

    // Level 4: Maniac (Very Hard)
    {
        question: "2000年（小学5-6年生頃）に発行された「二千円札」。描かれていた沖縄の建造物は？",
        options: ["首里城正殿", "守礼門", "ひめゆりの塔", "中村家住宅"],
        answer: 1,
        note: "最近は見かけなくなりましたが、確かにあの頃登場しました。"
    }
];

let currentState = 'start'; // start, quiz, result
let currentQuestionIndex = 0;
let score = 0;
const app = document.getElementById('app');

function playSound(type) {
    // Ideally use Web Audio API, for now placeholder
    // In a real app we'd load mp3s
}


function renderStart() {
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
    currentState = 'quiz';
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    app.innerHTML = `
        <div class="feedback" id="feedback"></div>
        <div class="card">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <span class="retro-tag">Q.${currentQuestionIndex + 1}</span>
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
    const q = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.answer;

    // Feedback animation
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.textContent = isCorrect ? '○' : '×';
    feedbackEl.className = `feedback active ${isCorrect ? 'correct' : 'wrong'}`;

    if (isCorrect) score++;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    const percentage = Math.round((score / questions.length) * 100);
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
                ${score} / ${questions.length}
            </div>
            <div style="font-size: 1.2rem; margin-bottom: 2rem;">
                ランク: <span style="font-size: 1.5rem; color: var(--secondary);">${rank}</span><br>
                <p style="font-size: 1rem; margin-top: 10px; opacity: 0.9;">${msg}</p>
            </div>
            <button class="btn" onclick="startGame()">もう一度遊ぶ</button>
        </div>
    `;
}

// Initial render
renderStart();
