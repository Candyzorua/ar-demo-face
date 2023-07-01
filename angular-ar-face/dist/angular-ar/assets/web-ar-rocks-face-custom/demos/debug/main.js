
const _appStates = {
  notLoaded: -1,
  idle: 0,
  busy: 1
};

const _state = {
  appState: _appStates.notLoaded,
  NNURL: null,
  video: null,
  canvas: null
};


function start(){
  WebARRocksFaceDebugHelper.init({
    spec: {}, // keep default specs
    callbackReady: function(err, spec){
      _state.appState = _appStates.idle;
      _state.video = spec.video;
      _state.canvas = spec.canvasElement;
    },
    callbackTrack: function(detectState){
      
    }
  })
}


function change_pointSize(e){
  const v = parseInt(e.target.value);
  WebARRocksFaceDebugHelper.set_pointSize(v);
}


function change_NN(e){
  const newNNURL = e.target.value;
  if (newNNURL===_state.NNURL || _state.appState !== _appStates.idle){
    return;
  }
  _state.appState = _appStates.busy;

  WebARRocksFaceDebugHelper.change_NN('../../neuralNets/' + newNNURL).then(function(){
    _state.appState = _appStates.idle;
    _state.NNURL = newNNURL;
  });  
}


function change_video(e){
  const inputFile = e.target;
  if (!inputFile.files || _state.appState !== _appStates.idle){
    return;
  }
  _state.appState = _appStates.busy;

  const newVideo = document.createElement('video');
  newVideo.setAttribute("src", URL.createObjectURL(inputFile.files[0]));
  newVideo.setAttribute("loop", "true");
  newVideo.setAttribute("autoplay", "true");
  newVideo.load();
  let isVideoUpdated = false;
  newVideo.addEventListener('canplaythrough', function(){
    if (isVideoUpdated) return;
    isVideoUpdated = true;

    // resize canvas to video size:
    _state.canvas.width = newVideo.videoWidth;
    _state.canvas.height = newVideo.videoHeight;

    newVideo.play();  
    WebARRocksFaceDebugHelper.update_video(newVideo).then(function(){
      _state.video = newVideo;
      _state.appState = _appStates.idle;
    });
  });
}


function play_video(){
  if (_state.appState !== _appStates.idle) return;
  _state.video.play();
}


function pause_video(){
  if (_state.appState !== _appStates.idle) return;
  _state.video.pause();
}


function toggle_stabilization(event){
  const isStabilized = event.target.checked;
  WebARRocksFaceDebugHelper.toggle_stabilization(isStabilized);
}


// entry point:
function main(){
  WebARRocksResizer.size_canvas({
    canvasId: 'WebARRocksFaceCanvas',
    callback: start
  })
}


window.addEventListener('load', main);