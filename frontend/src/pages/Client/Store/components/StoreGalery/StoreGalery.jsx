import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


import img1 from "../../../../../assets/img/sotore1.jpg";
import img2 from "../../../../../assets/img/sotore2.jpg";
import img3 from "../../../../../assets/img/sotore3.jpg";
import img4 from "../../../../../assets/img/sotore4.jpg";
import img5 from "../../../../../assets/img/sotore5.jpg";

export default function StoreGalery() {
   const imagesArr = [
      {
        original: img1,
      },
      {
        original: img2,
      },
      {
        original: img3,
      },
      {
        original: img4,
      },
      {
        original: img5,
      },
    ];

  return (
      <ImageGallery items={imagesArr} showFullscreenButton={false} showPlayButton={false} autoPlay={true}/>
  )
}