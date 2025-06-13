import React, { useState, useEffect} from 'react'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {currentState === 'Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800 rounded-2xl' placeholder='Name' required /> }
        <input type="email" className='w-full px-3 py-2 border border-gray-800 rounded-2xl' placeholder='Email' required />
        <input type="Password" className='w-full px-3 py-2 border border-gray-800 rounded-2xl' placeholder='Password' required />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password ?</p>
          {
            currentState === 'Login' ? 
            <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create an account</p> : 
            <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login Here</p>
          }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up' }</button>
      </form>
      {/* <div className='flex flex-col items-center gap-2'>
        <button className='bg-gray-800 text-white px-4 py-2 rounded-2xl w-40 mt-10'>Submit</button>
        <p className='text-sm'>
          {currentState === 'Login' ? "Don't have an account?" : "Already have an account?"}
          <span 
            className='text-amber-600 cursor-pointer ml-3' 
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
          >
            {currentState === 'Login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
        <p className='text-sm'>Forgot Password?</p>
      </div> */}
    </div>
  )
}

export default Login