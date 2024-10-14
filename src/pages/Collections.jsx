import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar";
import './css files/Collections.css'
import { supabase } from "../supabase/supabaseClient";


const Collections = () => {

    const [categories, setCategories] = useState([])

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('Category').select('*');

        if (error) {
            console.log('Error in loading categories')
            console.log('Error')
        } else {
            const transformed_data = data.map(({ category_name, category_image }) => ({
                id: category_name,
                name: category_name,
                image: category_image,
                tag: 'category'
            }))
            setCategories((prevCategories) => [...prevCategories, transformed_data])
        }
    }

    const fetchAnime = async () => {
        const { data, error } = await supabase
            .from('Anime').select('*');

        if (error) {
            console.log('Error in loading categories')
            console.log('Error')
        } else {
            const transformed_data = data.map(({ anime_id, anime_name, anime_image }) => ({
                id: anime_id,
                name: anime_name,
                image: anime_image,
                tag: 'category'
            }))
            setCategories((prevCategories) => [...prevCategories, transformed_data])
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchAnime()
    })

    useEffect(()=>{
        console.log(categories)
    },[categories])
    return (
        <section className="collections-section">
            <Navbar></Navbar>
        </section>
    )
}

export default Collections;