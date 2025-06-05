
import { useRef, useContext, useState, useEffect } from 'react';
import Video from '../../widgets/video/video';
import videojs from 'video.js';
import Header from '../../widgets/header/ui/header';
import { authContext } from '../../shared/contexts/AuthContext';
import styles from './VideoPage.module.scss'
import classNames from 'classnames';

const VideoPage = () => {
  //@ts-ignore
  // const {setAuthData, auth} = useContext(authContext);

  const playerRef = useRef(null);

  const videoUrl = window.localStorage.getItem('videoUrl')

  //@ts-ignore
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  interface comment{
    id: number,
    time: number,
    author: number,
    text: string,
    isNew: boolean
  }

  const [clickedComment, setClickedComment] = useState<number>(-1)

  const [comments, setComments] = useState<comment[]>([
        {id: 0, time: 5, author: 1, text: 'testing comment', isNew: false},
        {id: 1, time: 15, author: 2, text: 'testing comment_2', isNew: false}, 
    ])
  
  const [keyForRender, setKeyForRender] = useState<number>(0)

  const [newComment, setNewComment] = useState<comment>({
    id: -10,
    time: 0,
    author: -10,
    text: '',
    isNew: true
  }) 

  

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: false,
    height: 600,
    width: 300,
    sources: [{
      src: videoUrl,
      //src: '/shared/video/olen.mp4',
      type: 'video/mp4'
    }],
    time: newComment.time
  };

  let video = document.getElementsByTagName('video')
  if (video[0] !== undefined){
    video[0].addEventListener("pause", (event) => {
        let time = video[0].currentTime
        createNewComment(time)
        setClickedComment(-1)
      });
  }

  function createNewComment(time: number){
        let newComment: comment = {
            id: -10,
            time: time,
            author: getUser(),
            text: '',
            isNew: true
        }
        setNewComment(newComment)
  }

  function getUser(){
    return 10
  }

  function getStringTime(time: number | undefined){
    if (time !== undefined){
        let min = Math.floor(time / 60);
        let strMin = min<10 ? `0${min}` : `${min}`
        let sec = time - min*60
        let strSec = sec<10 ? `0${sec}` : `${sec}`
        return `${strMin}:${strSec}`
    }
    return `--:--`
  }

  function toClickComment(item: comment){
    setClickedComment(item.id)
    setNewComment({
      id: newComment.id,
      time: item.time,
      author: newComment.author,
      text: newComment.text,
      isNew: newComment.isNew
    })
  }

  function saveComment(){
    let text = document.getElementsByTagName('textarea')
    let array = comments
    array.push(newComment)
    setComments(array)
    setKeyForRender(comments.length)
  }
  
  return (
    <>
        <Header
            supportMsg={'Контакты технической поддержки: help@prodimex-agro.ru +7-473-206-56-03 с 8:00 до 20:00, пн.-вс'}
            downloadApp={true}
            iconExit={true}
            // email={auth.data}
            email={''}
          />
          <div className={styles.wrapper}>
            <div style={{display: 'flex', height: '85vh', alignItems: 'center'}}>
                <div style={{width: '500px', display: 'flex', justifyContent: 'center'}}><Video options={videoJsOptions} onReady={handlePlayerReady} /></div>
            </div>
            <div className={styles.commentsWrapper}>
                <div className={styles.comments} key={keyForRender}>
                    {comments.map((item, index)=>{
                        return (
                            <div key={index} className={classNames(styles.commet, item.id===clickedComment ? styles.clickedComment : '')}>
                                <div className={styles.text}>
                                    {item.text}
                                </div>
                                <div className={styles.footer}>
                                    <div className={styles.time} onClick={()=>{toClickComment(item)}}>{getStringTime(item.time)}</div>
                                    <div>{`Author${item.author}`}</div>
                                </div>
                            </div>
                        )
                        
                    })}
                </div>
                <div className={classNames(styles.newCommet)}>
                    <div className={styles.text}>
                    <textarea rows={6} cols={62} name="" id=""></textarea>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.time}>{getStringTime(newComment?.time)}</div>
                        <button className={styles.btn_send} onClick={()=>{saveComment()}}></button>
                    </div>
                </div>
            </div>
          </div>
        
    </>
  )
}

export default VideoPage
