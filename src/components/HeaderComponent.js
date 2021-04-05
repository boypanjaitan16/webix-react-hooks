import React from 'react'
import {UserOutlined} from '@ant-design/icons'

export default function Header(){
    return (
        <nav className='flex px-3 md:px-8 py-3 border-b border-gray-300'>
            <div className='w-full md:w-2/12 flex items-center md:space-x-3 md:mr-8'>
                <img src='/logo192.png' className='w-10 h-10'/>
                <h1 className='hidden md:block'>{process.env.REACT_APP_NAME}</h1>
            </div>
            <div className='flex-grow justify-end navbar-menu hidden md:flex flex-col md:flex-row md:items-center md:space-x-5'>
                <a>Admin</a>
                <a>Transaction</a>
                <a>Report</a>
                <a>Rekap Nilai</a>
            </div>
            <div className='flex-none flex md:ml-12 justify-end items-center'>
                <button>
                    <UserOutlined className='text-xl'/>
                </button>
            </div>
        </nav>
    )
}