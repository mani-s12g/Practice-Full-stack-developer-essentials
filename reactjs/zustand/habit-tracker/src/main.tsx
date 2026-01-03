import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "tailwindcss"
import App from './App.tsx'
import TodoCom from './components/TodoCom.tsx'
import Todo from './components/Todo.tsx'
import ShoppingCart from './components/ShoppingCart.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <TodoCom /> */}
    {/* <Todo /> */}
    <ShoppingCart />  
  </StrictMode>,
)
