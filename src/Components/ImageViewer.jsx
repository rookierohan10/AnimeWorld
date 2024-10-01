import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import './css files/ImageViewer.css'

const ImageViewer = (props) => {

    const { images, closeImageViewer } = props;
    const [counter, setCounter] = useState(0)

    console.log(images)

    return (
        <div className="imageViewer">
            {images &&
                <div className='image-holder'>
                    <img src={images[counter]} className="productImage" />
                    <div className="controlButtonDiv">
                        <div className="controlButtons" onClick={()=>setCounter(Math.abs(counter-1)%images.length)}><ChevronLeft /></div>
                        <div className="controlButtons" onClick={()=>closeImageViewer()}><X /></div>
                        <div className="controlButtons" onClick={()=>setCounter((counter+1)%images.length)}><ChevronRight /></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ImageViewer