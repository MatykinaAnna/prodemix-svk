import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


const Video = (props) => {

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);  
    const {options, onReady} = props;

    useEffect(()=>{
      if (!playerRef.current) {
        const videoElement = document.createElement("video-js");
        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current.appendChild(videoElement);

        const player = playerRef.current = videojs(videoElement, options, () => {
          videojs.log('player is ready');
          onReady && onReady(player);
        });
      } else {
        console.log(options.sources)
        const player = playerRef.current;
        player.autoplay(options.autoplay);
        player.src(options.sources);
        player.currentTime(options.time)
      }

    }, [options, videoRef])

    useEffect(() => {
      const player = playerRef.current;
  
      return () => {
        if (player && !player.isDisposed()) {
          player.dispose();
          playerRef.current = null;
        }
      };
    }, [playerRef])

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
      {/* <div ref={'./video.mp4'} /> */}
    </div>
  )
}

export default Video
