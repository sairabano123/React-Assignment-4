import './App.css';
import 'bootstrap';
import Header from './components/Layout/Header';
import "bootstrap/dist/css/bootstrap.min.css"
import Footer from './components/Layout/Footer';
import SignUp from './components/Forms/SignUp';
import SignIn from './components/Forms/SignIn';
import { useState } from 'react';
import Blogs from './components/Blogs/Blogs';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import TransferForm from './components/Forms/TransferForm';
import ProtectedRoute from './ProtectedRoute';


function App() {

  const navigate = useNavigate();
  const [users, setUsers] = useState(
    [{
      name: "Saira Bano",
      email: "noonarisaira@gmail.com",
      password: "abcd",
      failedAttempts: 0
    }]
  );

  const [userLoginFlag, setUserLoginFlag] = useState(false);




  const registerUser = (userData) => {
    setUsers((prevUsers) => {
      return [...prevUsers, userData]
    });
    navigate('sign-in');
  }


  const failedAttempt = (failedUser) => {
    setUsers((prevUsers) => {
      return prevUsers.map(user => {
        if (user.email === failedUser.email) {
          return failedUser;
        }
        return user;
      })
    })
  }

  return (

    < div className="App">
      <Header isUserLoggedIn={userLoginFlag} />
      <Routes>
        <Route path='dashboard' element={
          <ProtectedRoute isAllowed={userLoginFlag}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='transfer' element={
          <ProtectedRoute isAllowed={userLoginFlag}>
            <TransferForm />
          </ProtectedRoute>
        } />
        <Route path='blogs' element={
          <ProtectedRoute isAllowed={userLoginFlag}>
            <Blogs />
          </ProtectedRoute>
        } />
        <Route path='/' element={<SignUp registerUser={registerUser} />} />
        <Route path='sign-in' element={
          <SignIn users={users} failedAttempt={failedAttempt} setUserLoginFlag={setUserLoginFlag} />
        } />
      </Routes>
      <Footer />
    </div>

  );
}

export default App;
