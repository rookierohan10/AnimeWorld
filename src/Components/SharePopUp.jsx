import React, { useEffect, useState } from 'react'
import './css files/SharePopUp.css'
import { useLocation } from 'react-router-dom'

const SharePopUp = () => {

    const location = useLocation();
    const currentUrl = `${window.location.origin}${location.pathname}${location.search}`

    return (
    <section className='Share-popup'>
        <div className='share-div'>
            <div className='copy-link'>
                <div className='heading'>Copy Link</div>
                <div className='link'></div>
            </div>
            <div className='other-sharing'></div>
        </div>
    </section>
  )
}

export default SharePopUp