import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Loader from '../Components/Loader'
import './css files/Items.css'
import { Grip, LayoutGrid, Menu } from 'lucide-react'

const Items = () => {
  const location = useLocation()
  const {category, item} = location.state
  const [loading, isLoading] = useState(false)

  useEffect(()=>{
    console.log(category)
    console.log(item)
    console.log(loading)
  },[])

  return (
    <section className='items-section'>
      <Navbar />
      <div className='items-div'>
        {loading ? 
          <div className='loader-div'>
            <Loader />
          </div>
          :
          <div className='items-container'>
            <div className='layout-organizer'>
              <Menu className='layout-icons' />
              <LayoutGrid className='layout-icons' />
              <Grip className='layout-icons' />
            </div>
          </div>
          }
      </div>
    </section>
  )
}

export default Items