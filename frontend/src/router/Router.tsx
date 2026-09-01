import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import LandingPage from '../pages/LandingPage/LandingPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import TasksPage from '../pages/TasksPage/TasksPage'
import DefaultPage from '../pages/DefaultPage'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/check" element={<DefaultPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default Router