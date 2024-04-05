import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { AuthProvider, useAuth } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);

  const { login } = useAuth(); 

  const handleChange = (event) => {
      const newObj = { ...formValues, [event.target.name]: event.target.value };
      setFormValues(newObj);
  };

  const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const openLoginModal = () => {
      setIsModalOpenLogin(true);
  };

  const closeLoginModal = () => {
      setIsModalOpenLogin(false);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const { email, password } = formValues;
      try {
          const res = await fetch('http://localhost:8000/server/auth/login', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              credentials: 'include',
              body: JSON.stringify({ email, password }),
          });
          
          if (res.ok) {
              const data = await res.json();
              console.log(data);
              const { name, email } = data.user;
              login({ name, email });
              setTimeout(() => {
                openLoginModal();
                closeLoginModal();
                navigate('/');
              }, 3000);
          } else {
              setFormErrors('Invalid credentials!');
              document.getElementById('password').style.borderColor = 'red';
              document.getElementById('email').style.borderColor = 'red';
          }
      } catch (err) {
          console.log(err);
          if (err.response && err.response.status === 401) {
              setFormErrors('Invalid credentials!');
          } else {
              setFormErrors('An error occurred. Please try again later.');
          }
      }
  };

  return (
    <>
      <div className="login_body">
        <div className="login_container">
          <div className="left">
            <img src="assets/login.png" alt="" />
          </div>
          <div className="right">
            <div className="login_wrapper">
              <div className="mobile">
                <img src="assets/login.png" alt="" />
              </div>

              <h2>Login</h2>
              <p>Welcome Back!</p>

              {formErrors && <p style={{ color: 'red', fontWeight: '600' }}>{formErrors}</p>}

              <Modal
                isOpen={isModalOpenLogin}
                onRequestClose={closeLoginModal}
                contentLabel="You have logged in successfully!"
                className="modal-content"
                overlayClassName="modal-overlay"
              >
                <h2>Login Successful!</h2>
                <p>You have successfully logged in.</p>
              </Modal>

              <form action="#" onSubmit={handleSubmit}>
                <div className='input-box'>
                  <label className='label'>Email address</label>
                  <input type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required

                  />
                </div>

                <div className="input-box">
                  <label className='label'>Password</label>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className='remember'>
                  <input type="checkbox" />
                  <label>Remember me</label>
                  <Link to="/forgotpassword" className='forgot'> forgot passsword ?</Link>
                </div>

                <div className="input-box button">
                  <input type="submit" value="Login" />
                  <div className="text">
                    <h3>Don't have an account? <Link to="/Register" style={{ textDecoration: "underline" }}>SignUp</Link></h3>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
