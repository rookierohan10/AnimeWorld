import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import './css files/SpecificItem.css'
import Loader from '../Components/Loader';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { BadgePercent, Gift, MessageCircleQuestion, Minus, Plus, RotateCw, Share2, Truck } from 'lucide-react';
import SharePopUp from '../Components/SharePopUp';

const SpecificItem = () => {
  const [productInfo, setProductInfo] = useState(false);
  const [image, setImage] = useState(null)
  const [images, setImages] = useState(null)
  const [count, setCount] = useState(1)
  const [share, setShare] = useState(false) 
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

  const handleOpenModal = () => {
    setShare(true)
  }

  const handleCloseModal = () => {
    setShare(false)
  }

  useEffect(() => {
    fetchSpecific()
  }, [id])

  useEffect(()=>{
    if(share){
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  },[share])

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
                  <div className='price-details' style={{ display: "flex", alignItems: "center", columnGap: "2%" }}>
                    <div className='discounted-price'>₹ {productInfo.discounted_price}.00</div>
                    <div className='original-price'>{productInfo.original_price}.00</div>
                    <div className='sale-tag' style={{ height: "100%" }}>SALE</div>
                  </div>
                  <div className='tax-tag'>Tax Included</div>
                </div>
                <div className='buying-options'>
                  <div className='cart-options'>
                    <div className='quantity'>
                      <div className='quantity-buttons'><Plus /></div>
                      <div className='quantity-buttons' >{count}</div>
                      <div className='quantity-buttons'><Minus /></div>
                    </div>
                    <div className='add-to-cart'>Add to Cart</div>
                  </div>
                  <div className='buy-now'>Buy Now</div>
                </div>
                <div className='add'>
                  <div className='pointers'><RotateCw className='rotate' />Easy Returns and Exchanges.</div>
                  <div className='pointers'><Gift />Free Shipping above ₹399.00</div>
                  <div className='pointers'><Truck />Fast shipping across India.</div>
                </div>
                <div className='querying-options'>
                  <div className='option'><MessageCircleQuestion /> Ask a question</div>
                  <div className='option' onClick={()=>handleOpenModal()}><Share2 /> Share</div>
                </div>
                <div className='offers'>
                  <div className='offer-template'>
                    <div className='discount-percentage'><BadgePercent /> 10% OFF</div>
                    <div className='discount-condition'>Minimum Cart Value ₹ 999/-</div>
                  </div>
                  <div className='offer-template'>
                    <div className='discount-percentage'><BadgePercent /> 15% OFF</div>
                    <div className='discount-condition'>Minimum Cart Value ₹ 1789/-</div>
                  </div>
                  <div className='offer-template'>
                    <div className='discount-percentage'><BadgePercent /> 25% OFF</div>
                    <div className='discount-condition'>Minimum Cart Value ₹ 2899/-</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='description'>

            </div>

            <div className='share-popup'>

            </div>
          </>
        }
      </section>
      {share && <SharePopUp closeModal={handleCloseModal}/> }
    </section>
  )
}

export default SpecificItem