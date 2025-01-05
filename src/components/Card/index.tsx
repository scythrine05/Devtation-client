import React, { useState } from "react";
import { CardData } from "/src/types";
import { Link } from "react-router-dom";
import { Card, Kbd } from "flowbite-react";
import { useAuth } from "/src/hooks/useAuth";
import { OptionsDropdownComponent } from "../Dropdown";
import { DangerButton, SecondaryButton } from "../Button";
import { deleteProjectById } from "/src/apis/custom";

const CardComponent: React.FC<CardData> = ({
  _id,
  title,
  authorUsername,
  tags,
  authorId,
  imageUrls,
  authorProfileImage,
  onRemove,
}) => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const isOwner = user?.uid === authorId;
  const defaultThumbnail =
    "https://cdn.pixabay.com/photo/2016/07/17/21/44/mountains-1524804_1280.png";
  const defaultProfileImage =
    "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1726816029~exp=1726819629~hmac=5a5fadd081fb64009141798aaefcc4731c8d136f37395ec48f08693814236d93&w=826";

  const truncateText = (text: string, charLimit: number = 25) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProjectById(_id);
      onRemove && onRemove(_id);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full md:w-72 h-auto bg-[var(--color-dark-theme-sub-background-2)] hover:bg-[var(--color-dark-theme-sub-background)] border-none relative flex flex-col justify-between">
      {!deleteMode ? (
        <>
          {/* Author Section */}
          <div className="flex items-center">
            {authorUsername ? (
              <Link
                to={`/account/${authorUsername}`}
                className="flex items-center hover:text-[var(--color-devtiny-theme-light)] text-white"
              >
                <div className="w-8 h-8">
                  <img
                    className="rounded-sm w-full object-center"
                    src={
                      authorProfileImage
                        ? authorProfileImage
                        : defaultProfileImage
                    }
                    alt="author"
                  />
                </div>
                <div className="font-normal text-responsive-sm mx-2">
                  {authorUsername}
                </div>
              </Link>
            ) : (
              <div className="h-8" />
            )}
          </div>
          {/* Title and Tags Section */}
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col">
              {/* Image Section */}
              <Link
                to={`/view/project/${_id}`}
                className="hover:text-[var(--color-devtiny-theme-light)] text-white"
              >
                <div className="w-full">
                  <img
                    src={imageUrls ? imageUrls[0] : defaultThumbnail}
                    alt="caption"
                    className="rounded-sm object-cover w-full h-44"
                  />
                </div>
                <div className="line-clamp-3 mt-5">
                  <h1 className="text-responsive-regular">
                    {truncateText(title)}
                  </h1>
                </div>
              </Link>
              <div className="flex justify-between">
                <div className="text-xs text-gray-400 mt-2">
                  <span className="flex flex-wrap gap-2 overflow-hidden max-h-20">
                    {tags &&
                      tags.slice(0, 2).map((item, index) => (
                        <Kbd
                          key={index}
                          className="mx-0.1 p-1 px-2 bg-[#32323a] border-none text-white font-normal"
                        >
                          {truncateText(item, 10)}
                        </Kbd>
                      ))}
                    {tags && tags.length > 2 && (
                      <Kbd className="mx-0.1 p-1 px-2 text-xs bg-[#32323a] border-none text-white font-normal">
                        +{tags.length - 2}
                      </Kbd>
                    )}
                  </span>
                </div>
                <div>
                  {isOwner ? (
                    <OptionsDropdownComponent
                      setDeleteMode={setDeleteMode}
                      _id={_id}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[18.2em]">
          <div className="text-responsive-sm text-center">
            <p>Deleting the project cannot be undone</p>
          </div>
          <div className="mt-5 flex flex-col items-center justify-center gap-4">
            <DangerButton onClick={handleDelete} loading={loading}>
              <span className="text-xs">{loading ? "" : "Delete"}</span>
            </DangerButton>
            <SecondaryButton
              disabled={loading}
              onClick={() => setDeleteMode(false)}
            >
              <span className="text-xs">Cancel</span>
            </SecondaryButton>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CardComponent;
