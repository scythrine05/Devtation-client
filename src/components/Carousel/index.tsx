import React, { useState, useEffect } from "react";
import { Carousel } from "flowbite-react";

interface EditCarouselProps {
  images: File[];
  addImage?: (image: File) => void;
  removeImage?: (index: number) => void;
  className?: string;
}

interface ViewCarouselProps extends Omit<EditCarouselProps, "images"> {
  images: string[];
}

//Icons
import { MdOutlineAdd } from "react-icons/md";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

export const EditCarouselComponent: React.FC<EditCarouselProps> = ({
  images,
  addImage,
  removeImage,
  className,
}) => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (images.length > 0) {
      const loadImages = async () => {
        const srcs = await Promise.all(
          images.map(
            (image) =>
              new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error("Failed to read file"));
                reader.readAsDataURL(image);
              })
          )
        );
        setImageSrcs(srcs);
      };

      loadImages().catch((error) =>
        console.error("Error loading images:", error)
      );
    } else {
      setImageSrcs([]);
    }
  }, [images]);

  // Add new image
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newImageUrl = URL.createObjectURL(file);
    setImageSrcs((prevImages) => [...prevImages, newImageUrl]);

    addImage && addImage(file);

    return () => URL.revokeObjectURL(newImageUrl);
  };

  // Remove an image
  const handleRemoveImage = (index: number) => {
    setImageSrcs((prevImages) => prevImages.filter((_, i) => i !== index));
    removeImage && removeImage(index);

    setActiveIndex((prevIndex) => {
      if (prevIndex === index) return Math.max(prevIndex - 1, 0);
      if (prevIndex > index) return prevIndex - 1;
      return prevIndex;
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <div className={`relative ${className}`}>
        <div className="h-full overflow-hidden relative">
          {imageSrcs.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 custom-scrollbar">
        {imageSrcs.map((src, index) => (
          <div key={index} className="relative group flex-shrink-0">
            <img
              src={src}
              alt={`Thumbnail ${index}`}
              onClick={() => setActiveIndex(index)}
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md cursor-pointer ${
                activeIndex === index ? "ring-2 ring-blue-500" : ""
              }`}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
        <label
          htmlFor="add-image"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-md cursor-pointer text-gray-500 hover:bg-gray-300"
        >
          <MdOutlineAdd />
          <input
            id="add-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>
      </div>
    </div>
  );
};

export const FlowBiteCarousel: React.FC<ViewCarouselProps> = ({
  images,
  className,
}) => {
  return (
    <div className={className}>
      <Carousel
        slide={false}
        leftControl={<BsArrowLeftSquareFill size={35} color="#161616"  className="bg-white rounded-lg p-0 border-none"/>}
        rightControl={<BsArrowRightSquareFill size={35} color="#161616" className="bg-white rounded-lg p-0 border-none" />}
      >
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
        />
      </Carousel>
    </div>
  );
};
