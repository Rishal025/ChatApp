import { BrowserRouter , Routes, Route, redirect } from 'react-router-dom'
import UseAuth from './Hooks/UseAuth'
import './index.css'
import DashboardPage from './Pages/DashboardPage'
import FindFriendsPage from './Pages/FindFriendsPage'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import LoginPage from './Pages/LoginPage'
import MessengerPage from './Pages/MessengerPage'
import ProfilePage from './Pages/ProfilePage'
import RegisterPage from './Pages/RegisterPage'
import RequestPage from './Pages/RequestPage'

function App() {
  const { auth } = UseAuth();
  return (
<BrowserRouter>
    <Routes>
           <Route exact path='/'element={<DashboardPage/>}/>
           <Route path='/register' element={<RegisterPage/>}/>
           <Route path='/login' element={<LoginPage/>}/>
           <Route path='/addfriends' element={<FindFriendsPage/>}/>
           <Route path='/requests' element={<RequestPage/>}/>
           <Route path='/profile' element={<ProfilePage/>}/>
           <Route path='/fgtpassword' element={<ForgotPasswordPage/>}/>
           <Route path='/chat' element={<MessengerPage/>}/>
    </Routes>
</BrowserRouter>
  )
}

export default App
