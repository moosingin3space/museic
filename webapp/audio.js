var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var current_gain = null;
var current_audio = null;
var total = 2500;
var interval = 250;

function playFromURL(url){
    var audio = new Audio();
    audio.src = url;
    var gain = audioCtx.createGain();
    var source = audioCtx.createMediaElementSource(audio);
    source.connect(gain);
    gain.connect(audioCtx.destination);
    if(current_audio == null)
    {
    	audio.play();
    	current_audio = audio;
    	current_gain = gain;
    }
    else
    {
    	var t = 0;
    	audio.play();
    	setTimeout(function fadeAudio(){
    		t += interval;
    		var x = t/total; 
    		var gain1 = Math.cos(x * 0.5*Math.PI); //goes down
  			var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI); //goes up
  			current_gain.gain.value = gain1;
  			gain.gain.value = gain2;  
  			if(t < total)
  			{
  				setTimeout(fadeAudio, interval); 
  			}
  			else {
  				current_audio = audio;
  				current_gain = gain;
  			}
    	}, interval);

    }
}

module.exports = {
	playFromURL: playFromURL
};