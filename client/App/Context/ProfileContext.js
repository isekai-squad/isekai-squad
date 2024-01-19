import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { storage } from "../../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const navigation = useNavigation();
  const [checkOurServices, setCheckOurServices] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSelectTech, setShowSelectTech] = useState(false);
  const [ProfileData, setProfileData] = useState({});
  const [activeMiddleTab, setActiveMiddleTab] = useState("Activity");
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [mainSkills, setMainSkills] = useState([]);
  const nameRef = useRef("");
  const usernameRef = useRef("");
  const bioRef = useRef("");
  const phoneRef = useRef("");
  const linkedInRef = useRef("");
  const githHubRef = useRef("");
  const [userId, setUserId] = useState();
  const [showTabBar, setShowTabBar] = useState(true);

  const getCurrentUser = async () => {
    const res = await SecureStore.getItemAsync("Token");
    const decodeResult = jwtDecode(res);

    setUserId(decodeResult.id);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  // ===========================REFETCH PART===========================

  const [refetchPosts, setRefetchPosts] = useState(false);

  // ================================REFETCH PART======================

  const {
    data: UserData,
    isLoading: LoadingProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: Boolean(userId),
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
        Linkedin: linkedInRef.current.value || ProfileData.Linkedin,
        GitHub: githHubRef.current.value || ProfileData.GitHub,
      };
      await mutateAsyncInfo(Info);
      if (ProfileData.role === "STUDENT") {
        await mutateAsyncTechno(updatedMainSkills);
      }
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
      linkedInRef.current = UserData.Linkedin;
      githHubRef.current = UserData.GitHub;
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
        linkedInRef,
        githHubRef,
        showSelectTech,
        setShowSelectTech,
        handleSubmit,
        userId,
        refetchPosts,
        setRefetchPosts,
        checkOurServices,
        setCheckOurServices,
        showTabBar,
        setShowTabBar,
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
    try {
      const { data } = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Projects/${userId}?limit=3&page=${pageParam}`
      );
      return data;
    } catch (err) {
      console.error(err, "Error fetching student projects");
      throw err;
    }
  };
  const data = useInfiniteQuery({
    queryKey: ["projes", userId],
    queryFn: userProjects,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return 1; // Handle initial fetch
      if (lastPage.length === 0) return undefined; // No more pages
      return allPages.length + 1;
    },
  });
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return data;
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
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/${userId}/Likes`
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

export async function deletePost(userId, postId) {
  try {
    const response = await axios.delete(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/posts/Posts/${userId}/${postId}`
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
// -------------------------COMPANY && ADVISOR------------

export function useFetchUserPosts(userId) {
  const userPosts = async ({ pageParam = 1 }) => {
    try {
      const { data } = await axios.get(
        `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Post/${userId}?limit=6&page=${pageParam}`
      );

      return data;
    } catch (err) {
      console.error(err, "Error fetching student projects");
      throw err;
    }
  };

  const data = useInfiniteQuery({
    queryKey: ["Posts", userId],
    queryFn: userPosts,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return 1; // Handle initial fetch
      if (lastPage.length === 0) return undefined; // No more pages
      return allPages.length + 1;
    },
  });
  return data;
}
export async function getAllLikesPosts(postId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Posts/Posts/Likes/${postId}`
    );
    return response.json();
  } catch (err) {
    throw new err();
  }
}

export async function upVotePost(userId, postId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/posts/Posts/UpVote/${userId}/${postId}`
    );
  } catch (err) {
    throw new err();
  }
}
export async function downVotePost(userId, postId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/posts/Posts/DownVote/${userId}/${postId}`
    );
  } catch (err) {
    throw new err();
  }
}

export async function addLikeCommentPost(userId, postCommentId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Posts/Like/${userId}/${postCommentId}`
    );
  } catch (err) {
    throw new err();
  }
}
export async function addLikeReplyCommentPost(userId, postReplyCommentId) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Posts/Like/${userId}/Reply/${postReplyCommentId}`
    );
  } catch (err) {
    throw new err();
  }
}

export async function getAllPostsComments(postId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Posts/${postId}`
    );

    return response.json();
  } catch (err) {
    throw new err();
  }
}

export async function getAllPostsReplyComments(post_commentsId) {
  try {
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Posts/${post_commentsId}/replyComment`
    );
    return response.json();
  } catch (err) {
    throw new err();
  }
}

export async function PostPostsComment(userId, postId, data) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Posts/${postId}/${userId}`,
      data
    );
  } catch (err) {
    throw new err();
  }
}

export async function PostPostsReplyComment(userId, post_commentsId, data) {
  try {
    const response = await axios.post(
      `http://${process.env.EXPO_PUBLIC_IP_KEY}:4070/Comments/Posts/reply/${post_commentsId}/${userId}/comment`,
      data
    );
  } catch (err) {
    throw new err();
  }
}
