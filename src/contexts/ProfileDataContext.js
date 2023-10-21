import { createContext, useContext, useState, useEffect } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({children}) => {

  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const currentUser = useCurrentUser();

  const handleStar = async (clickedProfile) => {
    try {
      const {data} = await axiosRes.post('/stars/', {profile: clickedProfile.id})
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) => {
            return profile.id === clickedProfile.id
            ? {...profile, stars_count: profile.stars_count + 1, star_id: data.id}
            : profile;
          })
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) => {
            return profile.id === clickedProfile.id
            ? {...profile, stars_count: profile.stars_count + 1, star_id: data.id}
            : profile;
          })
        }
      }))
    } catch(err) {
      // console.log(err)
    }
  }

  const handleUnStar = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/stars/${clickedProfile.star_id}/`)
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) => {
            return profile.id === clickedProfile.id
            ? {...profile, stars_count: profile.stars_count - 1, star_id: null}
            : profile;
          })
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) => {
            return profile.id === clickedProfile.id
            ? {...profile, stars_count: profile.stars_count - 1, star_id: null}
            : profile;
          })
        }
      }))
    } catch(err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    const handleMount = async () => {
      try {
        const {data} = await axiosReq.get("/profiles/?ordering=-stars_count");
        setProfileData(prevState => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{setProfileData, handleStar, handleUnStar}}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  )
}