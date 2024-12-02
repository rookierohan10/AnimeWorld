import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const LoginRoute = ({ children }) => {
    console.log(children)
    const [loading, setLoading] = useState(true);
    const [authenticated, isAuthenticated] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async() => {
            const { data } = await supabase.auth.getSession()
            isAuthenticated(data?.user ? true:false );
            setLoading(false)
        };

        checkAuth();
    },[])

    return authenticated ? <>{children}</> : navigate('/login')
}

export default LoginRoute;