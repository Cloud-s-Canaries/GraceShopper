import axios from 'axios'

//Action Types
const GET_VIDEOS = 'GET_VIDEOS'

//Action Creators
const getVideos = videos => {
  return {
    type: GET_VIDEOS,
    videos
  }
}

//Thunk Creators
export const getVideosThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/media/videos`)
      dispatch(getVideos(data))
      return data
    } catch (error) {
      console.log(error)
    }
  }
}

const initState = []

export default function(state = initState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return action.videos
    default:
      return state
  }
}
