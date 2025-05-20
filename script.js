        // Floating hearts
        function createHearts() {
            const container = document.getElementById('hearts-container');
            const colors = ['#ffb6c1', '#ff69b4', '#ff1493', '#ffc0cb', '#db7093'];
            
            for (let i = 0; i < 20; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.innerHTML = '❤️';
                heart.style.fontSize = `${Math.random() * 20 + 10}px`;
                heart.style.left = `${Math.random() * 100}vw`;
                heart.style.top = `${Math.random() * 100}vh`;
                heart.style.animationDuration = `${Math.random() * 4 + 3}s`;
                heart.style.animationDelay = `${Math.random() * 5}s`;
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                container.appendChild(heart);
            }
        }

        // Starry sky
        function createStars() {
            const container = document.getElementById('starry-sky');
            
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.width = `${Math.random() * 3 + 1}px`;
                star.style.height = star.style.width;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(star);
                
                // Make stars clickable with love notes
                star.addEventListener('click', () => {
                    const messages = [
                        "You shine brighter than any star",
                        "My wish upon a star was you",
                        "Our love is written in the stars",
                        "You're my north star",
                        "Every star reminds me of your eyes"
                    ];
                    alert(messages[Math.floor(Math.random() * messages.length)]);
                });
            }
        }

        // Things I Love About You Carousel
        const loveItems = [
            "Your beautiful smile that lights up my world",
            "The way you make me laugh until my stomach hurts",
            "Your kindness that touches everyone around you",
            "Your intelligence and the way you see the world",
            "Your passion for the things you care about",
            "The way you understand me without words",
            "Your strength in facing challenges",
            "Your creativity that inspires me daily",
            "The comfort I feel when I'm with you",
            "Your beautiful heart that loves so deeply"
        ];
        let currentLoveItem = 0;

        function updateLoveCarousel() {
            document.getElementById('love-carousel').innerHTML = 
                `<p class="text-2xl handwriting text-pink-700">${loveItems[currentLoveItem]}</p>`;
        }

        function nextLoveItem() {
            currentLoveItem = (currentLoveItem + 1) % loveItems.length;
            updateLoveCarousel();
        }

        function prevLoveItem() {
            currentLoveItem = (currentLoveItem - 1 + loveItems.length) % loveItems.length;
            updateLoveCarousel();
        }

        // Heart Collecting Game
        let heartGameInterval;
        let heartScore = 0;

        function startHeartGame() {
            if (heartGameInterval) clearInterval(heartGameInterval);
            
            heartScore = 0;
            document.getElementById('heart-score').textContent = heartScore;
            
            const gameArea = document.getElementById('heart-game');
            gameArea.innerHTML = `
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-pink-400 w-16 h-8 rounded-t-full" id="heart-catcher"></div>
                <div class="absolute top-4 right-4 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-md">
                    <span id="heart-score">0</span> / 10 ❤️
                </div>
            `;
            
            // Create falling hearts
            heartGameInterval = setInterval(() => {
                if (heartScore >= 10) {
                    clearInterval(heartGameInterval);
                    alert("You did it! Here's your special message: Florence, you're the love of my life!");
                    return;
                }
                
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.className = 'absolute text-xl';
                heart.style.left = `${Math.random() * 90 + 5}%`;
                heart.style.top = '0';
                gameArea.appendChild(heart);
                
                let top = 0;
                const fallInterval = setInterval(() => {
                    top += 2;
                    heart.style.top = `${top}px`;
                    
                    // Check if caught
                    const catcher = document.getElementById('heart-catcher');
                    const catcherRect = catcher.getBoundingClientRect();
                    const heartRect = heart.getBoundingClientRect();
                    
                    if (heartRect.bottom >= catcherRect.top && 
                        heartRect.right >= catcherRect.left && 
                        heartRect.left <= catcherRect.right) {
                        clearInterval(fallInterval);
                        heart.remove();
                        heartScore++;
                        document.getElementById('heart-score').textContent = heartScore;
                        
                        // Celebration effect
                        const celebration = document.createElement('div');
                        celebration.innerHTML = '🎉';
                        celebration.className = 'absolute text-xl';
                        celebration.style.left = `${catcherRect.left}px`;
                        celebration.style.top = `${catcherRect.top}px`;
                        document.body.appendChild(celebration);
                        
                        gsap.to(celebration, {
                            y: -100,
                            opacity: 0,
                            duration: 1,
                            onComplete: () => celebration.remove()
                        });
                    }
                    
                    // Remove if missed
                    if (top > gameArea.offsetHeight) {
                        clearInterval(fallInterval);
                        heart.remove();
                    }
                }, 20);
            }, 800);
        }

        // Love Fortune Machine
        const fortunes = [
            "Your love will blossom like spring flowers",
            "A romantic surprise is coming your way",
            "Your kindness will be returned tenfold",
            "Someone is thinking of you right now",
            "Your smile will brighten someone's day",
            "Love is in the air for you",
            "A heartfelt conversation is coming",
            "Your compassion inspires others",
            "The universe is aligning for your happiness",
            "Your love story is just beginning"
        ];

        function spinFortuneWheel() {
            const wheel = document.getElementById('fortune-wheel');
            const fortuneText = document.getElementById('fortune-text');
            
            // Disable button during spin
            wheel.style.pointerEvents = 'none';
            fortuneText.textContent = "Spinning...";
            
            // Spin animation
            gsap.to(wheel, {
                rotation: 360 * 5,
                duration: 3,
                ease: "back.out(1)",
                onComplete: () => {
                    // Show random fortune
                    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
                    fortuneText.textContent = randomFortune;
                    wheel.style.pointerEvents = 'auto';
                }
            });
        }

        // Flower Garden Messages
        function showFlowerMessage(flower, message) {
            const container = document.getElementById('flower-message-container');
            const messageElement = document.getElementById('flower-message');
            
            messageElement.textContent = `${flower} ${message}`;
            container.classList.remove('hidden');
            
            // Pulse animation
            gsap.from(container, {
                scale: 0.9,
                opacity: 0,
                duration: 0.5
            });
        }

        // Section Modals
        function openSection(section) {
            const modal = document.getElementById('section-modal');
            const content = document.getElementById('modal-content');
            
            let html = '';
            switch(section) {
                case 'letters':
                    html = `
                        <h2 class="text-3xl handwriting text-pink-600 mb-6">Love Letters</h2>
                        <div class="space-y-4">
                            <div class="bg-pink-50 p-4 rounded-lg border border-pink-200">
                                <h3 class="text-xl handwriting text-pink-500">My Dearest Florence</h3>
                                <p class="mt-2">You used to keep your walls high — and somehow, I got a window.
And every time you let me in just a little more, it feels like the sun rising.
You're the hardest softie I’ve ever met, and I wouldn’t want it any other way.

– with too much fondness.</p>
                                <p class="text-right mt-2 text-sm text-pink-400">Forever yours, ME</p>
                            </div>
                            <div class="bg-pink-50 p-4 rounded-lg border border-pink-200">
                                <h3 class="text-xl handwriting text-pink-500">To the One I Love</h3>
                                <p class="mt-2">Hi you,
Isn’t it wild how a call that starts with “hiii” ends three hours later and I’m smiling like an idiot?
You make time feel like a soft blanket — and honestly, I could stay wrapped up in these convos forever.
You're my favorite voice to end the day with.

</p>
                                <p class="text-right mt-2 text-sm text-pink-400">With all my heart, your unofficial phone addiction partner</p>
                            </div>
                        </div>
                         <h3 class="text-xl handwriting text-pink-500">My Cute senior man</h3>
                                <p class="mt-2">You act like you don’t care sometimes — but you do. So much.
The little things you do, the way you check in without saying the words… I see it.
And I hope you know, I treasure every bit of that quiet kindness.</p>
                                <p class="text-right mt-2 text-sm text-pink-400">Yours "recklessly",  the one who notices</p>
                            </div>
                             <h3 class="text-xl handwriting text-pink-500">florenceeeee</h3>
                                <p class="mt-2">If you were a store, you’d sell tough love, side-eyes, and late-night heart-to-hearts.
And I’d be your most loyal customer.
Because everything about you — even the parts you hide — is exactly what I didn’t know I needed.</p>
                                <p class="text-right mt-2 text-sm text-pink-400">with way too much affection, your 'Joe'</p>
                            </div>
                             <h3 class="text-xl handwriting text-pink-500">My forever crush</h3>
                                <p class="mt-2">We’re not rushing. We’re not labeling. We’re just… here.
And somehow that feels better than any fairytale.
Because this? Us? It’s slow and real and growing in all the quiet ways that last.</p>
                                <p class="text-right mt-2 text-sm text-pink-400">From not just your friend</p>
                            </div>
                    `;
                    break;
                case 'memories':
                    html = `
                        <h2 class="text-3xl handwriting text-purple-600 mb-6">Memory Lane</h2>
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <div class="bg-purple-50 p-2 rounded-lg">
    <div class="h-40 bg-purple-200 rounded-lg flex items-center justify-center">
      <img src="calls.png" alt="calls and dat" class="h-20 object-contain" />
    </div>
    <p class="mt-2 text-center">calls and dat</p>
                            </div>
                            <div class="bg-purple-50 p-2 rounded-lg">
                                <div class="h-40 bg-purple-200 rounded-lg flex items-center justify-center text-4xl">📷</div>
                                <p class="mt-2 text-center">first real date</p>
                            </div>
                            <div class="bg-purple-50 p-2 rounded-lg">
                                <div class="h-40 bg-purple-200 rounded-lg flex items-center justify-center text-4xl">📷</div>
                                <p class="mt-2 text-center">first kiss</p>
                            </div>
                        </div>
                    `;
                    break;
                case 'gifts':
                    html = `
                        <h2 class="text-3xl handwriting text-blue-600 mb-6">Virtual Gifts</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div class="bg-blue-50 p-4 rounded-lg text-center">
                                <div class="text-6xl mb-2">💐</div>
                                <h3 class="text-xl handwriting">Bouquet of Flowers</h3>
                                <p class="text-sm mt-2">Because you deserve flowers every day</p>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-lg text-center">
                                <div class="text-6xl mb-2">🍫</div>
                                <h3 class="text-xl handwriting">Box of Chocolates</h3>
                                <p class="text-sm mt-2">Sweet like your kisses</p>
                            </div>
                            <div class="bg-blue-50 p-4 rounded-lg text-center">
                                <div class="text-6xl mb-2">🥘</div>
                                <h3 class="text-xl handwriting">Fooddddd</h3>
                                <p class="text-sm mt-2">because you keep eating 1 meal a day</p>
                            </div>
                        </div>
                    `;
                    break;
                case 'film':
                    html = `
                        <h2 class="text-3xl handwriting text-red-600 mb-6">Our Story</h2>
                        <div class="aspect-w-16 aspect-h-9 bg-red-100 rounded-lg mb-4 flex items-center justify-center">
                            <span class="text-6xl">🎥</span>
                        </div>
                        <p class="text-center">[currently unavailable]</p>
                        <p class="mt-4 text-center">A short film about our love story</p>
                    `;
                    break;
                case 'plush':
                    html = `
                        <h2 class="text-3xl handwriting text-yellow-600 mb-6">Build-a-Plush(i was just thinking of things to add so manage)</h2>
                        <div class="flex flex-col md:flex-row gap-8">
                            <div class="flex-1">
                                <div class="bg-yellow-100 rounded-lg p-8 flex items-center justify-center">
                                    <div class="relative" id="plush-preview">
                                        <div class="text-6xl plush-part" id="plush-body">🧸</div>
                                        <div class="absolute top-0 left-0 right-0 text-center plush-part" id="plush-face">😊</div>
                                        <div class="absolute bottom-0 left-0 right-0 text-center plush-part" id="plush-clothes">👕</div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-xl handwriting mb-4">Customize Your Plush</h3>
                                
                                <div class="mb-4">
                                    <label class="block mb-2">Body Color</label>
                                    <div class="flex gap-2">
                                        <button onclick="changePlushPart('body', '🧸', 'text-yellow-300')" class="w-8 h-8 bg-yellow-300 rounded-full"></button>
                                        <button onclick="changePlushPart('body', '🐻', 'text-brown-300')" class="w-8 h-8 bg-brown-300 rounded-full"></button>
                                        <button onclick="changePlushPart('body', '🐰', 'text-gray-200')" class="w-8 h-8 bg-gray-200 rounded-full"></button>
                                    </div>
                                </div>
                                
                                <div class="mb-4">
                                    <label class="block mb-2">Face</label>
                                    <div class="flex gap-2">
                                        <button onclick="changePlushPart('face', '😊')" class="text-2xl">😊</button>
                                        <button onclick="changePlushPart('face', '🥰')" class="text-2xl">🥰</button>
                                        <button onclick="changePlushPart('face', '😍')" class="text-2xl">😍</button>
                                        <button onclick="changePlushPart('face', '😘')" class="text-2xl">😘</button>
                                    </div>
                                </div>
                                
                                <div class="mb-4">
                                    <label class="block mb-2">Clothes</label>
                                    <div class="flex gap-2">
                                        <button onclick="changePlushPart('clothes', '👕')" class="text-2xl">👕</button>
                                        <button onclick="changePlushPart('clothes', '👚')" class="text-2xl">👚</button>
                                        <button onclick="changePlushPart('clothes', '🎀')" class="text-2xl">🎀</button>
                                        <button onclick="changePlushPart('clothes', '🦺')" class="text-2xl">🦺</button>
                                    </div>
                                </div>
                                
                                <button class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full handwriting mt-4">Save Your Plush</button>
                            </div>
                        </div>
                    `;
                    break;
            }
            
            content.innerHTML = html;
            modal.classList.remove('hidden');
        }

        function closeSection() {
            document.getElementById('section-modal').classList.add('hidden');
        }

        // Build-a-Plush Customization
        function changePlushPart(part, emoji, colorClass = '') {
            const element = document.getElementById(`plush-${part}`);
            element.textContent = emoji;
            if (colorClass) {
                // Remove all color classes first
                element.classList.remove('text-yellow-300', 'text-brown-300', 'text-gray-200');
                element.classList.add(colorClass);
            }
        }

        // Secret Room Password
        function showPasswordPrompt() {
            document.getElementById('password-prompt').classList.remove('hidden');
        }

        function hidePasswordPrompt() {
            document.getElementById('password-prompt').classList.add('hidden');
        }

        function checkPassword() {
            const password = document.getElementById('password-input').value;
            // Example password - replace with your actual special date
            if (password === "111023") { // MMDDYY format
                hidePasswordPrompt();
                openSecretRoom();
            } else {
                alert("Try again! Hint: It's our special date in MMDDYY format");
            }
        }

        function openSecretRoom() {
            const modal = document.getElementById('section-modal');
            const content = document.getElementById('modal-content');
            
            content.innerHTML = `
                <h2 class="text-3xl handwriting text-purple-600 mb-6">Secret Room</h2>
                <div class="bg-purple-50 p-6 rounded-lg">
                    <p class="text-xl mb-4">Welcome to our secret place, Florence...</p>
                    <div class="space-y-4">
                        <div class="bg-white p-4 rounded-lg">
                            <h3 class="text-xl handwriting">My Deepest Feelings</h3>
                            <p class="mt-2">Florence...

I don’t think I’ve ever told you this properly, but being close to you feels like finding something I didn’t know I was missing.

You don’t open up easily, and I never expected you to. But every moment you’ve let me in — even just a crack — has meant more to me than you can imagine.

I care about you deeply, more than just a friend. More than words usually allow. You make me feel safe, challenged, inspired, and soft — all at once. And honestly… I love that I get to know the version of you not everyone sees.

Whatever this is between us, I want to keep choosing it. Every day.</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg">
                            <h3 class="text-xl handwriting">My Future Dreams with you</h3>
                            <p class="mt-2">If I’m honest...

I think about what it’d be like if we still talked like this years from now — late calls turning into coffee mornings, random inside jokes that never die, playlists that grow with us.

I dream about us traveling somewhere random — a city where no one knows us. I see us getting lost, laughing too hard, sharing street food, and just being ridiculously comfortable in each other’s space.

I imagine a version of life where I always have you nearby — not just on a call, but physically there. The kind of future where we build our own little safe space, together.

I don’t know where we’re heading, but if you're in it, it already sounds like my favorite chapter.</p>
                        </div>
                        <div class="bg-white p-4 rounded-lg">
                            <h3 class="text-xl handwriting">The Little Things</h3>
                            <p class="mt-2">It’s always the small things...

Like the way you pretend not to care, but your actions give you away.
The way you sit in silence but make it feel full.
The way you say “bully” like you're some big person and my whole mood shifts.
How your smile shows up slowly, like it’s deciding if it’s okay to exist.

I adore the way you overthink things and then act chill about them.
The way you listen when I ramble, even if you pretend you're not.
The way you somehow know when I need you, without needing to ask.

It’s all these little things that make you... you. And I wouldn’t change a single one.
                            
</p>
                        </div>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createHearts();
            createStars();
            updateLoveCarousel();
            
            // Auto-rotate love carousel
            setInterval(nextLoveItem, 5000);
        });
