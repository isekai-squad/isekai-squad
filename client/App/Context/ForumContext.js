
import React , { createContext, useState,useContext } from "react";

export const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [refetch, setRefetch] = useState();
  const [post , setPost] = useState({})
  const [posts , setPosts] = useState([])
  const [category , setCategory] = useState("")
  
  
  return <ForumContext.Provider value={{refetch , setRefetch}}>{children}</ForumContext.Provider>;
  
};
