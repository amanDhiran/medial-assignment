import './App.css'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
