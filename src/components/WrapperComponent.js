import React, {useEffect, useState, createRef, forwardRef} from "react";
import {
    UserOutlined, SearchOutlined, DatabaseOutlined,
    AlignLeftOutlined, CloudUploadOutlined, LoginOutlined,
    CloseOutlined, BellOutlined, SettingOutlined
} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {Badge} from 'antd'
import Header from "./HeaderComponent";
import {clearSession} from '../redux/actions'

const ForwardedHeader = forwardRef((props, ref) => (
    <Header forwardedRef={ref} {...props}/>
))

const menus     = [
    {
        title   : 'User Management', link : '/author', icon : <UserOutlined/>
    },
    {
        title   : 'Database', link : '/author/book', icon : <DatabaseOutlined/>
    },
    {
        title   : 'School Settings', link : '/author/profile', icon : <SettingOutlined/>
    },
]

const mainBgColor    = 'bg-white'

function PageWrapper({children, head, title}) {
    const headerRef = createRef()

    const user      = useSelector(state => state.session.user)
    const dispatch  = useDispatch()
    const [openNav, setOpenNav]             = useState(false)
    const [headerHeight, setHeaderHeight]   = useState(0)
    const [showSidebar, setShowSidebar]     = useState(false)

    const signOut = () => {
        dispatch(clearSession())
    }

    useEffect(() => {
        setHeaderHeight(headerRef.current?.clientHeight);
    }, [headerRef])

    // useEffect(() => {
    //     setShowSidebar(false)
    // }, [location.pathname])

    return (
        <>
            <ForwardedHeader
                ref={headerRef}
                openNav={openNav}
                headerHeight={headerHeight}
                bgColor={mainBgColor}
                searchBtn={
                    <button
                        onClick={() => setOpenNav(!openNav)}
                        className='focus:outline-none md:hidden text-xl items-center flex'>

                        {openNav ? <CloseOutlined/>:<SearchOutlined/>}
                    </button>
                }
                burgerBtn={
                    <button
                        onClick={() => {
                            setShowSidebar(!showSidebar)
                            setOpenNav(false)
                        }}
                        className='focus:outline-none md:hidden text-xl items-center flex'>
                        <AlignLeftOutlined/>
                    </button>
                }/>

            <div className={`flex md:fixed inset-x-0 z-10`} style={{height: `calc(100vh - ${openNav ? '0px' : `${headerHeight+2}px`})`, [openNav ? 'paddingTop' : 'top']: headerHeight}}>
                <div className={`${showSidebar ? 'fixed flex inset-y-0 bg-black bg-opacity-50 z-40 md:hidden' : 'hidden md:block'} h-full w-full md:w-1/4 lg:w-1/5 flex-none`}>

                    <nav className={`md:py-0 leading-loose w-8/12 md:w-full border-r border-gray-300 flex flex-col bg-white md:${mainBgColor} h-full`}>
                        
                        <div className="p-5 md:pr-0 flex-grow">
                            <ul>
                                {menus.map(item => (
                                    <li key={item.title} className={`block`}>
                                        <a className='flex items-center text-lg text-black hover:text-blue-400 hover:bg-white px-3 py-2 rounded-full'>
                                            {item.icon}
                                            <span className='ml-2'>{item.title}</span>
                                        </a>
                                    </li>
                                ))}
                                <li className={`block md:hidden`}>
                                    <Badge offset={[0, 15]} count={user?.notif}>
                                        <a className='flex items-center text-lg text-black hover:text-blue-400 hover:bg-white px-3 py-2 rounded-full'>
                                            <BellOutlined/>
                                            <span className='ml-2'>Notification</span>
                                        </a>
                                    </Badge>
                                </li>
                                <li className={`block md:hidden`}>
                                    <a className='flex items-center text-lg text-black hover:text-blue-400 hover:bg-white px-3 py-2 rounded-full'>
                                        <CloudUploadOutlined/>
                                        <span className='ml-2'>Upload Book</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={signOut} className='flex items-center text-lg text-black hover:text-blue-400 hover:bg-white px-3 py-2 rounded-full'>
                                        <LoginOutlined/>
                                        <span className='ml-2'>Sign-out</span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <p className='flex items-center pl-7 md:px-7 text-xs'>
                            Copyright &copy; {new Date().getFullYear()} &nbsp; <a>{process.env.NEXT_PUBLIC_APP_NAME}</a>
                        </p>
                    </nav>
                    <section onClick={() => setShowSidebar(false)} className='flex-grow'/>
                </div>

                <main className={`flex-grow ${mainBgColor} md:overflow-y-auto`}>
                {children}
                </main>
            </div>
        </>
    )
}

export default PageWrapper
