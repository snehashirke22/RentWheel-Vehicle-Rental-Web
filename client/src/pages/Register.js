import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Register = () => {
  const initialValues = { name: "", email: "", password: "", confirmpassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [borderColors, setBorderColors] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    // Reset border color on input change
    setBorderColors((prevColors) => ({
      ...prevColors,
      [event.target.name]: '',
    }));

    const newObj = { ...formValues, [event.target.name]: event.target.value };
    setFormValues(newObj);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));

    const { name, email, password, confirmpassword } = formValues;
    try {
      const res = await fetch('https://vehicle-rental-web.onrender.com/server/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          name, email, password, confirmpassword
        }),
      });

      if (res.ok) {
        setIsSubmit(true);
      } else {
        const responseData = await res.json();
        console.error(`Registration failed with status ${res.status}`);
        if (res.status === 400 && responseData.message === 'Email already exists') {
          setFormErrors({ email: 'Email is already used. Please use another email address' });
        }}
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      openModal();
      setTimeout(() => {
        setIsSubmit(false);
        closeModal();
        navigate('/login');
      }, 3000);
    }
  }, [formErrors, isSubmit, navigate]);

  const validate = (values) => {
    const errors = {};
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email_regex.test(values.email)) {
      errors.email = "Please enter a valid email";
      setBorderColors((prevColors) => ({
        ...prevColors,
        email: 'red',
      }));
    }
    const passwd_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!passwd_regex.test(values.password)) {
      errors.password = "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character";
      setBorderColors((prevColors) => ({
        ...prevColors,
        password: 'red',
      }));
    }
    if (values.password !== values.confirmpassword) {
      errors.confirmpassword = "Please enter a password that matches the one above";
      setBorderColors((prevColors) => ({
        ...prevColors,
        confirmpassword: 'red',
      }));
    }
    return errors;
  };

  return (
    <>
      <div className="signup_body">
        <div className="signup_container" >
          <div className="left-box">
            <div className="wrapper">
              <h2>Signup</h2>
              <p>Create an account to get access to a wide range of vehicles</p>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="You have logged in successfully!"
                className="modal-content"
                overlayClassName="modal-overlay"
              >
                <h2>Registration Successful!</h2>
                <p>You have successfully signed up. Now Please Login</p>
              </Modal>
              <form action="#" onSubmit={handleSubmit}>
                <div className="input-box" >
                  <label className='label'>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    style={{ borderColor: borderColors.name }}
                    required
                  />
                </div>
                <div className="input-box">
                  <label className='label'>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    style={{ borderColor: borderColors.email }}
                    required
                  />
                </div>
               
                <div className="input-box">
                  <label className='label'>Password</label>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder=""
                    value={formValues.password}
                    onChange={handleChange}
                    style={{ borderColor: borderColors.password }}
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
                {formErrors.password && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.password}</p>}
                <div className="input-box">
                  <label className='label'>Confirm Password</label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder=""
                    value={formValues.confirmpassword}
                    onChange={handleChange}
                    style={{ borderColor: borderColors.confirmpassword }}
                    required
                  />
                </div>
                {formErrors.confirmpassword && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.confirmpassword}</p>}
                <div className="input-box button">
                  <input type="Submit" value="Signup" />
                  <div className="text">
                    <h3>Already have an account? <Link to="/Login" style={{ textDecoration: "underline" }}>Login</Link></h3>
                  </div>
                </div>
                </form>


            </div>
          </div>

          <div className="right-box">
            <img src="assets/signup.png" alt="signup" />
          </div>

        </div>
      </div>
    </>
  )
}

export default Register;