import React, { useState, useEffect } from "react";
import Cropper, { Area } from "react-easy-crop";
import { ThemeButton } from "../Button";
import LoadingComponent from "../Loading";

interface ImageCropperProps {
  image: File | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onClose?: () => void;
}

//Icons
import { MdOutlineCrop } from "react-icons/md";
import { uploadDisplayImage } from "/src/apis/custom";

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  setImageUrl,
  onClose,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9);
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>({
    width: 200,
    height: 200,
  });
  const [loading, setLoading] = useState(false);

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

      const newAspectRatio = screenWidth > 768 ? 16 / 9 : 4 / 3;
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
    setLoading(true);
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
          const response = await uploadDisplayImage(file);
          response.user && setImageUrl(response.user.profileImage);
          if (onClose) {
            onClose();
          }
        } catch (error) {
          console.error("Error uploading cropped image:", error);
        } finally {
          setLoading(false);
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
            aspect={aspectRatio}
            cropSize={cropSize}
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
        <ThemeButton onClick={cropImage} disabled={!imageSrc} loading={loading}>
          <div className="flex items-center text-responsive-sm">
            {loading ? (
              "Publishing"
            ) : (
              <>
                <div>
                  <MdOutlineCrop className="mr-1" size={18} />
                </div>
                Crop and publish
              </>
            )}
          </div>
        </ThemeButton>
      </div>
    </div>
  );
};

export default ImageCropper;
