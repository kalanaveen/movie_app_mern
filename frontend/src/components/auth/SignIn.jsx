import React from 'react';

function SignIn() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl mx-auto">
        <form className="bg-secondary rounded p-6">
          <h1 className="text-xl text-white font-semibold text-center">
            Sign In
          </h1>
          <div className="flex flex-col-reverse">
            <input
              type="text"
              id="email"
              className="bg-transparent border-dark-subtle border-2 rounded focus:border-white text-white p-1 w-full text-lg outline-none peer transition"
              placeholder="naveen@gmail.com"
            />
            <label
              htmlFor="email"
              className="font-semibold text-dark-subtle peer-focus:text-white transition self-start"
            >
              Email
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
