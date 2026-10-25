import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import CreatePost from './pages/CreatePost.jsx';
import Feed from './pages/Feed.jsx';

const App = () => {
  return (
    <Router>
      <div className='app-shell'>
        <header className='site-header'>
          <nav className='site-nav' aria-label='Main navigation'>
            <NavLink className='brand' to='/create-post' aria-label='Yudh home'>
              <span className='brand-mark' aria-hidden='true'><span /></span>
              <span>yudh</span>
            </NavLink>
            <div className='nav-links'>
              <NavLink to='/create-post'>Create</NavLink>
              <NavLink to='/feed'>Gallery</NavLink>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Navigate to='/create-post' replace />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/feed' element={<Feed />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
