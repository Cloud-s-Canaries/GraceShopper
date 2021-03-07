import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'

export default function RandomVideo() {
  const [videos, getVideoList] = useState([])
  useEffect(() => {
    getVideoList()
  }, [])

  const getList = async () => {
    const {data} = await axios.get('/api/media/videos')
    console.log('veeeds', data)
    getVideoList(data)
  }
  return (
    <div>
      <video autoPlay loop muted={false} className="home-video">
        <source src={videos[0]} />
      </video>
    </div>
  )
}
