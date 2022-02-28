const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const songsApi = "https://music-world-g1.herokuapp.com/songs"
const singerAPI ="https://music-world-g1.herokuapp.com/singers" 

//
const playList = $('.trendingTrack__row')
const coverImage = $('.image__lightOutline--child')
const songName = $('.playbackSoundBadge__titleLink')
const singerName = $('.playbackSoundBadge__lightLink')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.playControls')
const progress = $('#progress')
const currentTimePlay = $('.timePlay')
const songTime = $('.playbackTimeline__duration')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const volume = $('.volume')
const volumeTarget = $('.volume--background')
const volumeRange = $('.volume--range')
const volumeIcon = $('.volume--icon')
const playbackSoundBadge = $('.playbackSoundBadge')
const ranger = $('.ranger-progress')
const volumeProgress = $('.volume-progress')
const artist = $('.singer')
const notifyUpdate = $$('.notifyUpdate')

function starts() {
    getSongs(createSongs)
}
starts()




function singerNames(){
    
    getSinger(renderSinger)
    const singerNames = $$('.pageList-item__singer')
  
    function getSinger(callback) {
        fetch(singerAPI)
            .then(function (response) {
                return response.json();
            })
            .then(callback)
    }
    
   function renderSinger(singers){
    singerNames.forEach(function(sName,index){

            singers.map((singer)=>{
                if(Number(sName.id)===Number(singer.id)){
                    sName.textContent = singer.singerName
                }
           
        })
       })
   
   
}
}

//MUSIC
function getSongs(callback) {
    fetch(songsApi)
        .then(function (response) {
           
            return response.json();
        })
        .then(callback)
}

