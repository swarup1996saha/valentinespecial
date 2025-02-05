document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const card = document.querySelector('.card');
    const specialMessage = document.getElementById('special-message');
    const valentineContent = document.getElementById('valentine-content');
    const countdownContainer = document.getElementById('countdown-container');

    const messages = [
        "You've made me the happiest person! ❤️",
        "Tum salamat raho bas, yehi dua hai meri... 🌹",
        "Together is where the wifi is strongest! 📶",
        "You must be tired of running through my mind all day! 😴",
        "Tumhe dekha toh ye jana sanam... 💝",
        "Are you Google? Because you have everything I'm searching for! 🔍",
        "Ishq me aksar ye paya hai maine, har dard ki dawa hai tu... ✨",
        "Did it hurt? When you fell from heaven? 😇",
        "You're the CSS to my HTML! 💻",
        "Kuch toh hai tujhse raabta... 🎵",
        "You + Me = Anti-Debugging Mode 🐛"
    ];

    const sadMessages = [
        "Trying to say no? That made me sad... but I'm happy now! 🥺",
        "After all those no attempts... finally a yes! 😤❤️",
        "Thought you could escape? But ended up saying yes! 😏",
        "Kitne baar bhagogi/bhagoge? Finally caught you! 😌",
        "Task failed successfully: NoButton.avoid() ➡️ YesButton.click() 💝",
        "Error 402: No button payment required... but yes works too! 😂"
    ];

    let messageIndex = 0;
    let buttonClickCount = 0;
    let noAttempts = 0; // Add this variable to track no attempts
    const backgroundMusic = document.getElementById('backgroundMusic');
    const clickSound = document.getElementById('clickSound');

    function initializeAudio() {
        backgroundMusic.volume = 1;
        clickSound.volume = 0.5;
        
        // Try to play music immediately
        playBackgroundMusic();
        
        // Add backup event listeners to start music on any user interaction
        document.addEventListener('click', playBackgroundMusic, { once: true });
        document.addEventListener('touchstart', playBackgroundMusic, { once: true });
        document.addEventListener('keydown', playBackgroundMusic, { once: true });
    }

    function playBackgroundMusic() {
        backgroundMusic.play()
            .then(() => {
                // Remove event listeners once music starts
                document.removeEventListener('click', playBackgroundMusic);
                document.removeEventListener('touchstart', playBackgroundMusic);
                document.removeEventListener('keydown', playBackgroundMusic);
            })
            .catch(err => {
                console.log("Will try to play on user interaction");
            });
    }

    function updateNoButtonProperties() {
        buttonClickCount++;
        const scale = Math.max(0.5, 1 - buttonClickCount * 0.1);
        noBtn.style.transform = `scale(${scale})`;
        yesBtn.style.transform = `scale(${1 + buttonClickCount * 0.1})`;
    }

    noBtn.addEventListener('mouseover', (e) => {
        noAttempts++; // Increment no attempts counter
        const isMobile = window.innerWidth <= 768;
        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();
        
        // Calculate bounds within the card
        const maxX = cardRect.width - noBtn.offsetWidth - 40; // 40px padding
        const maxY = cardRect.height - noBtn.offsetHeight - 40;
        
        // Generate random position within card bounds
        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);
        
        if (isMobile) {
            // Keep button more visible on mobile
            randomX = Math.max(10, Math.min(randomX, maxX - 10));
            randomY = Math.max(10, Math.min(randomY, maxY - 10));
        }
        
        noBtn.style.position = 'absolute'; // Changed from 'fixed' to 'absolute'
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';

        clickSound.play();
        updateNoButtonProperties();
    });

    yesBtn.addEventListener('click', () => {
        card.style.display = 'none';
        specialMessage.classList.remove('hidden');
        createConfetti();
        showSpecialMessage();
    });

    function moveButton() {
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }

    function createConfetti() {
        for(let i = 0; i < 100; i++) {
            createConfettiPiece();
        }
    }

    function createConfettiPiece() {
        const colors = ['#ff4081', '#ff6b6b', '#ffc0cb', '#ff8fab'];
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }

    function showSpecialMessage() {
        card.style.display = 'none';
        specialMessage.classList.remove('hidden');
        
        const messageSlide = document.querySelector('.message-slide');
        let finalMessage;
        
        if (noAttempts > 0) {
            finalMessage = `
                <h2>Finally caught you! 💝</h2>
                <p>After ${noAttempts} attempts to say no...<br>You made the right choice! 😌</p>
                <p>Ab na jane ka option nahi hai...<br>You're stuck with me forever! 🤭</p>
            `;
        } else {
            finalMessage = `
                <h2>Thank you for saying Yes! ❤️</h2>
                <p>You just made me the happiest person! 💫</p>
                <p>Tumse hi din shuru hota hai,<br>Tumpe hi khatam... 🌹</p>
            `;
        }
        
        messageSlide.innerHTML = finalMessage;
        playBackgroundMusic();
    }

    function getDayMessage() {
        const now = getCurrentDate();
        const month = now.getMonth();
        const date = now.getDate();
        
        if (month !== 1) return null;
    
        const messages = {
            7: {
                title: "Happy Rose Day! 🌹",
                message: [
                    "Gulab ki tarah khushboo ho tum,\nZindagi ke garden ki jaan ho tum...",
                    "Every rose reminds me of your smile,\nMaking my world beautiful, mile by mile...",
                    "Phool khilte hain, log milte hain,\nPar tum jaisa koi nahi milta... 🌸",
                    "Red like roses, pure like you,\nMaking every day feel brand new! ✨",
                    "Rose is red, sky is blue,\nNo flower is as pretty as you! 🌺"
                ].join('\n---\n'), // Add separator between messages
                showButtons: false
            },
            8: {
                title: "Happy Propose Day! 💝",
                message: [
                    "Har safar me tum saath chalo,\nIs dil ki har dhadkan me tum ho...",
                    "Will you be my:- \n√ Debugger in errors\n√ Validator in doubts\n√ Parser of thoughts\n√ Compiler of dreams",
                    "Tum jo haan keh do to,\nYe duniya meri ho jaye! 💫",
                    "Not just today, but every day,\nI choose you to be my favorite bug in production! 🐛",
                    "Loading proposal.exe...\nWaiting for your response... ⌛"
                ].join('\n---\n'), // Add separator between messages
                showButtons: false
            },
            9: {
                title: "Happy Chocolate Day! 🍫",
                message: [
                    "You're sweeter than chocolate,\nAnd that's saying something because I'm diabetic!",
                    "Meethi si chocolate, meethi si tum,\nDuniya ki har khushi tumhare naam! 🍪",
                    "Life is like a box of chocolates,\nBut you're my favorite flavor! 🎁",
                    "My code may have bugs,\nBut my love for you is bug-free! 💝",
                    "You're the chocolate chip to my cookie,\nThe sweetness to my code! 🍫"
                ].join('\n---\n'), // Add separator between messages
                showButtons: false
            },
            10: {
                title: "Happy Teddy Day! 🧸",
                message: [
                    "Teddy bear ke jaise soft and cute,\nBut unlike them, you're not mute!",
                    "You're cuddlier than exception handling,\nSofter than a cloud function! ☁️",
                    "Teddy ho tum, comfort ho tum,\nMeri zindagi ka best loop ho tum! 🎯",
                    "You're my favorite plushie,\nIn this world of binary! 1️⃣0️⃣",
                    "Huggable like a teddy,\nReliable like a well-tested code! 🧪"
                ].join('\n---\n'), // Add separator between messages
                showButtons: false
            },
            11: {
                title: "Happy Promise Day! 🤝",
                message: [
                    "Vaada hai tumse vaada,\nKabhi nahi delete karenge data!",
                    "I Promise.resolve(to_love_you)\n.then(forever)\n.catch(never_let_you_go) 💫",
                    "Promises may be async,\nBut my love is always synchronized! ⚡",
                    "No pending promises here,\nJust committed love for you! 💕",
                    "You're my favorite callback,\nAlways resolving my blues! 🌈"
                ].join('\n---\n'), // Add separator between messages
                showButtons: false
            },
            12: {
                title: "Happy Hug Day! 🤗",
                message: [
                    "Gale milne ka din hai aaya,\nVirtual hug se kaam chala liya jaaya!",
                    "My arms are like try-catch blocks,\nAlways ready to catch you when you fall! 🤗",
                    "Sending hugs through TCP/IP,\nHope they reach you without packet loss! 📡",
                    "You're the perfect interface,\nTo my implementation of love! ❤️",
                    "Wrapping you in endless hugs,\nLike a while(true) loop! 🔄"
                ].join('\n---\n'), // Add separator between messages
                showButtons: false
            },
            13: {
                title: "Happy Kiss Day! 💋",
                message: [
                    "Dil ke browser me tum homepage ho,\nMere cache me bas tumhara storage ho!",
                    "Sealing our love with XOXO,\nNo SSL needed for this encryption! 🔐",
                    "Your kisses are like perfect semicolons,\nCompleting every line of my life! ;)",
                    "Would mark all your kisses as favorites,\nIn my heart's bookmarks! 💝",
                    "Loading kisses.exe...\nError: Too many to count! 💋"
                ].join('\n---\n'), // Add separator between messages
                showButtons: false
            },
            14: {
                title: "Be My Valentine? ❤️",
                message: [
                    "Na roses na candy,\nBas tum ho mere dil ki destiny!",
                    "You're the CSS to my HTML,\nThe API to my frontend,\nThe query to my database! 💘",
                    "Will you join my heart's repository?\nI promise there'll be no merge conflicts! 🤝",
                    "Error 404: Words not found\nTo express my love for you! 💖",
                    "import { love } from 'heart';\nexport default forever_yours; 💕"
                ].join('\n---\n'), // Add separator between messages
                showButtons: true
            }
        };
    
        return messages[date] || null;
    }
    
    function isLoveWeek() {
        const now = getCurrentDate();
        return now.getMonth() === 1 && now.getDate() >= 7 && now.getDate() <= 14;
    }
    
    function isValentinesDay() {
        // Test Mode: Comment/uncomment these lines to test different scenarios
        
        // 1. To always show Valentine's content:
         //return true;
        
        // return isLoveWeek();
    }

    function getNextValentinesDay() {
        const now = getCurrentDate();
        let roseDay = new Date(now.getFullYear(), 1, 7); // Changed to Feb 7 (Rose Day)
        
        if (now > roseDay) {
            // If we've passed Rose Day this year, get next year's date
            roseDay = new Date(now.getFullYear() + 1, 1, 7);
        }
        return roseDay;
    }

    function updateCountdown() {
        if (isLoveWeek()) {
            const dayMessage = getDayMessage();
            if (dayMessage) {
                countdownContainer.classList.add('hidden');
                valentineContent.classList.remove('hidden');
                playBackgroundMusic(); // Add this line to play music when love week content shows
                // Update the card title and message
                document.querySelector('.card h1').textContent = dayMessage.title;
                // Update message display with line breaks
                document.querySelector('.card .message').innerHTML = 
                    dayMessage.message.split('\n').join('<br>');
                
                // Show/hide buttons based on the day
                const buttons = document.querySelector('.buttons');
                buttons.style.display = dayMessage.showButtons ? 'flex' : 'none';
                
                return;
            }
        } else {
            const now = getCurrentDate();
            const roseDay = getNextValentinesDay(); // Now returns Rose Day date
            const difference = roseDay - now;
    
            if (isValentinesDay()) {
                countdownContainer.classList.add('hidden');
                valentineContent.classList.remove('hidden');
                return;
            }
    
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }

    // Initial check
    if (isValentinesDay()) {
        countdownContainer.classList.add('hidden');
        valentineContent.classList.remove('hidden');
        // Original valentine page initialization
        // ...existing code...
    } else {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    initializeAudio();

    // Test controls
    const testControls = document.createElement('div');
    testControls.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0,0,0,0.7);
        padding: 10px;
        border-radius: 5px;
        z-index: 9999;
        color: white;
    `;

    testControls.innerHTML = `
        <div style="margin-bottom: 10px;">Test Different Days:</div>
        ${[7,8,9,10,11,12,13,14].map(day => `
            <button onclick="setTestDate(${day})" style="margin: 2px; padding: 5px;">
                Feb ${day}
            </button>
        `).join('')}
        <button onclick="clearTestDate()" style="margin: 2px; padding: 5px;">
            Reset to Today
        </button>
    `;

    document.body.appendChild(testControls);
});

// Remove or comment out the createHearts function since we won't use it
/* function createHearts() {
    const isMobile = window.innerWidth <= 768;
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * (isMobile ? 1.5 : 2) + 3 + 's';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, isMobile ? 3000 : 5000);
    }, isMobile ? 500 : 300);
} */

// Add these functions at the top of your file, after the initial constants
function setTestDate(day) {
    localStorage.setItem('testDate', `2024-02-${day}`);
    location.reload();
}

function clearTestDate() {
    localStorage.removeItem('testDate');
    location.reload();
}

function getCurrentDate() {
    const testDate = localStorage.getItem('testDate');
    if (testDate) {
        return new Date(testDate);
    }
    return new Date();
}
