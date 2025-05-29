/**
 * Ambient Music Generator using Web Audio API
 * Tạo nhạc nền ambient đơn giản không cần file audio
 */

class AmbientMusicGenerator {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
        this.masterGain = null;
        this.oscillators = [];
        this.filters = [];
    }

    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            return true;
        } catch (error) {
            console.warn('Web Audio API không được hỗ trợ:', error);
            return false;
        }
    }

    createTone(frequency, type = 'sine', volume = 0.1) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
        filter.Q.setValueAtTime(1, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 2);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);

        this.oscillators.push(oscillator);
        this.filters.push(filter);

        return { oscillator, gainNode, filter };
    }

    async start() {
        if (!this.audioContext) {
            const initialized = await this.init();
            if (!initialized) return false;
        }

        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }

        this.isPlaying = true;

        // Tạo các tông âm ambient
        const notes = [
            { freq: 110, type: 'sine', vol: 0.08 },    // A2
            { freq: 146.83, type: 'sine', vol: 0.06 }, // D3
            { freq: 220, type: 'triangle', vol: 0.05 }, // A3
            { freq: 293.66, type: 'sine', vol: 0.04 }, // D4
            { freq: 440, type: 'sine', vol: 0.03 },    // A4
        ];

        notes.forEach((note, index) => {
            setTimeout(() => {
                if (this.isPlaying) {
                    const tone = this.createTone(note.freq, note.type, note.vol);
                    tone.oscillator.start();
                    
                    // Thêm modulation nhẹ
                    this.addModulation(tone.oscillator, tone.filter);
                }
            }, index * 1000);
        });

        return true;
    }

    addModulation(oscillator, filter) {
        // LFO cho frequency modulation
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        
        lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.2, this.audioContext.currentTime);
        lfo.type = 'sine';
        lfoGain.gain.setValueAtTime(2, this.audioContext.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        lfo.start();

        // Filter modulation
        const filterLfo = this.audioContext.createOscillator();
        const filterLfoGain = this.audioContext.createGain();
        
        filterLfo.frequency.setValueAtTime(0.05 + Math.random() * 0.1, this.audioContext.currentTime);
        filterLfo.type = 'triangle';
        filterLfoGain.gain.setValueAtTime(200, this.audioContext.currentTime);
        
        filterLfo.connect(filterLfoGain);
        filterLfoGain.connect(filter.frequency);
        filterLfo.start();
    }

    stop() {
        this.isPlaying = false;
        
        this.oscillators.forEach(osc => {
            try {
                osc.stop();
            } catch (e) {
                // Oscillator might already be stopped
            }
        });
        
        this.oscillators = [];
        this.filters = [];
    }

    setVolume(volume) {
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }
}

// Export for use in main application
window.AmbientMusicGenerator = AmbientMusicGenerator;