function createSongs(musics) {
    var songs = []
    for (var i = 0; i < 15; i++) {
        songs.push(musics[i])
    }


   const app = {
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
        songs,
        render: function () {
            const htmls = this.songs.map((song, index) => { 
                
                return `
                <div class="pageList-item ${index === this.currentIndex && this.isPlaying === true ? 'action active' : ' ' }" data-index="${index}">
                    <div class="pageList-item__head }">
                        <img src="${song.image}" class="pageList-item__img">
                                    <!--ACTION-->
                        <div class="pageList-item__action">
                            <div class="pageList-item__option">
                                <i class="fas fa-heart pageList-item__like"></i>
                                <i class="fas fa-ellipsis-h pageList-item__more"></i>
                            </div>
                            <div class="pageList-item__play">
                                <i class="fas fa-play-circle pageList-item__play--icon"></i>
                            </div>
                        </div> 
                        <div class="pageList-item__pause">  
                                <i class="fas fa-pause-circle pageList-item__pause--icon"></i>
                        </div>
                    </div>
                    
                    <div class="pageList-item__body">
                        <a class="pageList-item__name" href="songs.html?id=${song.id}">${song.name}</a><br>
                        <a class="pageList-item__singer" href="singer.html?id=${song.singerId}" id="${song.singerId}"></a>
                    </div>
                    <div class="more">
                        <div class="more__group">
                            <button class=" more--btn btn--download notifyLogin"><i class="fas fa-download download-icon "></i><p>Download</p></button>
                            <button class=" more--btn btn--addPlaylist notifyLogin"><i class="fas fa-plus addPlaylist-icon "></i><p>Add to playlist</p></button>
                        </div>
                    </div>
                </div>

            ` 
            })
            playList.innerHTML = htmls.join(' ')
            this.handleEvents()
            singerNames()
        },
        defineProperties: function () {
            Object.defineProperty(this, 'currentSong', {
                get: function () {
                    return this.songs[this.currentIndex]
                }
            })
        },
     
        handleEvents: function () {
            const notifyLogin = $$('.notifyLogin')
            console.log(notifyLogin)
            const optionBtn = $$('.pageList-item__option')
            const more = $$('.more')
            const songImages = $$('.pageList-item')
            const _this = this
            const songPlaylists = $$('.pageList-item__head')
            const songAction = $$('.pageList-item__action')
            
            //xử lí khi hover qua bài hát
            songPlaylists.forEach(function (songImage, i) {
                songImage.onmouseover = function () {
                    songAction[i].style.display = "block"
                    optionBtn[i].style.display = "block"
                }
                songImage.onmouseout = function () {
                    songAction[i].style.display = "none"
                    optionBtn[i].style.display = "none"
                }
            })

            //Xử lí khi click play
            playBtn.onclick = function () {
                if (_this.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
            }
            
           //Xử lí khi dừng và chạy bài hát
            songImages.forEach(function (songImage, i) {
                 //Khi chạy bài hát
                audio.onplay = function () {
                    _this.isPlaying = true
                    player.classList.add('playing')                
                    songImages[_this.currentIndex].classList.add('action')
                }
                //Khi dừng bài hát
                audio.onpause = function () {
                    _this.isPlaying = false
                    player.classList.remove('playing')
                    songImages[_this.currentIndex].classList.remove('action')
                }
            })
        
            
            //Khi tiến độ bài hát thay đổi          
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                    ranger.style.width =   progressPercent+ "%";
                    //Hiển thị thời gian chạy được
                    var minues = Math.floor(audio.currentTime / 60)
                    var sec = Math.floor(audio.currentTime);
                    if (Math.floor(audio.currentTime) >= 60 && minues >= 1) {
                        sec = Math.floor(audio.currentTime) - minues * 60
                        sec < 10 ? currentTimePlay.textContent = `${minues}: 0${sec}` : currentTimePlay.textContent = `${minues}: ${sec}`

                    } else {
                        currentTimePlay.textContent = `${minues}: ${sec}`
                        sec < 10 ? currentTimePlay.textContent = `${minues}: 0${sec}` : currentTimePlay.textContent = `${minues}: ${sec}`
                    }
                }
                //Hiển thị thời gian tổng
                var minSong = Math.floor(audio.duration / 60)
                var secSong = Math.floor(audio.duration - minSong * 60)
                songTime.textContent = `${minSong} : ${secSong}`
                secSong < 10 ? songTime.textContent = `${minSong} : 0${secSong}` : songTime.textContent = `${minSong} : ${secSong}`
            }

            //Xử lí tua bài hát
            progress.oninput = function(e){
                ranger.style.width = this.value + "%";
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }
            //Khi next
            nextBtn.onclick = function () {
                if (_this.isRandom) {
                    _this.playRandomSong()
                } else {
                    _this.nextSong()
                }
                audio.play()
                _this.render();

            }
            //Khi bấm prev
            prevBtn.onclick = function () {
                if (_this.isRandom) {
                    _this.playRandomSong()
                } else {
                    _this.prevSong()
                }
                audio.play()
                _this.render();

            }
            //Khi bấm bật bài random
            randomBtn.onclick = function () {
                _this.isRandom = !_this.isRandom
                randomBtn.classList.toggle('active', _this.isRandom)

            }
            //Xử kí next song khi audio ended
            audio.onended = function () {
                if (_this.isRepeat) {
                    audio.play()
                } else {
                    nextBtn.click()
                }
            }
            //Xử lí lặp lai 1 bài hát
            repeatBtn.onclick = function () {
                _this.isRepeat = !_this.isRepeat
                repeatBtn.classList.toggle('active', _this.isRepeat)
            }
            //Lắng nghe hành vi click vào playlist 
            playList.onclick = function (e) {
                const pauseImg = e.target.closest('.pageList-item__pause')
                const songNode = e.target.closest('.pageList-item:not(.active)')
                
                if (songNode || e.target.closest('.pageList-item__option')) {
                    //Xu li click vao song
                    if (songNode && !e.target.closest('.pageList-item__option') &&!e.target.closest('.more__group')) {
                        player.style.display = "block"
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.isPlaying = true
                        _this.loadCurrentSong()
                        _this.render()
                        audio.play()

                    }
                    //Xu li khi click vao option
                   
                }
                else if (e.target.closest('.active') && _this.isPlaying === false) {
                    audio.play()
                }               
                if (pauseImg) {
                    audio.pause()
                }    
            }
            //Xu li khi click vao nut option
            var optionDisplay = "false"
            optionBtn.forEach(function(option,i){
                option.onclick = function(){
                    if(optionDisplay === "false"){
                        more[i].style.display = "block"
                        optionDisplay = "true"
                    }else if(optionDisplay === "true"){
                        more[i].style.display = "none"
                        optionDisplay= "false"
                    }
                }
            })
            //Xu li voi volume
            //Khi hover volume 
            volume.onmouseover = function(){
                volumeTarget.style.display = "block"
            }
            playbackSoundBadge.onmouseover = function(){
                volumeTarget.style.display = "none"
            }
            songTime.onmouseout = function(){
                volumeTarget.style.display = "none"
            }
            volumeTarget.onmouseout = function(e){
                if(e.target.closest('.volume')){
                    volumeTarget.style.display = "none"
                }
            }
            //Khi chinh volume
            var currentVolume = audio.volume
            volumeRange.oninput = function (e) {
                const volumeValue = 1/ 10 * e.target.value
                audio.volume = volumeValue
                currentVolume = volumeValue
                console.log(volumeValue*100)
                volumeProgress.style.width = volumeValue * 100 +"%"
                if(audio.volume > 0.5){
                    volume.classList.add('volumeUp')
                    volume.classList.remove('volumeDown')
                    volume.classList.remove('volumeMute')
                }else if (audio.volume <= 0.5 && audio.volume >0){
                    volume.classList.remove('volumeUp')
                    volume.classList.add('volumeDown')
                    volume.classList.remove('volumeMute')
                }else if(audio.volume === 0){
                    volume.classList.remove('volumeUp')
                    volume.classList.remove('volumeDown')
                    volume.classList.add('volumeMute')
                }
            }
           //Khi click vao nut volume
            volumeIcon.onclick = function(e){
                if(audio.volume !== 0){
                    audio.volume = 0
                    volumeRange.value = 0
                    volumeProgress.style.width = 0+"%"
                }else if(audio.volume === 0){
                    audio.volume = currentVolume
                    volumeRange.value = currentVolume *10
                    volumeProgress.style.width = volumeRange.value *10 +"%"
                }
                if(audio.volume > 0.5){
                    volume.classList.add('volumeUp')
                    volume.classList.remove('volumeDown')
                    volume.classList.remove('volumeMute')
                }else if (audio.volume <= 0.5 && audio.volume >0){
                    volume.classList.remove('volumeUp')
                    volume.classList.add('volumeDown')
                    volume.classList.remove('volumeMute')
                }else if(audio.volume === 0){
                    volume.classList.remove('volumeUp')
                    volume.classList.remove('volumeDown')
                    volume.classList.add('volumeMute')
                }
            } 
            //tinh năng chua update
            notifyUpdate.forEach(function(notify){
                notify.onclick = function(){
                    alert('Tính năng chưa được hoàn thành')
                }
            }) 
              //Thong bao dang nhap
            notifyLogin.forEach(function(notify){
                 notify.onclick = function(){
                    alert('Bạn phải  đăng nhập để sử dụng tính năng này')
                    }
             }) 
        },
    
        loadCurrentSong: function () {
            songName.textContent = this.currentSong.name
            singerName.textContent = this.currentSong.singer
            coverImage.src = this.currentSong.image
            audio.src = this.currentSong.path
            // artist.href = "./singer.html?id="+singerId
            this.songs.map((song) => {
                if(song.singer===singerName.textContent){
                    artist.href = "./singer.html?id="+song.singerId
                }
            })

        },
        nextSong: function () {
            this.currentIndex++
            if (this.currentIndex >= this.songs.length) {
                this.currentIndex = 0
            }
            this.loadCurrentSong()
        },
        prevSong: function () {
            this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
            this.loadCurrentSong()
        },
        playRandomSong: function () {
            let newIndex
            do {
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while (newIndex === this.currentIndex)
            this.currentIndex = newIndex
            this.loadCurrentSong()
        },
        start: function () {
            //Định nghĩa các thuộc tính cho Object
            this.defineProperties()
              //Tai thong tin bai hat dau tien vao UI
              this.loadCurrentSong()
            //Render Songs
            this.render()
        }
    }
    app.start()
}


