import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { storage } from "../../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  // const decoded = jwtDecode(token);
  const [checkOurServices, setCheckOurServices] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSelectTech, setShowSelectTech] = useState(false);
  const [ProfileData, setProfileData] = useState({});
  const [reportPop, setReportPop] = useState(false);
  const [activeMiddleTab, setActiveMiddleTab] = useState("Activity");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [mainSkills, setMainSkills] = useState([]);
  const nameRef = useRef("");
  const usernameRef = useRef("");
  const bioRef = useRef("");
  const phoneRef = useRef("");
  const userId = "87d9f122-3de6-43ea-8548-714d9a124b39";

  // ===========================REFETCH PART===========================
  const [refetchProject, setRefetchProject] = useState("");
  const [refetchReplyComment, setRefetchReplyComment] = useState(false);
  // ================================REFETCH PART======================

  const {
    data: UserData,
    isLoading: LoadingProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
  });

  const { mutateAsync: mutateAsyncInfo } = useMutation({
    mutationFn: async (data) => {
      setLoading(true);
      try {
        const response = await updateProfile(userId, data);
        setLoading(false);
        return response;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess: () => {
      navigation.navigate("Profile");
    },
  });

  const { mutateAsync: mutateAsyncTechno } = useMutation({
    mutationFn: (data) => updateProfileTechnologie(data, userId),
  });

  const uploadImage = async (imageFile, imageType) => {
    try {
      const response = await fetch(imageFile);
      const blob = await response.blob();
      const filename = imageFile.substring(imageFile.lastIndexOf("/") + 1);

      const storageRef = ref(storage, `/profileImage/${UserData.name}`);
      const imageRef = ref(storageRef, filename);
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);

      return { url: downloadURL, type: imageType };
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let updatedProfileImage = null;
    let updatedCoverImage = null;

    try {
      if (profileImage) {
        const result = await uploadImage(profileImage, "profile");
        if (result) {
          updatedProfileImage = result.url;
        }
      }

      if (coverImage) {
        const result = await uploadImage(coverImage, "cover");
        if (result) {
          updatedCoverImage = result.url;
        }
      }

      const updatedMainSkills = mainSkills.map(
        ({ Technologies: { id: technologiesId } }) => ({
          userId: String(userId),
          technologiesId,
        })
      );

      const Info = {
        name: nameRef.current.value || ProfileData.name,
        userName: usernameRef.current.value || ProfileData.userName,
        bio: bioRef.current.value || ProfileData.bio,
        number: Number(phoneRef.current.value) || Number(ProfileData.number),
        pdp: updatedProfileImage,
        cover: updatedCoverImage,
      };
      await mutateAsyncInfo(Info);
      await mutateAsyncTechno(updatedMainSkills);
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (UserData) {
      setProfileData(UserData);
      nameRef.current = UserData.name;
      usernameRef.current = UserData.username;
      bioRef.current = UserData.bio;
      phoneRef.current = UserData.number;
      setProfileImage(UserData.pdp);
      setCoverImage(UserData.cover);
      setMainSkills(UserData.userTechnology);
    }
  }, [UserData]);

  return (
    <ProfileContext.Provider
      value={{
        LoadingProfile,
        loading,
        refetchProfile,
        ProfileData,
        setProfileData,
        activeMiddleTab,
        setActiveMiddleTab,
        reportPop,
        setReportPop,
        profileImage,
        setProfileImage,
        coverImage,
        setCoverImage,
        setMainSkills,
        mainSkills,
        nameRef,
        usernameRef,
        bioRef,
        phoneRef,
        showSelectTech,
        setShowSelectTech,
        handleSubmit,
        userId,
        refetchProject,
        setRefetchProject,
        refetchReplyComment,
        setRefetchReplyComment,checkOurServices, setCheckOurServices
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
//convert time
export const formatTimeDifference = (createdAt) => {
  const now = moment();
  const postTime = moment(createdAt, "YYYY-MM-DD HH:mm:ss.SSS");
  const duration = moment.duration(now.diff(postTime));

  if (duration.asMinutes() < 60) {
    // Less than 60 minutes
    return moment.duration(duration).humanize(true);
  } else if (duration.asHours() < 24) {
    // Less than 24 hours
    const hours = Math.floor(duration.asHours());
    return `${hours}h`;
  } else {
    // More than 24 hours
    const days = Math.floor(duration.asDays());
    return days === 1 ? "one day" : `${days} days`;
  }
};

async function fetchProfile(userId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/${userId}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

export async function fetchTechnologie(specialtyId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/technologie/${specialtyId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching technologie:", error);
    throw error;
  }
}

export async function updateProfile(userId, data) {
  try {
    const response = await axios.put(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/api/user/update/${userId}`,
      data
    );
    console.log("yeeee111");

    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function updateProfileTechnologie(data, userId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/technologie/user/Technology/${userId}`,
      { data }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating technologie:", error);
    throw error;
  }
}

export const useFetchStudentProjects = (userId) => {
  const userProjects = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Projects/${userId}?limit=6&page=${pageParam}`
    );
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: userProjects,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};

export async function getAllLikesProject(projectId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Projects/Likes/${projectId}`
    );
    return response.json();
  } catch (err) {
    throw new err();
  }
}

export async function getUserLikes(userId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Projects/${userId}/Likes`
    );
    return response.json();
  } catch (err) {
    throw new err();
  }
}

export async function deleteProject(userId, projectId) {
  try {
    const response = await axios.delete(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/posts/Projects/${userId}/${projectId}`
    );
  } catch (err) {
    throw new err();
  }
}
export async function upVoteProject(userId, projectId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/posts/Projects/UpVote/${userId}/${projectId}`
    );
  } catch (err) {
    throw new err();
  }
}

export async function downVoteProject(userId, projectId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/posts/Projects/DownVote/${userId}/${projectId}`
    );
  } catch (err) {
    throw new err();
  }
}

export async function addLikeCommentProject(userId, projectCommentId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Projects/Like/${userId}/${projectCommentId}`
    );
  } catch (err) {
    throw new err();
  }
}
export async function addLikeReplyCommentProject(
  userId,
  projectReplyCommentId
) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Projects/Like/${userId}/Reply/${projectReplyCommentId}`
    );
  } catch (err) {
    throw new err();
  }
}

export async function getAllProjectsComments(project_commentsId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/projects/${project_commentsId}`
    );

    return response.json();
  } catch (err) {
    throw new err();
  }
}
export async function getAllProjectsReplyComments(project_commentsId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/projects/${project_commentsId}/replyComment`
    );
    return response.json();
  } catch (err) {
    throw new err();
  }
}

export async function PostProjectComment(userId, projectId, data) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Projects/${projectId}/${userId}`,
      data
    );
  } catch (err) {
    throw new err();
  }
}
export async function PostProjectReplyComment(userId, projectId, data) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Projects/reply/${projectId}/${userId}/comment`,
      data
    );
  } catch (err) {
    throw new err();
  }
}
