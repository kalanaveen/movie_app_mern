import React, { useState } from 'react';
import { commonModalClasses } from '../../utils/theme';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import FormContainer from '../FormContainer';

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = userInfo;
  
  const handleChange = ({target}) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    validateUserInfo(userInfo);
  }

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
