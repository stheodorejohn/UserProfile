import React from "react";
import * as styles from "../styles/userProfile.module.css";

const ProfileCard = (props) => {
  const { userData, excludeFields, onChangeHandler, emailValidation } = props;

  const formatFieldLabel = (fieldName) => {
    const currField = fieldName.replace("_", " ");
    return currField[0].toUpperCase() + currField.slice(1);
  };

  return (
    <div className={styles.formContainer}>
      <img
        src={userData.avatar_URI}
        alt="user avatar"
        className={styles.avatarImage}
      />
      {Object.keys(userData).map((field, index) => {
        return (
          <React.Fragment key={`${field}_${index}`}>
            {excludeFields.every((val) => val != field) && (
              <div key={field} className={styles.formRow}>
                <p className={styles.formLabel}>{formatFieldLabel(field)}</p>
                <input
                  type="text"
                  value={userData[field]}
                  onError={() => console.log(error)}
                  onBlur={(event) => emailValidation(field, event.target.value)}
                  onChange={(event) =>
                    onChangeHandler(field, event.target.value)
                  }
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProfileCard;
