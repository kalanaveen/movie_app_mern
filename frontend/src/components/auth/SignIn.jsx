import React from 'react';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import Title from '../form/Title';

function SignIn() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl mx-auto">
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
            <a href="#" className="text-dark-subtle hover:text-white">
              Forget Password
            </a>
            <a href="#" className="text-dark-subtle hover:text-white">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
