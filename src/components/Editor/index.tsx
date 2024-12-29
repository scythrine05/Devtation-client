import React, { useEffect, useState, ChangeEvent } from "react";
import QuillEditor from "./Quill";
import { useNavigate } from "react-router-dom";

import FileInputComponent from "../custom/FileUpload";
import ItemInput from "/src/components/Inputs/ItemInput";
import { CustomTextInputComponent } from "../Inputs/TextInput";
import { SecondaryButton, ThemeButton } from "/src/components/Button";
import LinksInput from "../custom/LinksInput";

import {
  ImageData,
  ProjectExistingData,
  ProjectResquestData,
} from "/src/types";

import {
  postProject,
  uploadImages,
  updateProjectById,
  updateImages,
} from "/src/apis/custom";

import { validateForm } from "/src/helpers/validateForm";

import "./editor.style.css";
import { EditCarouselComponent } from "../Carousel";

interface EditorProps {
  existingData?: ProjectExistingData | null;
}

const EditorComponent: React.FC<EditorProps> = ({ existingData }) => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectExistingData>(
    existingData || {
      imageBucketId: "",
      title: "",
      tags: [],
      links: [],
      description: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const optionalFields = ["description", "imageBucketId"];
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingData) {
      setProjectData(existingData);
      if (existingData.imageUrls) {
        const urlImages: ImageData[] = existingData.imageUrls.map((url) => ({
          type: "url",
          value: url,
        }));
        setImages(urlImages);
      }
    }
  }, [existingData]);

  const addImage = (image: ImageData) => {
    setImages((prev) => [...prev, image]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTitleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleImageSelect = (files: File[]) => {
    const newImages: ImageData[] = files.map((file) => ({
      type: "file",
      value: file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleItemInput = (value: string) => {
    if ((projectData["tags"] as string[]).length >= 10) return;

    setProjectData((prevData) => ({
      ...prevData,
      ["tags"]: [...(prevData["tags"] as string[]), value],
    }));
  };

  const handleRemoveItem = (value: string) => {
    setErrors({ ["tags"]: "" });
    setProjectData((prevData) => ({
      ...prevData,
      ["tags"]: (prevData["tags"] as string[]).filter((item) => item !== value),
    }));
  };

  const handleDescription = (value: string) => {
    setProjectData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleAddLink = (name: string, url: string) => {
    if (projectData.links.length >= 6) return;

    setProjectData((prevData) => ({
      ...prevData,
      links: [...prevData.links, { name, url }],
    }));
  };

  const handleRemoveLink = (index: number) => {
    setProjectData((prevData) => ({
      ...prevData,
      links: prevData.links.filter((_, i) => i !== index),
    }));
  };

  const handlePublish = async () => {
    setErrors({});
    setLoading(true);

    try {
      if (images.length > 5) {
        setErrors((prev) => ({ ...prev, images: "Maximum of 5 previews" }));
        return;
      }

      if (!images.length || !projectData.tags.length) {
        if (!images.length) {
          setErrors((prev) => ({ ...prev, images: "Add at least 1 preview" }));
        }
        if (!projectData.tags.length) {
          setErrors((prev) => ({ ...prev, tags: "Add at least 1 tag" }));
        }
        return;
      }

      const validationErrors = await validateForm(
        projectData,
        null,
        null,
        optionalFields
      );
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      let updatedProjectData: ProjectResquestData;

      if (existingData) {
        const removedImageUrls =
          existingData.imageUrls?.filter(
            (url) =>
              !images.some(
                (image) => image.type === "url" && image.value === url
              )
          ) || [];

        const newImageFiles = images.filter(
          (image) => image.type === "file"
        ) as ImageData[];
        const newImageUrls = images
          .filter((image) => image.type === "url")
          .map((image) => image.value as string);

        const updatedImageUrls = await updateImages(
          newImageFiles.map((image) => image.value as File),
          removedImageUrls,
          projectData.imageBucketId
        );
        updatedProjectData = {
          ...projectData,
          imageUrls: [...newImageUrls, ...updatedImageUrls.uploadedURLs],
        };

        await updateProjectById(existingData._id, updatedProjectData);
      } else {
        const uploadResponse = await uploadImages(
          images.map((image) => image.value as File)
        );

        updatedProjectData = {
          ...projectData,
          imageUrls: uploadResponse.uploadedURLs,
          imageBucketId: uploadResponse.bucketId,
        };

        await postProject(updatedProjectData);
      }

      navigate("/");
    } catch (err) {
      console.error("Error publishing project:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1 sm:p-5 flex flex-col min-h-screen bg-[var(--color-dark-theme-background)]">
      <div className="p-2 sm:p-10 bg-[var(--color-dark-theme-sub-background-2)]">
        <div className="flex flex-col">
          <label className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)">
            Add preview (max 5 previews)
          </label>
          {images.length > 0 ? (
            <EditCarouselComponent
              images={images}
              addImage={addImage}
              removeImage={removeImage}
              className="2xl:w-1/2 xl:w-2/4 lg:w-2/3 md:w-3/4 w-full aspect-square sm:aspect-video my-4"
            />
          ) : (
            <FileInputComponent
              name="images"
              onChange={(
                files: File[] | File | ChangeEvent<HTMLInputElement>
              ) => {
                if (Array.isArray(files)) handleImageSelect(files);
              }}
              multiple={true}
              className="2xl:w-1/2 xl:w-2/4 lg:w-2/3 md:w-3/4 w-full aspect-square sm:aspect-video my-4"
            />
          )}
          <div className="mt-1 mb-2 block px-2">
            {errors["images"] && (
              <p className="text-responsive-sm text-red-700">
                {errors["images"]}
              </p>
            )}
          </div>
        </div>
        <div className="mb-10 md:w-3/4 w-full">
          <CustomTextInputComponent
            type="text"
            name="title"
            handleChange={handleTitleChange}
            value={projectData["title"]}
            placeholder="Add title"
            helper={errors["title"]}
          />
        </div>
        <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/3">
          <div className="w-full">
            <ItemInput
              name="tags"
              label="Add tags (max 10 tags)"
              onAdd={handleItemInput}
              onRemove={handleRemoveItem}
              items={
                Array.isArray(projectData["tags"]) &&
                typeof projectData["tags"][0] === "string"
                  ? (projectData["tags"] as string[])
                  : []
              }
              placeholder={`Press enter to add tags`}
              errors={errors["tags"]}
            />
          </div>
          <div className="w-full">
            <LinksInput
              links={projectData.links}
              onAdd={handleAddLink}
              onRemove={handleRemoveLink}
            />
          </div>
        </div>
      </div>
      <div className="p-2 sm:p-10 bg-[var(--color-dark-theme-sub-background-2)]">
        <QuillEditor
          id={"description"}
          label="Add description"
          onTextChange={handleDescription}
          value={projectData["description"]}
        />
        <div className="flex gap-5 my-20">
          <div>
            <ThemeButton onClick={handlePublish} loading={loading}>
              <div className="flex items-start text-responsive-sm">
                {loading
                  ? "Publishing"
                  : existingData
                  ? "Republish"
                  : "Publish"}
              </div>
            </ThemeButton>
          </div>
          <div>
            <SecondaryButton onClick={() => navigate("/")} disabled={loading}>
              <div className="flex items-start text-responsive-sm">Discard</div>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorComponent;
