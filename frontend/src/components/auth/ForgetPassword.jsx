import React from 'react';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import Container from '../Container';
import FormContainer from '../FormContainer';
import { commonModalClasses } from '../../utils/theme';

function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses +" w-96"}>
          <Title>Please Enter Your Email</Title>
          <FormInput
            name="email"
            placeholder="naveen@gmail.com"
            label="Email"
          />
          <Submit value="Send Link"/>
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/signin">Sign In</CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default ForgetPassword;
