import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

interface CloudinaryImageProps {
  publicId: string;
  alt?: string;
  className?: string;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ publicId, alt, className }) => {
  const myImage = cld.image(publicId).format('webp');

  return <AdvancedImage cldImg={myImage} alt={alt} className={className} />;
};

export default CloudinaryImage;