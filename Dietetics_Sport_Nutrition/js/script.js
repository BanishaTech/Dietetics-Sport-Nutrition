document.addEventListener("DOMContentLoaded", () => {
    const soundSpan = document.getElementById('soundSpan');
    const soundIcon = document.getElementById('soundIcon');
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sounds = ['sounds/perro.mp3', 'sounds/gato.mp3', 'sounds/pajaro.mp3'];
    const buffers = [];
    let isAudioEnabled = false;

    // Load all sounds into buffers
    sounds.forEach((sound, index) => {
        fetch(sound)
            .then(response => response.arrayBuffer())
            .then(data => audioContext.decodeAudioData(data))
            .then(buffer => {
                buffers[index] = buffer;
            })
            .catch(err => console.error('Error loading sound:', err));
    });

    function playSound(buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
    }

    soundIcon.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        isAudioEnabled = !isAudioEnabled;
        soundIcon.textContent = isAudioEnabled ? '🔊' : '🔇';
        soundIcon.className = isAudioEnabled ? 'active' : 'inactive';
    });

    soundSpan.addEventListener('mouseenter', () => {
        if (isAudioEnabled && buffers.length > 0) {
            const randomIndex = Math.floor(Math.random() * buffers.length);
            const randomBuffer = buffers[randomIndex];
            if (randomBuffer) {
                playSound(randomBuffer);
            }
        }
    });
});

