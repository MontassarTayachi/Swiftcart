import React, { useEffect, useState } from 'react';
import ImageGallery from "react-image-gallery";
import './images.css';
import { Magnifier } from "react-image-magnifiers";
function ProduitImages({ product }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (product.media && product.media.length > 0) {
            const newMedia = product.media.map((url,index) => {
                const extension = url.split('.').pop(); // Obtient l'extension du fichier
                if (['mp4', 'webm', 'ogg'].includes(extension)) { // Vérifie si l'URL est pour une vidéo
                    return;
                } else {
                    return {
                        original: url,
                        thumbnail: url,
                        renderItem: () => (
                                 <Magnifier
                                    key={index}
                                    imageSrc={url}
                                    imageAlt="Zoomable"
                                    dragToMove={false}
                                />
                        )
                    };
                }
            });
            setImages(newMedia);
        }
    }, [product.media]);

    return (
        <div className="gallery-container">
        <ImageGallery 
            thumbnailPosition='left'
            showBullets={images.length > 1}
            showPlayButton={false}
            showFullscreenButton={true}
            showNav={true}
            showThumbnails={images.length > 1}
            items={images} 
        />
    </div>
    );
}

export default ProduitImages;
