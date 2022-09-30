var playlist=document.querySelector('.playlist')
var audio=document.querySelector('#audio')
var controlBtn=document.querySelector('.btn-toggle-play')
var cd=document.querySelector('.cd')
var cdWwidth=cd.offsetWidth;
var pauseIcon=document.querySelector('.icon-pause')
var playIcon=document.querySelector('.icon-play')
var nextIcon=document.querySelector('.btn-next');
var prevIcon=document.querySelector('.btn-prev');
var input=document.querySelector('.progress')
var repeatBtn=document.querySelector('.btn-repeat');
var randomBtn=document.querySelector('.btn-random');
var isRandom=false;
var isRepeat=false;

var app={
  currentValue:0,
  
  songs: [
    {
      name: "Attention",
      singer: "Charlie Puth",
      path: "music\\Charlie Puth - Attention [Official Video].mp3"
      ,
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Despacito Remix",
      singer: "Luis Fonsi Daddy Yankee Justin Bieber",
      path: "music\\DespacitoRemix-LuisFonsiDaddyYankeeJustinBieber-5443166.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Faded",
      singer: "Alan Walker",
      path: "music\\Faded-AlanWalker-5919763.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Look What You Made Me Do",
      singer: "Taylor Swift",
      path: "music\\LookWhatYouMadeMeDo-TaylorSwift-5809928.mp3",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Shape Of You",
      singer: "Ed Sheeran",
      path: "music\\ShapeOfYou-EdSheeran-6448581.mp3",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "That Girl",
      singer: "Olly Murs",
      path:
        "music\\ThatGirl-OllyMurs-6560207.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
      name: "We DonT Talk Anymore",
      singer: "Charlie Puth Feat Selena Gome",
      path: "music\\WeDonTTalkAnymoreFeatSelenaGomez-CharliePuth-6426101.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
  ],
  defineProperties:function(){
    Object.defineProperty(this,'currentSong',{
      get:function(){
        return this.songs[this.currentValue]
      }


    })


  },


  render:function(){
    var html=this.songs.map(function(song,index){
      return `<div class="song ${index}" >
      <div class="thumb" style="background-image: url('${song.image}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`

    })
    playlist.innerHTML=html.join('')
    
    
  
     


  },


  

  handleEvent:function(){
    document.onscroll=function(){
      var currentWidth=cdWwidth -window.scrollY;
      cd.style.opacity=currentWidth/cdWwidth;

      if(currentWidth>0){
        cd.style.width=currentWidth+"px";
      }
      else{
        cd.style.width=0;
      }

    }
    

    var playbtn=document.querySelector('.btn-toggle-play');

   
       playbtn.onclick=function(){
        if(audio.paused){
        pauseIcon.style.display="inline-block";
        playIcon.style.display="none"  
         audio.play()}

       else{
        pauseIcon.style.display="none";
        playIcon.style.display="inline-block"  
         audio.pause()
      }} 

var nextSong=function(){
  if(audio.paused){
    app.currentValue+=1

  if(app.currentValue>app.songs.length){
    app.currentValue=0;
    
   }
   else{
    app.currentValue+=0;
   }
   localStorage.setItem("lastValue",app.currentValue);
   app.render()
   app.loadCurrentsong()
   app.checkActivesong()
   audio.play()

  }
  else{
    app.currentValue+=1

    if(app.currentValue>app.songs.length){
      app.currentValue=0;
      
     }
     else{
      app.currentValue+=0;
     }
     localStorage.setItem("lastValue",app.currentValue);

     app.render()          
     app.loadCurrentsong()
     app.checkActivesong()
     audio.play()   

  }
  

};
var prevSong=function(){
  if(audio.paused){
    app.currentValue-=1

  if(app.currentValue<0){
    app.currentValue=app.songs.length;
    
   }
   else{
    app.currentValue+=0;
   }
   
   localStorage.setItem("lastValue",app.currentValue);

   app.render()
   app.loadCurrentsong()
   app.checkActivesong()
   audio.play()


  }
  else{
    app.currentValue-=1

    if(app.currentValue<0){
      app.currentValue=app.songs.length;
      
     }
     else{
      app.currentValue+=0;
     }
     localStorage.setItem("lastValue",app.currentValue);

     app.render()
     app.loadCurrentsong()
     app.checkActivesong()
     audio.play()   

  }
  

  
};

var randomSong=function(){
  var newValue=Math.floor(Math.random()*app.songs.length);
  if(app.currentValue===newValue){
    app.currentValue=Math.floor(Math.random()*app.songs.length);

  }
  else{
    app.currentValue=newValue;
  }
  app.loadCurrentsong();
  audio.play();

};
      
    nextIcon.onclick=function(){
      if(randomBtn.classList.contains('active')){

        randomSong()
      
      }
      else{
        nextSong()
        
      }
    };
    prevIcon.onclick=function(){
      if(randomBtn.classList.contains('active')){

        randomSong()
      }
      else{
        prevSong()
      }
    };;

    audio.addEventListener("ended",function(){

      if(repeatBtn.classList.contains('active')){
        app.loadCurrentsong()
        
      }
      else if(randomBtn.classList.contains('active')){

        randomSong()
      }
      
      else{
        nextSong()

      }

      audio.play()     
    }
    
    
    )
audio.ontimeupdate=function(){
  var currentTime=audio.currentTime;
  var duration=audio.duration;
  input.value=currentTime*100/duration;
}
input.onchange=function(){
  
  audio.currentTime=(input.value*audio.duration)/100;
  audio.play()


}
repeatBtn.onclick=function(){
  this.classList.toggle("active");

  if(this.classList.contains("active")){
    isRepeat=true;

  }
  else{
    isRepeat=false;

  }
  localStorage.setItem("isRepeat",JSON.stringify(isRepeat))

  

};

randomBtn.onclick=function(){
  this.classList.toggle("active")
  if(this.classList.contains("active")){
    isRandom=true;
  }
  else{
    isRandom=false;
  }
  
  localStorage.setItem("isRandom",JSON.stringify(isRandom))

}; 






  },
  checkActivesong:function(){
    var songLists=document.querySelectorAll('.song');
    for(var i=0;i<songLists.length;){
      if(i===app.currentValue){
        songLists[i].classList.add('active'); 
        i++
        
      }
      else{
        songLists[i].classList.remove('active');
        i++

      }
   
  }},

  chooseSong:function(){
    var songLists=document.querySelectorAll('.song');
    songLists.forEach(function(currentSong,index){
      currentSong.onclick=function(){
        app.currentValue=index;
        localStorage.setItem("lastValue",app.currentValue);

        app.loadCurrentsong()
        app.checkActivesong()
        audio.play()
      }
  
    }
    )
    
    },


  loadCurrentsong:function(){
    var header=document.querySelector('header h2');
    var audio=document.querySelector('#audio');
    var cd=document.querySelector('.cd-thumb');
    this.currentValue=parseInt(localStorage.getItem("lastValue"),10);

    header.textContent=`
    ${this.songs[this.currentValue].name}`;
    var path;
    var image_thumb;
    image_thumb=this.songs[this.currentValue].image;
    path=this.songs[this.currentValue].path;
    cd.style.backgroundImage=`url(${image_thumb})`
    audio.setAttribute("src",path)
    
    


    
  },


loadConfig:function(){
  if(JSON.parse(localStorage.getItem("isRandom"))){
    randomBtn.classList.add("active")

  }
  else{

    randomBtn.classList.remove("active")

  }
  if(JSON.parse(localStorage.getItem("isRepeat"))){
    repeatBtn.classList.add("active")

  }
  else{

    repeatBtn.classList.remove("active")

  }

  

},





  
  


  


  
  start:function(){
    this.loadConfig();
    
    this.defineProperties();
    this.handleEvent(); 
    this.render();
    this.loadConfig()
  
    this.loadCurrentsong()
    this.checkActivesong()
    this.chooseSong()


  }


}

app.start()







