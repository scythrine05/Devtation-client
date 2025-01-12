import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import Modal from "/src/components/Modal";
import DeleteAccount from "/src/components/Modal/templates/Alert/DeleteAccount";
import {
  ThemeButton,
  SecondaryButton,
  DangerButton,
} from "/src/components/Button";
import TextInput, { TextArea } from "/src/components/Inputs/TextInput";
import LazyImageComponent from "/src/components/custom/LazyImage";

//Icons
import { RiImageEditFill } from "react-icons/ri";
import { LuTrash } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";

//Modal Template
import DPModalTemplate from "/src/components/Modal/templates/DisplayImage";

import { ProfileData } from "/src/types";
import { getUserById, updateUserById } from "/src/apis/custom";
import { updateUserDisplayName } from "/src/apis/firebase";
import { useAuth } from "/src/hooks/useAuth";
import { validateForm } from "/src/helpers/validateForm";
import { usernameExists } from "/src/helpers/validationRules";

import withDataFetching from "/src/hoc/withDataFetching";

const Setting = ({ data }: ProfileData | any) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
    bio: "",
    profileImage: "",
  });
  const [initialFormData, setInitialFormData] = useState(formData);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [modifiedFields, setModifiedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDisplayImageModal, setShowDisplayImageModal] = useState(false);

  const fields = [
    { name: "username", type: "text", label: "Username", editable: true },
    { name: "name", type: "text", label: "Name", editable: true },
    { name: "email", type: "email", label: "Email", editable: false },
    { name: "bio", type: "textarea", label: "Bio", editable: true },
  ];

  const authRules = [usernameExists];
  const optionalFields = ["bio"];
  const defaultProfileImage = "/images/profile-placeholder.webp";

  useEffect(() => {
    setFormData({ ...data, bio: data.bio || "" });
    setImageUrl(data.profileImage);
  }, []);

  useEffect(() => {
    if (isEditing) {
      setInitialFormData(formData);
    }
  }, [isEditing]);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ProfileData;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setModifiedFields((prevFields) => ({
      ...prevFields,
      [name]: value !== initialFormData[fieldName],
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(initialFormData);
    setErrors({});
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const validationErrors = await validateForm(
        formData,
        modifiedFields,
        authRules,
        optionalFields
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        if (formData.name !== initialFormData.name) {
          await updateUserDisplayName(user, formData.name);
        }
        //Server Code
        const response = await updateUserById(formData, user);
        setIsEditing(false);
        return response;
      }
      return;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (setState: Dispatch<SetStateAction<boolean>>): void => {
    setState((prev) => !prev);
  };

  return (
    <div className="md:mx-5 p-10">
      <div>
        <div className="w-32 h-w-32 md:h-40 md:w-40">
          <LazyImageComponent
            fallback={defaultProfileImage}
            className="rounded-sm object-cover"
            src={imageUrl || defaultProfileImage}
            alt="author"
          />
        </div>
        <div className="mt-5">
          <SecondaryButton
            disabled={isEditing}
            onClick={() => toggleModal(setShowDisplayImageModal)}
          >
            <div className="flex items-center text-responsive-sm">
              <div>
                <RiImageEditFill className="mr-2" size={16} />
              </div>
              Edit image
            </div>
          </SecondaryButton>
        </div>
      </div>
      <div className="w-full sm:w-1/2 2xl:w-1/4 mt-10">
        <div>
          <form>
            {fields.map((field) => (
              <div key={field.name}>
                {field.type === "textarea" ? (
                  <TextArea
                    label={field.label}
                    name={field.name}
                    handleChange={handleChange}
                    value={formData[field.name as keyof ProfileData]}
                    disabled={!field.editable ? true : !isEditing}
                    helper={errors[field.name]}
                  />
                ) : (
                  <TextInput
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    handleChange={handleChange}
                    value={formData[field.name as keyof ProfileData]}
                    disabled={!field.editable ? true : !isEditing}
                    helper={errors[field.name]}
                  />
                )}
              </div>
            ))}
            <div>
              {isEditing ? (
                <div className="flex w-fit mt-5">
                  <div className="mr-5">
                    <ThemeButton
                      onClick={() =>
                        handleUpdate().catch((err) => console.error(err))
                      }
                      loading={loading}
                    >
                      <div className="text-responsive-sm">
                        Updat{loading ? "ing" : "e"}
                      </div>
                    </ThemeButton>
                  </div>
                  <SecondaryButton onClick={handleCancel}>
                    <div className="text-responsive-sm">Cancel</div>
                  </SecondaryButton>
                </div>
              ) : (
                <>
                  <div className="mt-5">
                    <SecondaryButton onClick={handleEdit}>
                      <div className="flex items-center text-responsive-sm">
                        <div>
                          <FiEdit3 className="mr-1" size={16} />
                        </div>
                        Edit profile
                      </div>
                    </SecondaryButton>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>

        <div className="mt-5">
          <DangerButton
            onClick={() => toggleModal(setShowDeleteModal)}
            disabled={isEditing}
          >
            <div className="flex items-start text-responsive-sm">
              <div>
                <LuTrash className="mr-1" size={16} />
              </div>
              Delete account
            </div>
          </DangerButton>
        </div>
      </div>
      <Modal
        show={showDeleteModal}
        onClose={() => toggleModal(setShowDeleteModal)}
      >
        <DeleteAccount />
      </Modal>
      <DPModalTemplate
        show={showDisplayImageModal}
        onClose={() => toggleModal(setShowDisplayImageModal)}
        image={image}
        setImage={setImage}
        setImageUrl={setImageUrl}
      />
    </div>
  );
};

const NewComponent = withDataFetching<ProfileData>(Setting);

const SettingWithData = () => {
  const { user } = useAuth();
  const fetchData = useCallback(() => {
    const id = user ? user.uid : user;
    return getUserById(id);
  }, [user]);

  return <NewComponent fetchData={fetchData} />;
};

export default SettingWithData;
