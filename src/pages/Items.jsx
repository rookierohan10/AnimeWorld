import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Items = () => {
  const location = useLocation()

  useEffect(()=>{
    console.log(location.state)
  },[])

  return (
    <div>Items</div>
  )
}

export default Items