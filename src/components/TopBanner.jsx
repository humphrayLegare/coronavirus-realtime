import React from 'react'
import {useState, useEffect} from 'react'
import { Divider } from '@material-ui/core'


function TopBanner(props){

  const [time, setTime] = useState(new Date())
  
  const tick = () => {
    const date = new Date()
    setTime(date)
  }


  useEffect(() => {
    const timerId = setInterval(()=>{
        tick();
      }, 1000)
  }, [])

  return (
    <div className="">
        <h1>Coronavirus Realtime</h1>
        {time.toUTCString()}
    </div>
  )



}

export default TopBanner