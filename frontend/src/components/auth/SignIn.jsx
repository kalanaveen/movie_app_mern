import React from 'react';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import CustomLink from '../CustomLink';
import Container from '../Container';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

function SignIn() {
  const theme = useContext(ThemeContext);
  theme.method();
  
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign In</Title>
          <FormInput
            name="email"
            placeholder="naveen@gmail.com"
            label="Email"
          />
          <FormInput name="password" placeholder="*******" label="Password" />
          <Submit />
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SignIn;
