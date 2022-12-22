import React from 'react';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Container from '../Container';
import FormContainer from '../FormContainer';
import { commonModalClasses } from '../../utils/theme';

function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            name="password"
            placeholder="*******"
            label="New Password"
          />
          <FormInput
            name="confirmPassword"
            placeholder="*******"
            label="Confirm Password"
          />
          <Submit value="Send Link" />
        </form>
      </Container>
    </FormContainer>
  );
}

export default ForgetPassword;
