import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import './css files/SpecificItem.css'
import Loader from '../Components/Loader';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { Gift, RotateCw, Truck } from 'lucide-react';

const SpecificItem = () => {
  const [productInfo, setProductInfo] = useState(false);
  const [image, setImage] = useState(null)
  const [images, setImages] = useState(null)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const fetchSpecific = async () => {
    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.log('Error loading Product Info')
    } else {
      setImage(data.product_image.image1)
      setImages(Object.values(data.product_image))
      setProductInfo(data)
    }
  }

  const handleImageChange = (pic) => {
    setImage(pic)
  }

  useEffect(() => {
    fetchSpecific()
  }, [id])

  return (
    <section className='Specific-Product-Page'>
      <Navbar />
      <section className='Product-Information'>
        {productInfo === false ? <Loader /> :
          <>
            <div className='image-and-info'>
              <div className='image-showcase'>
                <div className='image-options'>
                  {images.map(pic => <div onClick={() => handleImageChange(pic)}><img src={pic} /></div>)}
                </div>
                <div className='image-main'>
                  <img src={image}></img>
                </div>
              </div>
              <div className='product-showcase'>
                <div className='product-name'>{productInfo.product_name}</div>
                <div className='price-info'>
                  <div>
                    <div className='discounted-price'>{productInfo.discounted_price}</div>
                    <div className='original-price'>{productInfo.original_price}</div>
                    <div className='sale-tag'>SALE</div>
                  </div>
                  <div className='tax-tag'>Tax Included</div>
                </div>
                <div className='add'>
                  <div className='pointers'><RotateCw />Easy Returns and Exchanges.</div>
                  <div className='pointers'><Gift />Free Shipping above ₹399.00</div>
                  <div className='pointers'><Truck />Fast shipping across India.</div>
                </div>
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