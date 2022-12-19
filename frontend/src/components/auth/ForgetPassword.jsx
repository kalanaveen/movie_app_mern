import React from 'react';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import Container from '../Container';

function ForgetPassword() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
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
    </div>
  );
}

export default ForgetPassword;
