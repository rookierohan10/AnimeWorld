import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar";
import Loader from "../Components/Loader"
import './css files/Collections.css'
import { supabase } from "../supabase/supabaseClient";
import CategoryCards from '../Components/CategoryCards';


const Collections = () => {

    const [categories, setCategories] = useState([])
    const [loading, isLoading] = useState(false)

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('Category').select('*');

        if (error) {
            console.log('Error in loading categories')
            console.log('Error')
        } else {
            return data.map(({ category_name, category_image }) => ({
                id: category_name,
                name: category_name,
                image: category_image,
                tag: 'category'
            }))
        }
    }

    const fetchAnime = async () => {
        const { data, error } = await supabase
            .from('Anime').select('*');

        if (error) {
            console.log('Error in loading categories')
            console.log('Error')
        } else {
            return data.map(({ anime_id, anime_name, anime_image }) => ({
                id: anime_id,
                name: anime_name,
                image: anime_image,
                tag: 'category'
            }))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const categories = await fetchCategories()
            const anime = await fetchAnime()

            setCategories([...categories, ...anime])
        }

        fetchData()
    }, [])

    useEffect(() => {
        console.log(categories)
    }, [categories])
    return (
        <section className="collections-section">
            <Navbar></Navbar>
            <div className='categories-div'>
                {!isLoading ?
                    <div className='loader-div'>
                        <Loader></Loader>
                    </div>
                    :
                    <div className='categories-container'>
                        <div className='categories-header'>Categories</div>
                        <div className='categories'>
                            {categories.map(category => 
                                <CategoryCards
                                    key={category.id}
                                    id={category.id}
                                    name={category.name}
                                    image={category.image}
                                />
                            )}
                        </div>
                    </div>}
            </div>
        </section>
    )
}

export default Collections;