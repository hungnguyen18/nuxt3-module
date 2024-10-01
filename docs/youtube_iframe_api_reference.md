# Requirements

Reference: `https://developers.google.com/youtube/iframe_api_reference#Requirements`

The user's browser must support the HTML5 postMessage feature. Most modern browsers support postMessage.

Embedded players must have a viewport that is at least 200px by 200px. If the player displays controls, it must be large enough to fully display the controls without shrinking the viewport below the minimum size. We recommend 16:9 players be at least 480 pixels wide and 270 pixels tall.

# Getting started

HTML:

```html
<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<div id="player"></div>
```

Script:

```javascript
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script')

tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        //'https://www.youtube.com/embed/NSKxvLWqyOY',
        // So, 'NSKxvLWqyOY' is our videoId
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    })
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo()
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000)
        done = true
    }
}
function stopVideo() {
    player.stopVideo()
}
```

# Loading a video player

After the API's JavaScript code loads, the API will call the onYouTubeIframeAPIReady function, at which point you can construct a YT. Player object to insert a video player on your page. The HTML excerpt below shows the onYouTubeIframeAPIReady function from the example above:

```javascript
var player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            playsinline: 1,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    })
}
```

<div style="line-height:2">
The second parameter is an object that specifies player options. The object contains the following properties:
<ul style="display: flex; flex-direction: column; gap:15px">
  <li><div style="display:inline-block; background-color: #161b22; padding: 4px 12px; border-radius: 4px">width (number)</div> – The width of the video player. The default value is 640.</li>
  <li><div style="display:inline-block; background-color: #161b22; padding: 4px 12px; border-radius: 4px">height (number)</div> – The height of the video player. The default value is 390.</li>
  <li><div style="display:inline-block; background-color: #161b22; padding: 4px 12px; border-radius: 4px">videoId (string)</div> – The YouTube video ID that identifies the video that the player will load.</li>
  <li><div style="display:inline-block; background-color: #161b22; padding: 4px 12px; border-radius: 4px">playerVars (object)</div> – The object's properties identify player parameters that can be used to customize the player.</li>
  <li>
    <div style="display:inline-block; background-color: #161b22; padding: 4px 12px; border-radius: 4px">events (object)</div> – The object's properties identify the events that the API fires and the functions (event listeners)
    that the API will call when those events occur. In the example, the constructor indicates that the onPlayerReady
    function will execute when the onReady event fires and that the onPlayerStateChange function will execute
    when the onStateChange event fires.
  </li>
</ul>
<div>

# Playback controls and player settings

<div style="font-weight:500; font-size:20px" >Playing a video</div>
<div style="background-color: #161b22; padding: 4px 12px; border-radius: 4px">player.playVideo():Void</div>
<div style="padding: 20px 40px">
  Plays the currently cued/loaded video. The final player state after this function executes will be playing (1).
  
  Note: A playback only counts toward a video's official view count if it is initiated via a native play button in the player.
  player.pauseVideo():Void
</div>

Pauses the currently playing video. The final player state after this function executes will be paused (2) unless the player is in the ended (0) state when the function is called, in which case the player state will not change.
player.stopVideo():Void
Stops and cancels loading of the current video. This function should be reserved for rare situations when you know that the user will not be watching additional video in the player. If your intent is to pause the video, you should just call the pauseVideo function. If you want to change the video that the player is playing, you can call one of the queueing functions without calling stopVideo first.

Important: Unlike the pauseVideo function, which leaves the player in the paused (2) state, the stopVideo function could put the player into any not-playing state, including ended (0), paused (2), video cued (5) or unstarted (-1).
player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void
Seeks to a specified time in the video. If the player is paused when the function is called, it will remain paused. If the function is called from another state (playing, video cued, etc.), the player will play the video.
The seconds parameter identifies the time to which the player should advance.

The player will advance to the closest keyframe before that time unless the player has already downloaded the portion of the video to which the user is seeking.

The allowSeekAhead parameter determines whether the player will make a new request to the server if the seconds parameter specifies a time outside of the currently buffered video data.

We recommend that you set this parameter to false while the user drags the mouse along a video progress bar and then set it to true when the user releases the mouse. This approach lets a user scroll to different points of a video without requesting new video streams by scrolling past unbuffered points in the video. When the user releases the mouse button, the player advances to the desired point in the video and requests a new video stream if necessary.
