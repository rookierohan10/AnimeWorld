import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import './css files/SpecificItem.css'
import Loader from '../Components/Loader';

const SpecificItem = () => {
  const [productInfo, setProductInfo] = useState(false);

  const fetchSpecific = () => {
    
  }

  return (
    <section className='Specific-Product-Page'>
      <Navbar />
      <section className='Product-Information'>
        {productInfo === false ? <Loader /> :
          <>
            <div className='image-and-info'>
              <div className='image-showcase'>

              </div>
              <div className='product-showcase'>

              </div>
            </div>
            <div className='description'>

            </div>
          </>

        }
      </section>
    </section>
  )
}

export default SpecificItem