import React, { useState } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback: string;
  alt?: string;
}

const LazyImageComponent: React.FC<LazyImageProps> = ({
  src,
  fallback,
  alt,
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(fallback);

  const handleImageLoad = () => {
    setImageSrc(src);
  };

  const handleError = () => {
    setImageSrc(fallback);
  };

  return (
    <img
      src={imageSrc}
      alt={alt || "image"}
      onLoad={handleImageLoad}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default LazyImageComponent;
