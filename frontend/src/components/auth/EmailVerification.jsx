import React from 'react';
import Title from '../form/Title';
import Submit from '../form/Submit';
import Container from '../Container';
import { useState, useRef, useEffect } from 'react';
import FormContainer from '../FormContainer';
import { commonModalClasses } from '../../utils/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyUserEmail } from '../../api/auth';
import { useNotification } from '../../hooks';

let currentOTPIndex;
let OTP_LENGTH = 6;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

function EmailVerification() {
  const [otp, setOTP] = useState(new Array(OTP_LENGTH).fill(''));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();
  const { updateNotification } = useNotification();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(currentOTPIndex);
    else focusNextInputField(currentOTPIndex);

    setOTP([...newOtp]);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === 'Backspace') {
      focusPrevInputField(currentOTPIndex);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) return updateNotification('error','Invalid OTP');

    // submit otp
    const { error, message } = await verifyUserEmail({
      otp: otp.join(""),
      userId: user.id,
    });
    
    if (error) return updateNotification('error',error);

    updateNotification('success',message)
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
  }, [user,navigate]);

  return (
    <FormContainer>
      <Container>
        <form onClick={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please Enter The OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  value={otp[index]}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="number"
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
          <Submit value="Verify Email" />
        </form>
      </Container>
    </FormContainer>
  );
}

export default EmailVerification;
