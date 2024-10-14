import React, { useState } from 'react'
import './css files/CategoryCard.css'
import { Gift } from 'lucide-react';

const CategoryCards = (props) => {
  const { key, name, image } = props;
  const [category_image, setCategoryImage] = useState(true)
  return (
    <div className='category-card'>
      <div className='category-image'>
        {image ?
          <img
            src={image}
            onError={() => setCategoryImage(false)}
          /> :
          <Gift />
        }
      </div>
      <div className='category-name'>{name}</div>
    </div>
  )
}

export default CategoryCards