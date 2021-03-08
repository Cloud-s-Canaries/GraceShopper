import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {getVideosThunk} from '../../store/media'

export function RandomVideo({loadVideos, loadedVids}) {
  const [videos, setVideoList] = useState([])

  const messages = ['Premium Vines \n Coming Soon', 'Better than cat videos']

  let videoTubelight = messages[Math.floor(Math.random() * messages.length)]

  // useEffect(() => {}, [])
  // console.log(`OUR VIDEOS`, videos)
  // const getList = async () => {
  //   const {data} = await axios.get('/api/media/videos')
  //   console.log('veeeds', data)
  //   getVideoList(data)
  // }
  console.log(`Videos, BEFORE!!!!`, videos)
  useEffect(() => {
    loadVideos().then(vids => {
      setVideoList(vids)
    })
  }, [])
  console.log(`Video!!!!`, videos)

  if (videos.length) {
    let randomOne = Math.floor(Math.random() * videos.length)

    return (
      <div className="home-video-cont">
        <br className="spaceit" />
        <div className="randomvid-sign">{videoTubelight}</div>
        <div className="actual-video-cont">
          <div className="vidtext-cont">
            <div className="randomvid-text"> </div>
          </div>
          <video autoPlay loop muted className="home-video">
            <source src={videos[randomOne]} />
          </video>
        </div>
      </div>
    )
  } else {
    return <div> Hah! Gotteeem </div>
  }
}

const mapState = state => {
  return {
    loadedVids: state.media
  }
}

const mapDispatch = dispatch => {
  return {
    loadVideos: () => dispatch(getVideosThunk())
  }
}

export default connect(mapState, mapDispatch)(RandomVideo)
