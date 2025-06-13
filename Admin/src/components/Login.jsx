import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      setTimeout(() => {
        if (response.data.success) {
          setToken(response.data.token)
          toast.success(response.data.message || "Login successful!")
        } else {
          toast.error(response.data.message)
        }
        setLoading(false)
      }, 3000);
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-2'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium test-gray-700 mb-2'>Email Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-700 outline-none' type="email" placeholder='your@gmail.com' required />
          </div>

          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium test-gray-700 mb-2'>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-700 outline-none' type="password" placeholder='Enter Your Password' required />
          </div>

          <button
            className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer'
            type='submit'
            disabled={loading}
            >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login