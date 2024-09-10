import React, { useState } from "react";
import QuillEditor from "./Quill";
import { useNavigate } from 'react-router-dom';
import "./editor.style.css";

import FileInput from "/src/components/Inputs/FileInput";
import ItemInput from "/src/components/Inputs/ItemInput";
import Button from "/src/components/Button";
import { ProjectData } from "/src/types";

import { useAuth } from "/src/hooks/useAuth";
import { postProject } from "/src/apis/custom";

import { validateForm } from "/src/helpers/validateForm";
import { isValidLink } from "/src/helpers/validationRules";

const Editor: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState<ProjectData>({
    images: [],
    title: "",
    tags: [],
    links: [],
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = [
    { name: "image", type: "file", label: "Upload your Images" },
    { name: "title", type: "text", label: "Add Title" },
    { name: "tags", type: "Text", label: "Add Tags" },
    { name: "links", type: "Text", label: "Add Links" },
  ];
  const optionalFields = ["tags", "links", "images"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "tags" || name === "links") {
      setProjectData({
        ...projectData,
        [name]: value.split(",").map((tagOrLink) => tagOrLink.trim()), // Split string into array and trim whitespace
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

  const handleItemInput = (value: string, fieldName: string) => {
    setErrors({ fieldName: "" });
    if (fieldName === "links" && !isValidLink.validate(value)) {
      setErrors({ links: "valid link is required" });
      return;
    }
    setProjectData((prevData) => ({
      ...prevData,
      [fieldName]: [
        ...(prevData[fieldName as keyof ProjectData] as string[]),
        value,
      ],
    }));
  };

  const handleDescription = (value: string) => {
    setProjectData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handlePublish = async () => {
    try {
      const validationErrors = await validateForm(
        projectData,
        null,
        null,
        optionalFields
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const response = await postProject(user, projectData);
        if (response) {
          navigate("/");
        }
        return response;
      }
      return;
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-4 bg-white shadow-md rounded-lg">
        {fields.map((field) =>
          field.name === "image" ? (
            <FileInput
              key={field.name}
              id="image-upload"
              label="Upload Images"
              multiple={true}
              onFileSelect={handleImageSelect}
            />
          ) : (
            <div key={field.name}>
              {field.name === "tags" || field.name === "links" ? (
                <ItemInput
                  id={field.name}
                  label={`Add ${field.name}`}
                  onAdd={(value: string) => handleItemInput(value, field.name)} // Pass field name here
                  items={
                    Array.isArray(projectData[field.name]) &&
                    typeof projectData[field.name][0] === "string"
                      ? (projectData[field.name] as string[])
                      : []
                  }
                  placeholder={`Press Enter to add ${field.name}`}
                  errors={errors}
                />
              ) : (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    onChange={handleChange}
                    value={
                      projectData[field.name as keyof ProjectData] as string
                    }
                  />
                  <div>
                    {errors[field.name] && <span>{errors[field.name]}</span>}
                  </div>
                </>
              )}
            </div>
          )
        )}
        <QuillEditor
          id={"description"}
          label="Add Description"
          onTextChange={handleDescription}
        />
        <Button
          onClick={() => handlePublish().catch((err) => console.error(err))}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default Editor;
