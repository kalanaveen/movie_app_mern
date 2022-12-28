import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/auth';
import { useNotification } from '../../hooks';
import { commonModalClasses } from '../../utils/theme';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import FormContainer from '../FormContainer';


const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidName = /^[a-zA-Z]+$/

  if (!name.trim()) return { ok: false, error: 'Name is missing' }
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" }
  
  if (!email.trim()) return { ok: false, error: 'Email is missing' }
  if (!isValidEmail.test(email)) return { ok: false, error: "Invalid Email" }
  
  if (!password.trim()) return { ok: false, error: 'Password is missing' }
  if (password.length < 8) return { ok: false, error: "Password must be 8 characters long!" }
  
  return { ok: true };
}

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { name, email, password } = userInfo;
  
  const handleChange = ({target}) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification('error',error);
    
    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);
    
    navigate('/auth/verification', {
      state: { user: response },
      replace: true,
    });
    
  };

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + ' w-72'} onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            name="name"
            placeholder="Naveen kala"
            label="Name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            name="email"
            placeholder="naveen@gmail.com"
            label="Email"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            name="password"
            placeholder="*******"
            label="Password"
            type="password"
          />
          <Submit value="SignUp" />
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signin">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default SignUp;
