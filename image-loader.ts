// image-loader.ts
interface ImageLoaderProps {
    src: string;
    width?: number;
    quality?: number;
  }
  
  type Loader = (props: ImageLoaderProps) => string;
  
  const cloudinaryLoader: Loader = ({ src, width, quality }) => {
    const q = quality ?? 75;
    return `https://xiangleratchetstrap.com/cdn/files/f_webp,w_${width},q_${q}${src}`;
  };
  
  export default cloudinaryLoader;
  