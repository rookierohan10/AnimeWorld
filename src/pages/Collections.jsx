import React from "react";
import Navbar from "../Components/Navbar";
import './css files/Collections.css'
import { supabase } from "../supabase/supabaseClient";

const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('Category').select().order('category_name').limit(10);
}

const Collections = () => {
    return (
        <section className="collections-section">
            <Navbar></Navbar>
        </section>
    )
}

export default Collections;