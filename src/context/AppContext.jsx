import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

// Step 1: Create
export  const AppContext = createContext();

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate=useNavigate();

    //data filling pending

    async function fetchBlogPosts(page = 1,tag=null,category) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url += `&tag=${tag}`;
        }
        if(category){
            url += `&category=${category}`;
        }
        try {
            const res = await fetch(url);
            const data = await res.json();
            if(!data.posts || data.posts.length===0)
                throw new Error("Somwthing went wrong")
            console.log("APi Responce",data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        catch (error) {
            console.error("Error in fetching BlogPosts",error);
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    };

    // Handle when Next and Previous button are clicked
    function handlePageChange(page){
        navigate({search:`page=${page}`});
        setPage(page);
    };

    const value = {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        handlePageChange,
        fetchBlogPosts
    };

    // Step 2: Provider
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}