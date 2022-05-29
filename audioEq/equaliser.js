var context = new (window.AudioContext || window.webkitAudioContext)();

var mediaElement = document.querySelector('audio');

var source = context.createMediaElementSource(mediaElement);
Audio.crossOrigin = "anonymous";
//const btn = document.getElementById("button");
//btn.addEventListener("click",()=>{
//  context.resume().then( ()=>Audio.play())
//})
//const audio = document.getElementById('play');
//audio.addEventListener("click",()=>{
//  context.resume().then(()=>console.log(context.state));
//})
var highShelf = context.createBiquadFilter();
var lowShelf = context.createBiquadFilter();
var highPass = context.createBiquadFilter();
var lowPass = context.createBiquadFilter();

source.connect(highShelf);
highShelf.connect(lowShelf);
lowShelf.connect(highPass);
highPass.connect(lowPass);
lowPass.connect(context.destination);

highShelf.type = "highshelf";
highShelf.frequency.value = 4700;
highShelf.gain.value = 50;

lowShelf.type = "lowshelf";
lowShelf.frequency.value = 35;
lowShelf.gain.value = 50;

highPass.type = "highpass";
highPass.frequency.value = 800;
highPass.Q.value = 0.7;

lowPass.type = "lowpass";
lowPass.frequency.value = 880;
lowPass.Q.value = 0.7;

var ranges = document.querySelectorAll('input[type=range]');
ranges.forEach(function(range){
  range.addEventListener('input', function() {
    window[this.dataset.filter][this.dataset.param].value = this.value;
    context.resume();
  });
});

document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;

function startplayer() 
{
 player = document.getElementById('music_player');
 player.controls = false;
}

function play_aud() 
{
 player.play();
 context.resume();
} 
function pause_aud() 
{
 player.pause();
}
function stop_aud() 
{
 player.pause();
 player.currentTime = 0;
}
function change_vol()
{
 player.volume=document.getElementById("change_vol").value;
}
