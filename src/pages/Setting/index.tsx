import { useState, useEffect, useCallback, ChangeEvent } from "react";

import Modal from "/src/components/Modal";
import DeleteAccount from "../../components/Modal/templates/Alert/DeleteAccount";

import { ProfileData } from "/src/types";
import { getUserById, updateUserById } from "/src/apis/custom";
import { useAuth } from "/src/hooks/useAuth";
import { validateForm } from "/src/helpers/validateForm";
import { usernameExists } from "/src/helpers/validationRules";

import withDataFetching from "/src/hoc/withDataFetching";

const Setting = ({ data }: ProfileData | any) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
    bio: "",
  });
  const [initialFormData, setInitialFormData] = useState(formData);
  const [modifiedFields, setModifiedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);

  const fields = [
    { name: "username", type: "text", label: "Username", editable: true },
    { name: "name", type: "text", label: "Name", editable: true },
    { name: "email", type: "email", label: "Email", editable: false },
    { name: "bio", type: "textarea", label: "Bio", editable: true },
  ];

  const authRules = [usernameExists];

  useEffect(() => {
    setFormData({ ...data, bio: data.bio || "" });
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
    try {
      const validationErrors = await validateForm(
        formData,
        modifiedFields,
        authRules,
        null
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const response = await updateUserById(formData, user);
        setIsEditing(false);
        return response;
      }
      return;
    } catch (err) {
      throw err;
    }
  };

  const toggleModal = () => {
    setShowModal(() => !showModal);
  };

  return (
    <div>
      <div>
        <img src="#" alt="Profile" />
      </div>
      <div>
        <div>
          <form>
            {fields.map((field) => (
              <div key={field.name}>
                <label>{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name as keyof ProfileData]}
                    disabled={!field.editable ? true : !isEditing}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name as keyof ProfileData]}
                    disabled={!field.editable ? true : !isEditing}
                  />
                )}
                <div>
                  {errors[field.name] && <span>{errors[field.name]}</span>}
                </div>
              </div>
            ))}
          </form>
        </div>
        <div>
          {isEditing ? (
            <>
              <button
                onClick={() =>
                  handleUpdate().catch((err) => console.error(err))
                }
              >
                Update
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEdit}>Edit Profile</button>
          )}
          <button onClick={toggleModal}>Delete Account</button>
        </div>
      </div>
      <Modal show={showModal} onClose={toggleModal}>
        <DeleteAccount />
      </Modal>
    </div>
  );
};

const NewComponent = withDataFetching<ProfileData>(Setting);

const SettingWithData = () => {
  const { user } = useAuth();
  const fetchData = useCallback(() => {
    const id = user ? user.uid : user;
    return getUserById(user, id);
  }, [user]);

  return <NewComponent fetchData={fetchData} />;
};

export default SettingWithData;
