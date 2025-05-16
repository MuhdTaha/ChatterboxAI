import { SignIn } from '@clerk/clerk-react'
import './signin.css'

const Signin = () => {
  return (
    <div className='signIn'>
      <SignIn path='/sign-in' signUpUrl='/sign-up' forceRedirectUrl='/dashboard'/>
    </div>
  )
}

export default Signin