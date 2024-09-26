import React, { useEffect, useState } from 'react'
import './css files/ProductPopUp.css'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const ProductPopUp = (props) => {
  const {openModel, modelContent, closeContent} = props
  const {image1, image2} = modelContent.product_image
  const [image, setImage] = useState(image1);

  useEffect(()=>{
    setImage(image1);
  },[image1]);


  const handleClick = () =>{
    console.log('clicked')
    if(image === image1) {
      setImage(image2)
    } else {
      setImage(image1)
    }
  }

  return (
    <div className='ProductPopUp'>
      <div className='cross-mark'><X/></div>
      <div className='imageContainer'>
        <div className='imageHolder'>
          {image2 && <div className='left-button' onClick={() => handleClick()}> <ChevronLeft color='white'/> </div>}
          {image2 && <div className='right-button' onClick={() => handleClick()}> <ChevronRight color='white'/> </div>}
          <img src={image} alt={modelContent.product_name}/>
        </div>
      </div>
      <div className='infoContainer'>
        <div className='product-name'></div>
        <div></div>
      </div>
    </div>
  )
}

export default ProductPopUp