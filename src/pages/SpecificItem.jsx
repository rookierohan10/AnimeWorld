import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import './css files/SpecificItem.css'
import Loader from '../Components/Loader';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';

const SpecificItem = () => {
  const [productInfo, setProductInfo] = useState(false);
  const [image, setImage] = useState(null)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  var {image1, image2} = {image1: null, image2: null}

  const fetchSpecific = async () => {
    const {data, error} = await supabase
      .from('Products')
      .select('*')
      .eq('id',id)
      .single();

    if(error) {
      console.log('Error loading Product Info')
    } else {
      setProductInfo(true)
    }
  }

  useEffect(() => {
    fetchSpecific()
  },[id])

  useEffect(() => {
    const {image1, image2} = productInfo.product_image
  },[productInfo])

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