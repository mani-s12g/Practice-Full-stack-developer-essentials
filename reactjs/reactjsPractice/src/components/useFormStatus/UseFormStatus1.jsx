import React from 'react'
import SubmitBtn from './SubmitBtn'

function UseFormStatus1() {
    const submitFn = () => {
        console.log("Logged in");
    }
  return (
    <div>
        <form action={submitFn}>
            <input type="text" placeholder='username'/>
            <input type="text" placeholder='password'/>
            <SubmitBtn />
        </form>
    </div>
  )
}

export default UseFormStatus1