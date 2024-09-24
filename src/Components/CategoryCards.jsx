import React from 'react'
import './css files/CategoryCard.css'

const CategoryCards = (props) => {
  const {key, name, image} = props;
  return (
    <div className='category-card'>
        <div className='category-image'>
            <img src={image}></img>
        </div>
        <div className='category-name'>{name}</div>
    </div>
  )
}

export default CategoryCards