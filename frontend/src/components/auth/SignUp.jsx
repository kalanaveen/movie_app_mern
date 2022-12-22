import React from 'react';
import { commonModalClasses } from '../../utils/theme';
import Container from '../Container';
import CustomLink from '../CustomLink';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';
import FormContainer from '../FormContainer';

function SignUp() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses +" w-72"}>
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
    </FormContainer>
  );
}

export default SignUp;
