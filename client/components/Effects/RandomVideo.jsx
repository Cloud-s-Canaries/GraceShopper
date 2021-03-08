import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'

export default function RandomVideo() {
  const [videos, getVideoList] = useState([])

  const messages = ['Premium Vines \n Coming Soon', 'Better than cat videos']

  let videoTubelight = messages[Math.floor(Math.random() * messages.length)]

  useEffect(() => {
    async function fetchVidList() {
      const {data} = await axios.get('/api/media/videos')
      //console.log(`DATA`, data)
      getVideoList(data)
      return data
    }
    fetchVidList()
  }, [])
  console.log(`VIDEOS`, videos.join(''))
  const getList = async () => {
    const {data} = await axios.get('/api/media/videos')
    console.log('veeeds', data)
    getVideoList(data)
  }

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
