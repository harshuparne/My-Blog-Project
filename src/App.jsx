import './App.css'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import Home from './Pages/Home'
import BlogPage from './Pages/BlogPage'
import TagPage from './Pages/TagPage'
import CategoryPage from './Pages/CategoryPage'


function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParam, setSearchParam] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page = searchParam.get('page') ?? 1;

    if (location.pathname.includes("tags")) {
      // iska matlab tag wala page show krna h
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag);
    }
    else if (location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      fetchBlogPosts(Number(page));
    }

  }, [location.pathname, location.search]
  );

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/blog/:blogId' element={<BlogPage />} />
      <Route path='/tags/:tag' element={<TagPage />} />
      <Route path='/categories/:categroy' element={<CategoryPage />} />
    </Routes>
  );
}

export default App
