import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
// import {message} from 'antd'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {UserOutlined} from '@ant-design/icons'
import {setSession} from '../redux/actions'
import {TextField} from '@material-ui/core'
import {Button} from 'antd'

export default function SignIn(){
    const dispatch  = useDispatch()
    const history   = useHistory()
    const {register, errors, handleSubmit}  = useForm()
    const [isLoading, setLoading]           = useState(false)

    const submit = (params) => {
        setLoading(true)
        
        console.log(params)
        window.axios.post('/login', params)
            .then(res => {
                const {data}    = res.data

                setLoading(false)
                dispatch(setSession(data))
                history.push('/')
            })
            .catch(err => {
                setLoading(false)
            })
    }

    return (
        <div className='flex w-full h-screen place-items-center items-center flex-col'>
        
            <form onSubmit={handleSubmit(submit)} className='md:border-2 relative md:border-gray-300 mx-6 my-auto md:m-auto w-full md:w-5/12 lg:w-4/12 rounded-lg p-8 h-auto'>
                

                <h4 className='text-2xl mb-8 mt-5 flex items-center'>
                    <UserOutlined className='mr-3'/> Sign-in to {process.env.REACT_APP_NAME}
                </h4>
                <div className='mb-2'>
                    <TextField 
                        type="text"
                        required
                        size='small'
                        label="NIK"
                        name="nik"
                        variant="outlined"
                        helperText={errors.nik?.message}
                        error={!!errors.nik}
                        fullWidth
                        inputRef={
                            register({
                                required    : 'NIK cannot be empty',
                                
                            })
                        }/>
                </div>
                
                <div>
                    <TextField 
                        type="password"
                        required
                        size='small'
                        label="Password"
                        name="password"
                        variant="outlined"
                        helperText={errors.password?.message}
                        error={!!errors.password}
                        fullWidth
                        inputRef={
                            register({
                                required    : 'Password cannot be empty',
                                
                            })
                        }/>
                </div>
                <p className='text-right mb-10 mt-3 text-sm'>
                    <a href='#/forgot-password'>Forgot Password</a>
                </p>

                <p className=''>
                    <Button block loading={isLoading} type='primary' htmlType='submit' size='large'>
                        Sign In
                    </Button>
                </p>
            </form>
        </div>
    )
}