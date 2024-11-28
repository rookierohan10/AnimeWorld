import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Loader from '../Components/Loader'
import './css files/Items.css'
import { Grip, LayoutGrid, Menu, Search } from 'lucide-react'
import { supabase } from '../supabase/supabaseClient'

const Items = () => {
  const location = useLocation()
  const { category, item } = location.state
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(null)

  const totalProducts = async () => {
    const { data, error, count } = await supabase
      .from('Products').select('*', { count: 'exact' });

    if (error) {
      console.log('Error counting total products')
      throw error
    } else {
      setCount(count)
      return count
    }
  }

  useEffect(() => {
    console.log(category)
    console.log(item)
    console.log(loading)

    const fetchAPIs = async () => {
      try {
        const [result1] = await Promise.all([totalProducts()])
        console.log(result1)
        setLoading(false)
      } catch (err) {
        console.log('I am here')
        console.error('Error during Supabase execution:', err);
      }
    }

    fetchAPIs()
  }, [])

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
            <div className='search-field'>
              <input className='input-field' type="text" name="product-name" placeholder={`Search across ${count} products...`} />
              <Search className='search-button' />
            </div>
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