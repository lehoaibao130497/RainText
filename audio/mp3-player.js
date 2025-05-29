/**
 * MP3 Audio Player for 3D Rain Effect
 * Hỗ trợ phát nhạc nền từ file MP3
 */

class MP3AudioPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.volume = 0.1;
        this.currentTrack = null;
        this.playlist = [];
        this.currentIndex = 0;
        this.loop = true;
        this.crossfadeDuration = 2000; // 2 seconds
    }

    /**
     * Khởi tạo player với danh sách nhạc
     */
    async init(playlist = []) {
        this.playlist = playlist;

        console.log('🎵 Initializing MP3 Player with playlist:', this.playlist);

        if (this.playlist.length > 0) {
            console.log('📋 Playlist tracks:');
            this.playlist.forEach((track, index) => {
                console.log(`  ${index + 1}. ${track.name} - ${track.artist} (${track.path})`);
            });

            const success = await this.loadTrack(0);
            if (success) {
                console.log('🎵 MP3 Player initialized successfully with', this.playlist.length, 'tracks');
                return true;
            } else {
                console.error('❌ Failed to load any tracks');
                return false;
            }
        } else {
            console.warn('⚠️ No MP3 tracks provided');
            return false;
        }
    }

    /**
     * Load một track
     */
    async loadTrack(index) {
        if (index < 0 || index >= this.playlist.length) {
            console.warn('⚠️ Invalid track index:', index);
            return false;
        }

        try {
            console.log(`🔄 Loading track: ${this.playlist[index].name} from ${this.playlist[index].path}`);

            // Tạo audio element mới
            const newAudio = new Audio();
            newAudio.src = this.playlist[index].path;
            newAudio.volume = this.volume;
            newAudio.loop = this.loop && this.playlist.length === 1; // Chỉ loop nếu có 1 track
            newAudio.preload = 'auto';
            newAudio.crossOrigin = 'anonymous'; // Để tránh CORS issues

            // Event listeners
            newAudio.addEventListener('loadeddata', () => {
                console.log(`✅ Loaded: ${this.playlist[index].name}`);
            });

            newAudio.addEventListener('error', (e) => {
                console.error(`❌ Error loading: ${this.playlist[index].name}`, e);
                console.error('Error details:', {
                    error: e.target.error,
                    src: e.target.src,
                    networkState: e.target.networkState,
                    readyState: e.target.readyState
                });
            });

            newAudio.addEventListener('ended', () => {
                if (!this.loop || this.playlist.length === 1) return;

                // Auto next track
                this.nextTrack();
            });

            // Đợi load xong với timeout ngắn hơn
            await new Promise((resolve, reject) => {
                let resolved = false;

                const resolveOnce = () => {
                    if (!resolved) {
                        resolved = true;
                        resolve();
                    }
                };

                const rejectOnce = (error) => {
                    if (!resolved) {
                        resolved = true;
                        reject(error);
                    }
                };

                // Thử nhiều event để đảm bảo load thành công
                newAudio.addEventListener('canplay', resolveOnce);
                newAudio.addEventListener('canplaythrough', resolveOnce);
                newAudio.addEventListener('loadedmetadata', resolveOnce);

                newAudio.addEventListener('error', (e) => {
                    rejectOnce(new Error(`Audio load error: ${e.target.error?.message || 'Unknown error'}`));
                });

                // Timeout sau 5 giây
                setTimeout(() => {
                    rejectOnce(new Error('Load timeout after 5 seconds'));
                }, 5000);

                // Bắt đầu load
                newAudio.load();
            });

            // Thay thế audio cũ
            if (this.audio) {
                this.audio.pause();
                this.audio.src = '';
            }

            this.audio = newAudio;
            this.currentIndex = index;
            this.currentTrack = this.playlist[index];

            console.log(`🎵 Track ready: ${this.currentTrack.name}`);
            return true;

        } catch (error) {
            console.error('❌ Failed to load track:', this.playlist[index].name, error);
            console.error('Track path:', this.playlist[index].path);

            // Thử track tiếp theo nếu có
            if (this.playlist.length > 1 && index < this.playlist.length - 1) {
                console.log('🔄 Trying next track...');
                return await this.loadTrack(index + 1);
            }

            return false;
        }
    }

    /**
     * Phát nhạc
     */
    async play() {
        if (!this.audio) {
            console.warn('⚠️ No audio loaded');
            return false;
        }

        try {
            await this.audio.play();
            this.isPlaying = true;
            console.log('🎵 Playing:', this.currentTrack.name);
            return true;
        } catch (error) {
            console.error('❌ Play error:', error);
            return false;
        }
    }

    /**
     * Dừng nhạc
     */
    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            console.log('⏸️ Paused:', this.currentTrack?.name);
        }
    }

    /**
     * Dừng hoàn toàn
     */
    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPlaying = false;
            console.log('⏹️ Stopped:', this.currentTrack?.name);
        }
    }

    /**
     * Toggle play/pause
     */
    async toggle() {
        if (this.isPlaying) {
            this.pause();
            return false;
        } else {
            const success = await this.play();
            return success;
        }
    }

    /**
     * Đặt âm lượng
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        if (this.audio) {
            this.audio.volume = this.volume;
        }
    }

    /**
     * Lấy âm lượng hiện tại
     */
    getVolume() {
        return this.volume;
    }

    /**
     * Track tiếp theo
     */
    async nextTrack() {
        if (this.playlist.length <= 1) return false;
        
        const nextIndex = (this.currentIndex + 1) % this.playlist.length;
        const wasPlaying = this.isPlaying;
        
        await this.loadTrack(nextIndex);
        
        if (wasPlaying) {
            await this.play();
        }
        
        return true;
    }

    /**
     * Track trước đó
     */
    async previousTrack() {
        if (this.playlist.length <= 1) return false;
        
        const prevIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        const wasPlaying = this.isPlaying;
        
        await this.loadTrack(prevIndex);
        
        if (wasPlaying) {
            await this.play();
        }
        
        return true;
    }

    /**
     * Đặt chế độ loop
     */
    setLoop(loop) {
        this.loop = loop;
        if (this.audio && this.playlist.length === 1) {
            this.audio.loop = loop;
        }
    }

    /**
     * Lấy thông tin track hiện tại
     */
    getCurrentTrack() {
        return this.currentTrack;
    }

    /**
     * Lấy danh sách playlist
     */
    getPlaylist() {
        return this.playlist;
    }

    /**
     * Lấy trạng thái phát
     */
    getPlayingState() {
        return {
            isPlaying: this.isPlaying,
            currentTrack: this.currentTrack,
            currentIndex: this.currentIndex,
            volume: this.volume,
            loop: this.loop,
            currentTime: this.audio ? this.audio.currentTime : 0,
            duration: this.audio ? this.audio.duration : 0
        };
    }

    /**
     * Thêm track vào playlist
     */
    addTrack(track) {
        this.playlist.push(track);
        console.log('➕ Added track:', track.name);
    }

    /**
     * Xóa track khỏi playlist
     */
    removeTrack(index) {
        if (index >= 0 && index < this.playlist.length) {
            const removed = this.playlist.splice(index, 1)[0];
            console.log('➖ Removed track:', removed.name);
            
            // Điều chỉnh currentIndex nếu cần
            if (index === this.currentIndex) {
                this.stop();
                this.currentTrack = null;
            } else if (index < this.currentIndex) {
                this.currentIndex--;
            }
        }
    }

    /**
     * Cleanup resources
     */
    destroy() {
        this.stop();
        if (this.audio) {
            this.audio.src = '';
            this.audio = null;
        }
        this.playlist = [];
        this.currentTrack = null;
        console.log('🗑️ MP3 Player destroyed');
    }
}

// Export for use in main application
window.MP3AudioPlayer = MP3AudioPlayer;
