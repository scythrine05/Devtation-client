import React, { useState, useEffect } from "react";
import Cropper, { Area } from "react-easy-crop";
import { ThemeButton } from "../Button";
import LoadingComponent from "../Loading";
import { useAuth } from "/src/hooks/useAuth";

interface ImageCropperProps {
  image: File | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

//Icons
import { MdOutlineCrop } from "react-icons/md";
import { uploadDisplayImage } from "/src/apis/custom";

const ImageCropper: React.FC<ImageCropperProps> = ({ image, setImageUrl }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>({
    width: 200,
    height: 200,
  });
  const { user } = useAuth();

  //Extract image source from File format
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(image);
    } else {
      setImageSrc(null);
    }
  }, [image]);

  //Responsive crop size
  useEffect(() => {
    const updateCropSize = () => {
      const screenWidth = window.innerWidth;

      const newAspectRatio = screenWidth > 768 ? 16 / 9 : 4 / 3; // Use 16:9 for desktop, 4:3 for mobile
      setAspectRatio(newAspectRatio);

      const cropWidth = Math.min(screenWidth * 0.6, 300);
      const cropHeight = cropWidth;
      setCropSize({ width: cropWidth, height: cropHeight });
    };

    updateCropSize();
    window.addEventListener("resize", updateCropSize);

    return () => {
      window.removeEventListener("resize", updateCropSize);
    };
  }, []);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const cropImage = async () => {
    if (!imageSrc || !croppedArea || !image) return;

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;

    img.onload = async () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height, x, y } = croppedArea;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], image.name, { type: image.type });

        try {
          const imgUrl = await uploadDisplayImage(user, file);
          setImageUrl(imgUrl); //set image url to display picture component
        } catch (error) {
          console.error("Error uploading cropped image:", error);
        }
      }, image.type);
    };
  };

  return (
    <div className="container flex justify-center items-center flex-col">
      <div className="relative w-full h-96 md:h-[480px]">
        {imageSrc ? (
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio} // Responsive aspect ratio
            cropSize={cropSize} // Responsive crop size
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid={false}
          />
        ) : (
          <LoadingComponent />
        )}
      </div>
      {/* Crop Button */}
      <div className="mt-4">
        <ThemeButton onClick={cropImage} disabled={!imageSrc}>
          <div className="flex items-center">
            <div>
              <MdOutlineCrop className="mr-1" size={18} />
            </div>
            Crop and publish
          </div>
        </ThemeButton>
      </div>
    </div>
  );
};

export default ImageCropper;
