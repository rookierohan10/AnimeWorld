import React from 'react'
import './css files/ProductPopUp.css'

const ProductPopUp = (props) => {
  const {openModel, modelContent, closeContent} = props
  const {image1, image2} = modelContent.product_image
  console.log(modelContent)
  return (
    <div className='ProductPopUp'>
      <div className='imageContainer'>
        <div className='imageHolder'>
          <img src={image1} alt={modelContent.product_name}/>
        </div>
      </div>
      <div className='infoContainer'>Info Container</div>
    </div>
  )
}

export default ProductPopUp