import React from 'react';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Container from '../Container';

function ForgetPassword() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
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
    </div>
  );
}

export default ForgetPassword;
