import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import Footer from './Pages/Footer/Footer';
import Navbar from './Pages/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import BookDetail from './Pages/Home/BookDetails';
import RequireAuth from './Pages/RequireAuth/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import UserProfile from './Pages/Dashboard/UserProfile';
import BorrowedBookList from './Pages/Dashboard/BorrowedBookList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './Pages/Dashboard/Users';
import AdminAuth from './Pages/RequireAuth/AdminAuth';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='login' element={<Login></Login>}></Route>
        <Route path='register' element={<Register></Register>}></Route>
        <Route path='/book/:id' element={
          <RequireAuth>
            <BookDetail></BookDetail>
          </RequireAuth>}>
        </Route>
        <Route path='dashboard' element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>}>
          <Route index element={<UserProfile></UserProfile>}></Route>
          <Route path='borrowedbook' element={<BorrowedBookList></BorrowedBookList>}></Route>
          <Route path='users' element={
            <AdminAuth>
              <Users></Users>
            </AdminAuth>}>
          </Route>
        </Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
