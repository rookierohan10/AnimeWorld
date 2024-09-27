import React, { useEffect, useState } from 'react'
import './css files/ProductPopUp.css'
import { ChevronLeft, ChevronRight, X, Plus, Minus } from 'lucide-react'

const ProductPopUp = (props) => {
  const { openModel, modelContent, closeContent } = props
  const [count, setCount] = useState(1)
  const { image1, image2 } = modelContent.product_image
  const [image, setImage] = useState(image1);

  const description = modelContent.product_description.substring(0, modelContent.product_description.indexOf('.'))
  console.log(modelContent.product_description)
  const stock = 15

  useEffect(() => {
    setImage(image1);
  }, [image1]);


  const handleClick = () => {
    if (image === image1) {
      setImage(image2)
    } else {
      setImage(image1)
    }
  }

  const handleAmountDecrease = () => {
    console.log('clicked: decrease')
    if(count > 1){
      setCount(count - 1)
    }
  }

  const handleAmountIncrease = () => {
    console.log('clicked: increase')
    if(count < stock){
      setCount(count + 1)
    }
  }

  return (
    <div className='ProductPopUpOverlay'>
      <div className='ProductPopUp'>
        <div className='cross-mark-container'><X className='cross-mark' /></div>
        <div className='imageContainer'>
          <div className='imageHolder'>
            {image2 && <div className='left-button' onClick={() => handleClick()}> <ChevronLeft color='white' /> </div>}
            {image2 && <div className='right-button' onClick={() => handleClick()}> <ChevronRight color='white' /> </div>}
            <img src={image} alt={modelContent.product_name} />
          </div>
        </div>
        <div className='infoContainer'>
          <div className='product-name'>{modelContent.product_name}</div>
          <div className='Price'>
            <div className='discounted-price'>₹ {modelContent.discounted_price}.00</div>
            <div className='original-price'>{modelContent.original_price}.00</div>
            <div className='sale-tag'>SALE</div>
          </div>
          <div className='product-description'>{description}...<span style={{ color: "blue", textDecoration: "underline" }}>View details</span></div>
          {stock === 0 ? <div style={{ color: "red" }}>Out of Stock</div> :
            <div
              style={{
                color: stock <= 5 ? 'yellowgreen' : 'green'
              }}>
              <li>{stock} in stock</li>
            </div>
          }
          <div className='Add-to-Cart'>
            <div className='counter'>
              <button className='buttons' onClick={()=>handleAmountDecrease()}>
                <Minus size={18} ></Minus>
              </button>
              <div className='buttons number' >{count}</div>
              <button className='buttons' onClick={()=>handleAmountIncrease()}>
                <Plus size={18} ></Plus>
              </button>
            </div>
            <button className='Add-to-Cart-Button'>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPopUp