import React, { useEffect, useState } from 'react'
import './Home.css'
import CategoryCards from '../Components/CategoryCards';
import { supabase } from '../supabase/supabaseClient';
import ProductCard from '../Components/ProductCard';
import QuickViewPopup from '../Components/QuickViewPopup';
import Navbar from '../Components/Navbar';


const Home = () => {

  const [categories, setCategories] = useState([]);
  const [anime, setAnime] = useState([]);
  const [currentAnime, setCurrentAnime] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchAnime();
    fetchSpecificProducts();
  }, []);

  useEffect(() => {
    if (anime.length > 0) {
      setCurrentAnime(anime[0]["anime_name"]);
    }
  }, [anime])

  useEffect(() => {
    fetchSpecificProducts();
  }, [currentAnime])

  const fetchCategories = async () => {
    const { data: categories, error } = await supabase
      .from('Category').select().order('category_name').limit(10);

    if (error) {
      console.error('Error fetching categories: ', error);
      setError(error);
      setCategories([]);
    } else {
      setError(null);
      setCategories(categories);
    }
  }

  const fetchAnime = async () => {
    const { data: animelist, error } = await supabase
      .from('Anime').select('*').order('anime_name');

    if (error) {
      console.error('Error fetching anime: ', error);
      setError(error);
      setAnime([]);
    } else {
      setError(null);
      setCurrentAnime(animelist[0]["anime_name"]);
      setAnime(animelist)
    }
  }

  const fetchSpecificProducts = async () => {
    // const{data, error} = await supabase
    //   .from('Products')
    //   .select(`
    //     *,
    //     Anime(anime_id, anime_name)
    //   `)
    //   .eq('Anime.anime_name',currentAnime).limit(10)

    const { data, error } = await supabase
      .rpc('get_products_by_anime', { name: currentAnime });

    if (error) {
      console.error('Error fetching products: ', error);
      setError(error);
      setProducts([])
    } else {
      setError(null)
      setProducts(data)
      console.log(data);
    }
  }

  const handleDropdown = () => {
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('active');
  }

  const handleAnimeChange = (anime_name, event) => {
    event.stopPropagation();
    console.log(anime_name);
    setCurrentAnime(anime_name);
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.remove('active');
  }

  return (
    <section className='home-section'>
    <Navbar />
      <div className='hero-section'>
        <div className='name'>AnimeWorld</div>
        <div className='tag-line'>One place for all your anime collections</div>
        <div className='search-box'>
          <input type='text' className='icon-search' />
          <div className='search-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg></div>
        </div>
      </div>
      <div className='shop-by-categories'>
        <div className='categories-header'>Shop by Categories</div>
        <div className='category-card-container'>
          {categories.map(category =>
            <CategoryCards
              key={category.category_id}
              id={category.category_id}
              name={category.category_name}
              image={category.category_image}
            />)}
        </div>
      </div>
      <div className='shop-by-series-name'>
        <div className='series-header'>Shop faster by selecting anime series</div>
        <div className='series-name'>Anime Name is &nbsp;
          <div className='series-dropdown-text' id='dropdown-text' onClick={handleDropdown}>
            {currentAnime}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
            <div className='dropdown-content' id='dropdown'>
              {anime.map(anime => {
                return <div key={anime["anime id"]} onClick={(event) => handleAnimeChange(anime['anime_name'], event)}>{anime["anime_name"]}</div>
              })}
            </div></div>
        </div>
        <div className='item-card-container'></div>
      </div>
      <div className='anime-products'>
        <div className='product-card-container'>
          {products.map(product =>
            <ProductCard
              product_id={product.id}
              name={product['product_name']}
              images={product['product_image']}
              original_price={product['original_price']}
              discounted_price={product['discounted_price']}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Home