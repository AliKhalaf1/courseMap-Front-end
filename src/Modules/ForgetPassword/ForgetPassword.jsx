import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import authHeader from '../../Global/auth-header';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './ForgetPassword.scss';
import forgetPasswordservices from './Services/forgetPassword.services';
const ForgetPassword = () => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const { register, handleSubmit } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = (data) => {
    setLoading(true);
    delete data.cpassword;
    setMessage('');
    setSuccessful(false);
    forgetPasswordservices.forgetPassword(data).then(
      (response) => {
        setLoading(false);
        setSuccessful(true);
        const resMessage =
          (response.response && response.response.data && response.response.data.message) ||
          response.message ||
          response.toString();
        setMessage(resMessage);
      },
      (error) => {
        setLoading(false);
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        console.log(resMessage);
        setSuccessful(false);
      }
    );
  };
  if (loggedIn) return <Navigate to="/" />;
  return (
    <section id="forgotPassword" className="register-container">
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Enter your E-mail</h4>
          <input
            type="email"
            className="form-control mt-3"
            placeholder="Email"
            {...register('email')}
          />

          <Button type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : <></>}
            Send Link
          </Button>
        </form>
        {message && (
          <div className="form-group">
            <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgetPassword;
