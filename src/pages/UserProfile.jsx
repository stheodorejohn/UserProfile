import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProfileCard from "../components/ProfileCard";
import profileSchema from "../data/UserProfileSchema";
import useLocalStorage from "../hooks/useLocalStorage";
import * as styles from "../styles/userProfile.module.css";
import { userProfileFieldData } from "../data/UserProfileData";
import { getUserProfileData, getLocation } from "../helpers/apiCalls";

const UserProfile = () => {
  const [profileData, setProfileData] = useLocalStorage(
    "userProfileField",
    userProfileFieldData
  );
  const [apiStatus, setApiStatus] = useState(false);

  const excludeFields = ["avatar_URI", "fetchedData"];

  const setUserData = (field, data) => {
    let updatedData = { ...profileData, [field]: data };
    setProfileData(updatedData);
  };

  const validateAndUpdateField = async (field, value, checkEmail) => {
    try {
      if (field != "email" || checkEmail) {
        await profileSchema.validateAt(field, { [field]: value });
      }
      setUserData(field, value);
    } catch (error) {
      if (typeof error.message === "string") {
        toast.error(error.message);
      } else if (Array.isArray(error.errors) && error.errors.length > 0) {
        toast.error(error.errors[0]);
      } else {
        console.error("Validation error:", error);
      }
    }
  };

  const emailValidation = (field, value) => {
    validateAndUpdateField(field, value, true);
  };

  const isAPICalled = () => {
    return JSON.parse(localStorage.getItem("userProfileField")).fetchedData;
  };

  const getAPIData = async () => {
    setApiStatus(true);
    const profileData = await getUserProfileData();
    const locationData = await getLocation();
    setProfileData((prev) => ({ ...prev, ...profileData, ...locationData }));
    setApiStatus(false);
  };

  useEffect(() => {
    if (!isAPICalled()) {
      getAPIData();
    }
  }, []);

  return (
    <>
      {apiStatus && <div className={styles.loading}> </div>}
      <div className={styles.pageContainer}>
        <ProfileCard
          userData={profileData}
          excludeFields={excludeFields}
          onChangeHandler={validateAndUpdateField}
          emailValidation={emailValidation}
        />
      </div>
    </>
  );
};

export default UserProfile;
