import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

//Import images here

import img1 from '../assets/images/Image1.jpg';
import img2 from '../assets/images/Image2.jpg'; 
import img3 from '../assets/images/Image3.jpg';

//Create a Gallery component
const Gallery = () => {
    const images = [
      { src: img1, alt: "Image 1" },
      { src: img2, alt: "Image 2" },
      { src: img3, alt: "Image 3" }
    ];
  
    return (
      <div className="gallery-container">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          dynamicHeight
          interval={3000}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </Carousel>
      </div>
    );
  };
  
  export default Gallery;