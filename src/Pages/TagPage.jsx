import React from 'react'
import Header from '../components/Header'
import Blogs from '../components/Blogs'
import Pagination from '../components/Pagination'
import { useLocation,useNavigate } from 'react-router-dom'

const TagPage = () => {

    const navigation = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split("/").at(-1);

    return (
        <div>
            <Header />
            <div className='py-24 max-w-[720px] px-[25px] mx-auto'>
                <div className='mb-8 flex items-center gap-3'>
                <button className='border-2 rounded-md border-[#dfdfdf] py-1 px-4 hover:bg-[#efefef] transition-all'
                    onClick={() => Navigation(-1)}
                >
                    back
                </button>
                <h2 className='font-bold'>
                    Blogs Tagged<span className='text-blue-700'>#(tag)</span>
                </h2>
            </div>
            <Blogs />
            </div>
            <Pagination />
        </div>
    )
}

export default TagPage
