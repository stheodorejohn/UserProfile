import {
  locationAPIURL,
  API_URL,
  Auth_Token,
  locationAPIKey,
} from "../data/constants";

export const getUserProfileData = () => {
  const userProfileAPIData = fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth_Token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let profileData = {
        email: data.profile.email,
        username: data.profile.username,
        display_name: data.profile.display_name,
        avatar_URI: data.profile.avatar_uri,
        fetchedData: true,
      };
      return profileData;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  return userProfileAPIData;
};

export const getLocation = async () => {
  const locationAPIData = await fetch(`${locationAPIURL}${locationAPIKey}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let locationData = {
        location: data.city,
      };
      return locationData;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  return locationAPIData;
};
