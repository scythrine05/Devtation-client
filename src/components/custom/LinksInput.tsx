import React, { useState } from "react";
import TextInput from "../Inputs/TextInput";
import { isValidLink } from "/src/helpers/validationRules";
import { SecondaryButton } from "../Button";

//Icons
import { MdAddLink } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";

const LinksInput: React.FC<{
  links: { name: string; url: string }[];
  onAdd: (name: string, url: string) => void;
  onRemove: (index: number) => void;
}> = ({ links, onAdd, onRemove }) => {
  const [newLink, setNewLink] = useState({ name: "", url: "" });
  const [errors, setErrors] = useState({ name: "", url: "" });

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, url } = newLink;

    // Validation
    const newErrors: { name: string; url: string } = { name: "", url: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!url.trim()) {
      newErrors.url = "URL is required.";
    } else if (!isValidLink.validate(url)) {
      newErrors.url = "A valid URL is required.";
    }

    setErrors(newErrors);

    // If there are any errors, do not proceed
    if (newErrors.name || newErrors.url) return;

    // If valid, add the link
    onAdd(name, url);
    setNewLink({ name: "", url: "" });
    setErrors({ name: "", url: "" });
  };

  return (
    <div>
      <label className="block px-2 text-responsive-sm text-var(--color-white-2)">
        Add links (max 6 links)
      </label>

      <form onSubmit={handleAdd}>
        <div className="flex w-full gap-x-5 md:items-center flex-col md:flex-row">
          <div className="flex-grow">
            <TextInput
              name="link-name"
              type="text"
              placeholder="Link name"
              value={newLink.name}
              handleChange={(e) =>
                setNewLink({ ...newLink, name: e.target.value })
              }
              helper={errors.name}
            />
          </div>
          <div className="flex-grow">
            <TextInput
              name="link-url"
              type="text"
              placeholder="Link URL"
              value={newLink.url}
              handleChange={(e) =>
                setNewLink({ ...newLink, url: e.target.value })
              }
              helper={errors.url}
            />
          </div>
          <div>
            <SecondaryButton type="submit">
              <MdAddLink size={18} />
            </SecondaryButton>
          </div>
        </div>
      </form>
      <ul className="mt-2 flex flex-wrap items-center">
        {links.map((link, index) => (
          <li
            key={index}
            className="mt-2 p-3 mr-2 flex items-center bg-[var(--color-dark-theme-sub-background-3)] rounded text-responsive-sm text-[var(--color-white-2)]"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-300 flex items-center"
            >
              <span className="mr-1">
                <RiExternalLinkLine size={18} />
              </span>
              {link.name}
            </a>
            <button
              className="ml-2 text-gray-300 hover:text-blue-300"
              onClick={() => onRemove(index)}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksInput;
