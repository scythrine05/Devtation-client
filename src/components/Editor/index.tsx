import React, { useState, ChangeEvent } from "react";
import QuillEditor from "./Quill";
import { useNavigate } from "react-router-dom";

import FileInputComponent from "../custom/FileUpload";
import ItemInput from "/src/components/Inputs/ItemInput";
import { CustomTextInputComponent } from "../Inputs/TextInput";
import { SecodaryButton, ThemeButton } from "/src/components/Button";
import LinksInput from "../custom/LinksInput";

import { ProjectInputData } from "/src/types";

import { useAuth } from "/src/hooks/useAuth";
import { postProject, uploadImages } from "/src/apis/custom";

import { validateForm } from "/src/helpers/validateForm";

import "./editor.style.css";
import { EditCarouselComponent } from "../Carousel";

const Editor: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectInputData>({
    images: [],
    title: "",
    tags: [],
    links: [],
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addImage = (image: File) => {
    setProjectData((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }));
  };

  const removeImage = (index: number) => {
    setProjectData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setProjectData({
        ...projectData,
        [name]: value.split(",").map((tagOrLink) => tagOrLink.trim()),
      });
    } else {
      setProjectData({
        ...projectData,
        [name]: value,
      });
    }
  };

  const handleImageSelect = (files: File[]) => {
    setProjectData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleItemInput = (value: string) => {
    if ((projectData["tags"] as string[]).length >= 10) {
      return;
    }

    setErrors({ fieldName: "" });
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
    if (projectData.links.length >= 6) {
      return;
    }
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
    try {
      if (projectData.images.length > 5) {
        setErrors({
          ...errors,
          images: "Maximum of 5 previews",
        });
        return;
      } else if (!projectData.images.length || !projectData.tags.length) {
        !projectData.images.length
          ? setErrors({
              ...errors,
              images: "Add atleast 1 preview",
            })
          : setErrors({
              ...errors,
              tags: "Add atleast 1 tag",
            });
        return;
      }

      const validationErrors = await validateForm(
        projectData,
        null,
        null,
        null
      );
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        const uploadedImageURLs = await uploadImages(user, projectData.images);

        const updatedProjectData = {
          ...projectData,
          imageUrls: uploadedImageURLs,
        };

        const response = await postProject(user, updatedProjectData);
        if (response) {
          navigate("/");
        }
        return response;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="p-1 sm:p-5 flex flex-col min-h-screen bg-[var(--color-dark-theme-background)]">
      <div className="p-2 sm:p-10 bg-[var(--color-dark-theme-sub-background-2)]">
        <div className="flex flex-col">
          <label className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)">
            Add preview (max 5 previews)
          </label>
          {!projectData.images.length ? (
            <FileInputComponent
              onChange={(
                files: File[] | File | ChangeEvent<HTMLInputElement>
              ) => {
                if (Array.isArray(files)) handleImageSelect(files);
              }}
              multiple={true}
              className="2xl:w-1/2 xl:w-2/4 lg:w-2/3 md:w-3/4 w-full aspect-square sm:aspect-video my-4"
            />
          ) : (
            <EditCarouselComponent
              images={projectData.images}
              addImage={addImage}
              removeImage={removeImage}
              className="2xl:w-1/2 xl:w-2/4 lg:w-2/3 md:w-3/4 sm:aspect-video w-full aspect-square my-4"
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
            handleChange={handleChange}
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
              onAdd={(value: string) => handleItemInput(value)} // Handles adding items
              onRemove={(value: string) => handleRemoveItem(value)} // Handles removing items
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
        {/* <TabsComponent tabs={tabItems} /> */}
        <QuillEditor
          id={"description"}
          label="Add description"
          onTextChange={handleDescription}
        />
        <div className="flex gap-5">
          <div>
            <ThemeButton
              onClick={() => handlePublish().catch((err) => console.error(err))}
            >
              Publish
            </ThemeButton>
          </div>
          <div>
            <SecodaryButton onClick={() => navigate("/")}>
              Discard
            </SecodaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
