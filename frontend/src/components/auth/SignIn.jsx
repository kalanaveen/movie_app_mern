import React from 'react';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import CustomLink from '../CustomLink';
import Container from '../Container';
import { commonModalClasses } from '../../utils/theme';
import FormContainer from '../FormContainer';


function SignIn() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses +" w-72"}>
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
    </FormContainer>
  );
}

export default SignIn;
