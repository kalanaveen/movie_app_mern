import React from 'react';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

function SignUp() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign Up</Title>
          <FormInput name="name" placeholder="Naveen kala" label="Name" />
          <FormInput
            name="email"
            placeholder="naveen@gmail.com"
            label="Email"
          />
          <FormInput name="password" placeholder="*******" label="Password" />
          <Submit value="SignUp" />
          <div className="flex justify-between items-center">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signin">Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SignUp;
