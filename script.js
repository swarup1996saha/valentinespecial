document.addEventListener('DOMContentLoaded', () => {
    // Browser compatibility check
    function checkBrowserCompatibility() {
        const ua = navigator.userAgent;
        const browserWarning = document.createElement('div');
        browserWarning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 10px;
            background: #ff4081;
            color: white;
            text-align: center;
            z-index: 9999;
            display: none;
        `;
        
        // Check for older browsers
        if (
            (ua.indexOf("MSIE ") > -1) || 
            (ua.indexOf("Trident/") > -1) ||
            (ua.indexOf("Edge/") > -1 && ua.indexOf("Edg/") === -1)
        ) {
            browserWarning.textContent = "Please use a modern browser like Chrome, Firefox, or Edge for the best experience!";
            browserWarning.style.display = 'block';
            document.body.prepend(browserWarning);
        }
        
        // Check if backdrop-filter is supported
        if (!CSS.supports('backdrop-filter', 'blur(3px)')) {
            document.querySelectorAll('.card, #special-message').forEach(el => {
                el.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            });
        }
    }

    checkBrowserCompatibility();
    
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
        backgroundMusic.volume = 0.8;
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
        moveNoButton();
    });

    // Add touch event for mobile
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        moveNoButton();
    });

    function moveNoButton() {
        noAttempts++;
        const card = document.querySelector('.card');
        const cardRect = card.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Define safe zone within card (accounting for button size and padding)
        const safeZoneX = cardRect.width - btnRect.width - 20;
        const safeZoneY = cardRect.height - btnRect.height - 20;
        
        // Generate random position
        let newX = Math.random() * safeZoneX;
        let newY = Math.random() * safeZoneY;
        
        // Ensure button stays within card boundaries
        newX = Math.max(10, Math.min(newX, safeZoneX));
        newY = Math.max(10, Math.min(newY, safeZoneY));
        
        // Apply new position
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.transition = 'all 0.3s ease';

        clickSound.play();
        updateNoButtonProperties();
    }

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
                    "ab tum khud hi gulab jaisi ho,\n toh tumhari tarif kaya hi karun..\npar ek shayri toh kar sakta hu..",
                    "Gulab ki tarah khushboo ho tum,\nZindagi ke garden ki jaan ho tum...",
                    "haan okay pata hain sayari acchi nahi thi..\npar you know what i mean..",
                    "okay chalo ek aur try karte hain..\nPhool khilte hain, log milte hain,\nPar tum jaisa koi nahi milta... 🌸",
                    "haan pata hain kharab hain meri shayeri..\nrose day wish karne aaya tha bas..",
                    "chalo kal ana firse... 🌹"
                ].join('\n\n'), // Add separator between messages
                showButtons: false
            },
            8: {
                title: "Happy Propose Day! 💝",
                message: [
                    "where do you want me to propose you??",
                    "jaha bhi kaho waha aa jaunga..\npar pehle shayri suno..wo bhi english me..",
                    "roses are red,\ncode is divine,\nI checked stackoverflow,\nHow to make you mine?",
                    "Achha nahi tha na!!\nchalo ek aur try karte hain..",
                    "My heart's mainframe crashed,\nWhen you compiled my life,\nNow all systems point to,\nMaking you my wife!",
                    "ab hasna band karo aur daant andaar karo..\nkal ana firse..."
                ].join('\n\n'), // Add separator between messages
                showButtons: false
            },
            9: {
                title: "Happy Chocolate Day! 🍫",
                message: [
                    "mujhe pata hain tumhe chocolate pasand hain..\npar wo wala chocolate tumhe jada pasand hain...\nhain na?? 😜",
                    "zomato se order karu ya swiggy se??",
                    "chalo koi nahi..\nchocolate day wish karne aaya tha bas..",
                    "chalo kal ana firse.. 🍪",
                    "ruko shayri toh suna hi nahi..\ntumhe kya laga bina shayri ke chala jaunga??",
                    "Meethi si chocolate, meethi si tum,\nDuniya ki har khushi tumhare naam! 🍪",
                    "haan pata hain rhyme nahi hua..\nanalyze karne ki zarurat nahi hain..",
                ].join('\n\n'), // Add separator between messages
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
        const now = getCurrentDate();
        
        // Check for birthday first
        if (now.getMonth() === 1 && now.getDate() === 22) {
            showBirthdayWish();
            return;
        }
    
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
            const { date, event } = getNextImportantDate();
            const difference = date - now;
    
            // Update countdown title dynamically
            document.getElementById('countdown-title').textContent = `Time Until ${event}`;
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
            // Update countdown display
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }
    
    function showBirthdayWish() {
        countdownContainer.classList.add('hidden');
        valentineContent.classList.remove('hidden');
        
        const card = document.querySelector('.card');
        card.innerHTML = `
            <h1>Happy Birthday My Love! 🎂</h1>
            <div class="message">
                <p>To the most amazing person in my life...</p>
                <p>Another year around the sun with you,<br>
                   Makes my world brighter and more beautiful!<br>
                   Your smile brings joy to my heart,<br>
                   Your love gives meaning to my days.</p>
                <p>May this special day bring you all the happiness,<br>
                   All the love, and all the dreams you deserve!</p>
                <p class="hindi-wish">
                   जन्मदिन मुबारक हो मेरी जान! 🎉<br>
                   तुम मेरी ज़िन्दगी की धड़कन हो,<br>
                   मेरी हर ख़ुशी का कारण हो,<br>
                   तुम्हारी हर मुस्कान पे मैं फ़िदा हूँ! ❤️
                </p>
            </div>
        `;
        
        createConfetti();
        playBackgroundMusic();
    }
    
    function getNextImportantDate() {
        const now = getCurrentDate();
        const roseDay = new Date(now.getFullYear(), 1, 7); // Feb 7
        const valentinesDay = new Date(now.getFullYear(), 1, 14); // Feb 14
        const birthday = new Date(now.getFullYear(), 1, 22); // Feb 22
        
        if (now <= roseDay) {
            return { date: roseDay, event: "Love Week" };
        } else if (now <= valentinesDay) {
            return { date: valentinesDay, event: "Valentine's Day" };
        } else if (now <= birthday) {
            return { date: birthday, event: "Birthday" };
        } else {
            return { 
                date: new Date(now.getFullYear() + 1, 1, 7), 
                event: "Next Love Week" 
            };
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
    // const testControls = document.createElement('div');
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
        ${[7,8,9,10,11,12,13,14,15,16,22].map(day => `
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
