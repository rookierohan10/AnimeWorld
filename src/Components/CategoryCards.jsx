import React, { useState } from 'react'
import './css files/CategoryCard.css'
import { Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryCards = (props) => {
  const { key, name, image, tag } = props;
  const [category_image, setCategoryImage] = useState(true)
  const navigate = useNavigate()

  const handleCategoryClick = () => {
    navigate('/items', { state: { category: tag, item: name}})
  }

  return (
    <div className='category-card'>
      <div className='category-image' onClick={()=>handleCategoryClick(tag)}>
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