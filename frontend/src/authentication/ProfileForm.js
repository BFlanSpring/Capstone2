import React, { useState, useContext, useEffect } from "react";
import Alert from "../general/Alert";
import BackendApi from "../api/BackendApi";
import UserContext from "../authentication/UserContext";
import "./ProfileForm.css";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser ? currentUser.firstName : "",
    lastName: currentUser ? currentUser.lastName : "",
    email: currentUser ? currentUser.email : "",
    username: currentUser ? currentUser.username : "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      firstName: currentUser ? currentUser.firstName : "",
      lastName: currentUser ? currentUser.lastName : "",
      email: currentUser ? currentUser.email : "",
      username: currentUser ? currentUser.username : "",
      password: "",
    });
  }, [currentUser]);
  
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  console.debug(
    "ProfileForm",
    "currentUser=", currentUser,
    "formData=", formData,
    "formErrors=", formErrors,
    "saveConfirmed=", saveConfirmed,
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await BackendApi.saveProfile(username, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData({ ...formData, password: "" });
    setFormErrors([]);
    setSaveConfirmed(true);

    setCurrentUser(updatedUser);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="profile-container">
      <h3 className="profile">Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <input
                name="userName"
                className="form-control"
                value={formData.username}
                readOnly 
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control-password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            {saveConfirmed ? (
              <Alert type="success" messages={["Updated successfully."]} />
            ) : null}

            <button
              className="btn-submit"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;

