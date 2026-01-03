import React from 'react'
import SubmitBtn from './SubmitBtn'

function UseFormStatus1() {
  const submitFn = () => {
    setTimeout(() => {

      console.log("Logged in");
    }, 2000)
  }
  return (
    <div>
      <form action={submitFn}>
        <input type="text" placeholder='username' />
        <input type="text" placeholder='password' />
        <SubmitBtn />
      </form>
    </div>
  )
}

export default UseFormStatus1