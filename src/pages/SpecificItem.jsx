import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import './css files/SpecificItem.css'
import Loader from '../Components/Loader';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { BadgePercent, Gift, MessageCircleQuestion, Minus, Plus, RotateCw, Search, Share2, Truck } from 'lucide-react';
import SharePopUp from '../Components/SharePopUp';
import ProductCard from '../Components/ProductCard';
import ProductPopUp from '../Components/ProductPopUp';
import ImageViewer from '../Components/ImageViewer';

const SpecificItem = () => {
  const [productInfo, setProductInfo] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState(null)
  const [relatedAnimeProducts, setRelatedAnimeProducts] = useState(null)
  const [animeName, setAnimeName] = useState(null)
  const [image, setImage] = useState(null)
  const [images, setImages] = useState(null)
  const [count, setCount] = useState(1)
  const [share, setShare] = useState(false)
  const [content, setContent] = useState([])
  const [description, setDescription] = useState(true)
  const [modelOpen, setModelOpen] = useState(false)
  const [modelContent, setModelContent] = useState(null)
  const [imageViewer, setImageViewer] = useState(false)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const fetchRelatedProducts = async (category_id) => {
    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .eq('category_id', category_id)
      .neq('id', id)
      .limit(5)

    if (error) {
      console.log('Error in fetching related Products')
    } else {
      setRelatedProducts(data)
    }
  }

  const fetchAnimeRelatedProducts = async (anime_id) => {
    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .eq('anime_id', anime_id)
      .limit(5)

    if (error) {
      console.log('Error fetching similar anime products')
    } else {
      setRelatedAnimeProducts(data)
    }
  }

  const fetchAnimeName = async (anime_id) => {
    const { data, error } = await supabase
      .from('Anime')
      .select('anime_name')
      .eq('anime_id', anime_id)
      .single();

    if (error) {
      console.log('Error fetching anime name')
    } else {
      setAnimeName(data.anime_name)
    }
  }

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
      var desc = data.product_description.split('.')
      desc.pop();
      setContent(desc)
      fetchRelatedProducts(data.category_id, id)
      fetchAnimeName(data.anime_id, id)
      fetchAnimeRelatedProducts(data.anime_id)
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

  const handleDescriptionSwitch = (category) => {
    if (category === 1) {
      setDescription(true)
    } else if (category === 2) {
      setDescription(false)
    } else {
      return
    }
  }

  const fetchProduct = async (key) => {
    const {data, error} = await supabase
      .from('Products')
      .select('*')
      .eq('id',key)
      .single();

    if(error){
      console.log(error)
      setModelContent(null);
    } else {
      console.log(data);
      setModelContent(data);
    }
  }

  const openModal = async(key) => {
    const data = await fetchProduct(key);
    if(!data){
      setModelOpen(true);
    } else {
      console.log('error')
    }
  }

  const closeModal = () => {
    setModelOpen(false)
    setModelContent(null)
  }

  const openImageViewer = () => {
    setImageViewer(true)
  }

  const closeImageViewer = () => {
    setImageViewer(false)
  }

  useEffect(() => {
    fetchSpecific()
  }, [id])

  useEffect(() => {
    console.log(relatedProducts)
  }, [relatedProducts])

  useEffect(() => {
    if (share || modelOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [share, modelOpen])

  return (
    <section className='Specific-Product-Page'>
      <Navbar />
      <section className='Product-Information'>
        {productInfo === false ? <div className='loader-holder'><Loader /></div> :
          <>
            <div className='image-and-info'>
              <div className='image-showcase'>
                <div className='image-options'>
                  {images.map(pic => <div onClick={() => handleImageChange(pic)}><img src={pic} /></div>)}
                </div>
                <div className='image-main'>
                  <div className='magnifying-icon-holder' onClick={()=>openImageViewer()}><Search className='magnifying-icon'/></div>
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
                  <div className='option' onClick={() => handleOpenModal()}><Share2 /> Share</div>
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

            <div className='delivery-and-shipping'>
              <div className='tabs'>
                <div className={`tab-header ${description ? 'active' : ''}`} onClick={() => handleDescriptionSwitch(1)}>Product Description</div>
                <div className={`tab-header ${!description ? 'active' : ''}`} onClick={() => handleDescriptionSwitch(2)}>Shipping and Return</div>
              </div>
              <div className='content'>
                {description ?
                  <div className='description-content'>
                    {content.map(text => <li className='description-points'>{text}</li>)}
                  </div> :
                  <div className='policy-content'>
                    <li className="description-points">We try our best to ship goods to you as soon as possible. Most of our products are made to order and the delivery timeline is 3 to 10 days or otherwise as mentioned for the product.</li>
                    <li className="description-points">Shipping within India is FREE for all orders above ₹395. For orders below that, we charge according to standard delivery charges of our courier partners.</li>
                    <li className="description-points">Please read our shipping policy here.</li>
                  </div>
                }
              </div>
            </div>

            {relatedProducts && relatedProducts.length > 0 && (
              <div className='Also-like-section'>
                <div className='heading'>You Might Also Like</div>
                <div className='product-card-container'>
                  {relatedProducts.map(product =>
                    <ProductCard
                      product_id={product.id}
                      name={product['product_name']}
                      images={product['product_image']}
                      original_price={product['original_price']}
                      discounted_price={product['discounted_price']}
                      onOpenModal={openModal}
                    />
                  )}
                </div>
                <div className="shop-for-more">
                  <div className="button">Shop for More</div>
                </div>
              </div>
            )}

            {relatedAnimeProducts && relatedAnimeProducts.length > 0 && (
              <div className='Also-like-section'>
                <div className='heading'>Shop More from {animeName}</div>
                <div className='product-card-container'>
                  {relatedAnimeProducts.map(product =>
                    <ProductCard
                      product_id={product.id}
                      name={product['product_name']}
                      images={product['product_image']}
                      original_price={product['original_price']}
                      discounted_price={product['discounted_price']}
                      onOpenModal={openModal}
                    />
                  )}
                </div>
                <div className="shop-for-more">
                  <div className="button">Shop for More</div>
                </div>
              </div>
            )}
          </>
        }
      </section>
      {share && <SharePopUp closeModal={handleCloseModal} />}
      {modelOpen && <ProductPopUp modelOpen={modelOpen} modelContent={modelContent} closeModal={closeModal}/>}
      {imageViewer && <ImageViewer images={images} closeImageViewer = {closeImageViewer}/>}
    </section>
  )
}

export default SpecificItem