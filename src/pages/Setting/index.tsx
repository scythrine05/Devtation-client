import { useState, useEffect, ChangeEvent } from "react";

import Modal from "/src/components/Modal";
import DeleteAccount from "../../components/Modal/templates/Alert/DeleteAccount";

import { ProfileData } from "/src/types";
import { getUserById, updateUserById } from "/src/apis/custom";
import { useAuth } from "/src/hooks/useAuth";
import { validateForm } from "/src/helpers/validateForm";
import { usernameExists } from "/src/helpers/validationRules";

export default function Setting() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    username: "",
    email: "",
    bio: "",
  });
  const [initialFormData, setInitialFormData] = useState(formData);
  const [modifiedFields, setModifiedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
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
    const loadUserData = async () => {
      try {
        setLoading(true);
        const id = user ? user.uid : user;
        const data = await getUserById(user, id);
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
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
    const loadUserData = async () => {
      try {
        setLoading(true);
        const id = user ? user.uid : user;
        const data = await getUserById(user, id);
        setFormData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setErrors({});
      }
    };

    loadUserData();
  };

  const handleUpdate = async () => {
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
  };

  const toggleModal = () => {
    setShowModal(() => !showModal);
  };

  if (loading) return <div>Loading...</div>;

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
}
