const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlistApi = "https://music-world-g1.herokuapp.com/playlist"
const songsApi ="https://music-world-g1.herokuapp.com/songs"
const player = $('.playControls')
const menuBtn = $('.btn-menu')
const songMenu = $('.menuSong')
const menuIcon = $('.menuBtn')
const menuOff =$('.menu-out-icon')
const songName = $('.playbackSoundBadge__titleLink')
const singerName = $('.playbackSoundBadge__lightLink')
const coverImage = $('.image__lightOutline--child')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
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
const playlist = $('.menu-main')
const notifyUpdate = $$('.notifyUpdate')
const notifyLogin = $$('.notifyLogin')


function start(){
    //Hien thi danh sach playlist
    getPlaylist(renderPlaylist)
   
}
start()

function getPlaylist(callback){
    fetch (playlistApi)
    .then (function(response){
        return response.json();
    })
    .then(callback)
}

function renderPlaylist(playlists){
    var newPlaylist = $('#top50')
    var htmls = playlists.map(function(playlist){
        
        return`
            <div class="row rows" data-index="${playlist.id}">
                <div class="wap-items-ss brbox">
                    <div class="wap-ss-img">
                        <div class="hover-img" >
                            <img src="${playlist.playlistImg}" 
                                alt="image">
                            <div class="overlay">
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
                        </div>
                    </div>
                <div class="textleft">
                    <div style="margin-top:10px;">${playlist.playlistName}
                    </div>
                    <div>
                        <p class="text-min">Top 50</p>
                    </div>
                </div>
            </div>
        </div>
        
    `
        
})
    newPlaylist.innerHTML = htmls.join(' ');
    handleEvent()
}

function handleEvent(){
    console.log(notifyLogin)
    const optionBtn = $$('.pageList-item__option')
     const more = $$('.more')
    const playlist = $('.rows')
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
    //Click vao playlist
    playlist.onclick=function(e){
        getSongs(function(songs){
            renderSongs(songs)
        })
        const pauseIcon = e.target.closest('.pageList-item__pause')

        const playIcon = e.target.closest('.pageList-item__play--icon')
        if(playIcon && !e.target.closest('.pageList-item__option')){
            player.style.display = "block"
        }
    }
    //Hien thi danh sach bai hat cua playlist
    var menuDisplay = "false"
    menuBtn.onclick = function(){
        if(menuDisplay === "false"){
            songMenu.style.display = "block" 
            menuIcon.style.color = "#f50"
            menuDisplay = "true"
        }else if(menuDisplay === "true"){
            songMenu.style.display = "none" 
            menuIcon.style.color = "#000"
            menuDisplay = "false"
        }
    }
    menuOff.onclick = function(){
        songMenu.style.display = "none" 
        menuIcon.style.color = "#000"
    }
     //tinh năng chua update
     notifyUpdate.forEach(function(notifyUpdate){
        notifyUpdate.onclick = function(){
            alert('Tính năng chưa được hoàn thành')
        }
    }) 
     //Thong bao dang nhap
     notifyLogin.forEach(function(notify){
        notify.onclick = function(){
            alert('Bạn phải  đăng nhập để sử dụng tính năng này')
        }
    }) 
}

function getSongs(callback){
    fetch (songsApi)
    .then (function(response){
        return response.json();
    })
    .then(callback)
}
function renderSongs(musics,playlistId){
    console.log(playlistId)
    var songs =[]
    for( var i =0; i < 11; i++){
        songs.push(musics[i])
    }

    const app ={
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
        songs,
        playlistId,
        render: function () {
            
            const htmls = this.songs.map((song,index) => {  
                // if(Number(song.playlistId)===Number(playlistId)){ 
                return `
                <div class="menu-playlist ${index === this.currentIndex ? 'action': ' '}" data-index ="${index}">
                    <div class="playlist-song">
                        <div class="playlist-song__img">
                            <img src="${song.image}" class="menu-song_img">
                        </div>
                        <div class="playlist-song__body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="song-option">
                                 <i class="fas fa-heart song-option__like notifyLogin"></i>
                                 <i class="fas fa-ellipsis-h notifyLogin"></i>
                        </div>
                    </div>
                </div>    
            ` 
                //   }
            })
            playlist.innerHTML = htmls.join(' ');
            this.handleEvents()
        },
        handleEvents: function(){
            const notifyUpdate = $$('.notifyUpdate')
            const notifyLogin = $$('.notifyLogin')
            const _this = this
            //Xử lí khi click play
            playBtn.onclick = function () {
                if (_this.isPlaying) {
                    audio.pause()
                } else {
                    audio.play()
                }
            }
      
           //Xử lí khi dừng và chạy bài hát
           audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')                
            }
            audio.onpause = function () {
                _this.isPlaying = false
                player.classList.remove('playing')
            }
 
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
                _this.scrollToActiveSong()
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
                _this.scrollToActiveSong()
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
             //Lắng nghe hành vi click vào playlist
             playlist.onclick = function (e) {
                const pauseImg = e.target.closest('.pageList-item__pause')
                const songNode = e.target.closest('.menu-playlist:not(.action)')
                
                if (songNode || e.target.closest('.song-option')) {
                    //Xu li click vao song
                    if (songNode && !e.target.closest('.song-option') ) {
                        // player.style.display = "block"
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.isPlaying = true
                        _this.loadCurrentSong()
                        _this.render()
                        audio.play()
                    }       
                }
            }
               //tinh năng chua update
                notifyUpdate.forEach(function(notifyUpdate){
                    notifyUpdate.onclick = function(){
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
        scrollToActiveSong: function (){
            setTimeout(()=>{
                //https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                $('.menu-playlist.action').scrollIntoView({
                    behavior:'smooth',
                    block:'end'
                })
            },300)
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
        },  nextSong: function () {
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
        defineProperties: function () {
            Object.defineProperty(this, 'currentSong', {
                get: function () {
                    return this.songs[this.currentIndex]
                }
            })
        },
        loadCurrentSong: function () {
            songName.textContent = this.currentSong.name
            singerName.textContent = this.currentSong.singer
            coverImage.src = this.currentSong.image
            audio.src = this.currentSong.path
            this.songs.map((song, index) => {
                if(song.singer===singerName.textContent){
                    artist.href = "./singer.html?id="+song.singerId
                }
            })
            if( player.style.display === "block"){
                audio.play()
            }
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


