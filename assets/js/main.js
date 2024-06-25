const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const player = $('#player-section')
const songList = $('.song-list')
const cd = $('.cd')
const cdThumb = $('.cd .cd-thumb')
const heading = $('#player-section .content .desc h2')
const singerTitle = $('#player-section .content .desc p')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const currentDuration = $('.time .start')
const leftDuration = $('.time .end')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    arrayIndexRandom: [],
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Đừng làm trái tim anh đau',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/dung-lam-trai-tim-anh-dau.mp3',
            image: './assets/img/dung-lam-trai-tim-anh-dau.jpg'
        },
        {
            name: 'Xoay một vòng',
            singer: 'HIEUTHUHAI ft Phương Ly',
            path: './assets/music/Xoay-Mot-Vong-HIEUTHUHAI-Phuong-Ly.mp3',
            image: './assets/img/Xoay-Mot-Vong-HIEUTHUHAI-Phuong-Ly.jpg'
        },
        {
            name: 'Chúng ta của tương lai',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/Chung-Ta-Cua-Tuong-Lai-Son-Tung-MTP.mp3',
            image: './assets/img/Chung-Ta-Cua-Tuong-Lai-Son-Tung-MTP.jpg'
        },
        {
            name: 'Dân chơi sao phải khóc',
            singer: 'Andree Right Hand ft Rhyder',
            path: './assets/music/Dan-Choi-Sao-Phai-Khoc-Andree-Right-Hand-RHYDER.mp3',
            image: './assets/img/Dan-Choi-Sao-Phai-Khoc-Andree-Right-Hand-RHYDER.jpg'
        },
        {
            name: 'My Humps',
            singer: 'The black eyed peas',
            path: './assets/music/The-Black-Eyed-Peas-Remix-My-Humps.mp3',
            image: './assets/img/The-Black-Eyed-Peas-Remix-My-Humps.jpg'
        },
        {
            name: 'Die for you',
            singer: 'The Weekends ft Ariana Grande',
            path: './assets/music/Die-For-You-Remix-The-Weeknd-x-Ariana-Grande.mp3',
            image: './assets/img/Die-For-You-Remix-The-Weeknd-x-Ariana-Grande.jpg'
        },
        {
            name: 'Dance the night',
            singer: 'Dua Lipa',
            path: './assets/music/Dance-The-Night-Dua-Lipa.mp3',
            image: './assets/img/Dance-The-Night-Dua-Lipa.jpg'
        },
        {
            name: 'Vụ nổ lớn - Không quan trọng',
            singer: 'MCK ft Justatee',
            path: './assets/music/Vu-No-Lon-Khong-Quan-Trong-MCK-Justatee.mp3',
            image: './assets/img/Vu-No-Lon-Khong-Quan-Trong-MCK-Justatee.jpg'
        },
        {
            name: 'Everything will be okay',
            singer: 'HIEUTHUHAI',
            path: './assets/music/Everything-Will-Be-Okay-HIEUTHUHAI.mp3',
            image: './assets/img/Everything-Will-Be-Okay-HIEUTHUHAI.jpg'
        },
    ],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lý CD phóng to / thu nhỏ
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click play 
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi bài hát play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
        }

        // Khi bài hát pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                updateUI()
            }
        }

        // Khi tua bài
        progress.oninput = function(e) {
            // const seekTimes = e.target.value * audio.duration
            audio.currentTime = e.target.value
        }
        
        audio.onloadedmetadata = function() {
            audio.currentTime = 0
            updateUI()
        }

        function updateUI() {
            progress.value = Math.floor(audio.currentTime);
            progress.max = Math.floor(audio.duration);

            let secondCurrent = Math.floor(audio.currentTime) % 60;
            let minuteCurrent = Math.floor(Math.floor(audio.currentTime) / 60);
            let secondLeft = (Math.floor(audio.duration) - Math.floor(audio.currentTime)) % 60;
            let minuteLeft = Math.floor((Math.floor(audio.duration) - Math.floor(audio.currentTime)) / 60);

            let current, left;

            current = secondCurrent < 10 ? `${minuteCurrent}:0${secondCurrent}` : `${minuteCurrent}:${secondCurrent}`;
            left = secondLeft < 10 ? `-${minuteLeft}:0${secondLeft}` : `-${minuteLeft}:${secondLeft}`;

            currentDuration.innerText = current;
            leftDuration.innerText = left;
            progress.style.background = `linear-gradient(to right, var(--primary-color) ${progress.value / progress.max * 100}%, #4d4d4d ${progress.value / progress.max * 100}%)`;
        }

        // Khi next bài
        nextBtn.onclick = function () {
            if (_this.isRandom)
                _this.playRandomSong()
            else
                _this.nextSong()
            audio.play()
        }

        // Khi next bài
        prevBtn.onclick = function () {
            if (_this.isRandom)
                _this.playRandomSong()
            else
                _this.prevSong()
            audio.play()
        }

        // Khi random bài
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Khi repeat bài
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Khi kết thúc bài
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Khi click vào bài
        songList.onclick = function (e) {
            const songNode = e.target.closest('.song-item:not(.active)')
            const optionNode = e.target.closest('.option')
            if (songNode || optionNode) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.handleActivePlaylist()
                    _this.scrollToActiveSong()
                    audio.play()
                }
                if (optionNode) {
                }
            } 
        }

    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        singerTitle.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
        this.handleActivePlaylist()
        this.scrollToActiveSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
        this.handleActivePlaylist()
        this.scrollToActiveSong()
    },
    playRandomSong: function () {
        let newIndex

        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
            if (this.arrayIndexRandom.length === this.songs.length) {
                this.arrayIndexRandom = []
            }
        } while (newIndex === this.currentIndex ||
            this.arrayIndexRandom.includes(newIndex)
        )
        this.arrayIndexRandom.push(newIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        this.handleActivePlaylist()
        this.scrollToActiveSong()
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song-item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        songList.innerHTML = htmls.join('')
    },
    handleActivePlaylist: function () {
        const allSongs = document.querySelectorAll('.song-item')
        allSongs.forEach((song, index) => {
            song.classList.remove('active')
            if (index === this.currentIndex) {
                song.classList.add('active')
            }
        })
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.song-item.active').scrollIntoView({
                bahavior: 'smooth',
                block: this.currentIndex === 0 ? 'end' : 'nearest',
            })
        }, 250)
    },
    start: function() {

        this.loadConfig()

        this.defineProperties()
        
        this.handleEvents()

        this.loadCurrentSong()

        this.render()

        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start()