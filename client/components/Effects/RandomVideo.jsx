import React from 'react'

function RandomVideo() {
  //const [videos, setVideoList] = useState([])
  const videos = ['../videos/goatsaysyeah.mp4']

  const messages = ['Better than cat videos!', 'Premium vines coming soon!']

  let randomMessage = messages[Math.floor(Math.random() * messages.length)]

  let randomVideo = videos[Math.floor(Math.random() * videos.length)]

  return (
    <div className="home-video-cont">
      <div className="randomvid-sign">{randomMessage}</div>
      <div className="actual-video-cont">
        <div className="vidtext-cont">
          <div className="randomvid-text"> </div>
        </div>
        <video autoPlay loop muted className="home-video">
          <source src={randomVideo} />
        </video>
      </div>
    </div>
  )
}

export default RandomVideo
