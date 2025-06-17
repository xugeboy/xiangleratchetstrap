// image-loader.ts
interface ImageLoaderProps {
    src: string;
    width?: number;
    quality?: number;
  }
  
  type Loader = (props: ImageLoaderProps) => string;
  
  const cloudinaryLoader: Loader = ({ src, width, quality }) => {
    const q = quality ?? 75;
    return `https://res.cloudinary.com/duimeqqch/image/upload/f_webp,w_${width},q_${q}${src}`;
  };
  
  export default cloudinaryLoader;
  