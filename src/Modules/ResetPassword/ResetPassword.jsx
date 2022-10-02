import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useSearchParams  } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authHeader from '../../Global/auth-header';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './ResetPassword.scss'
import resetPasswordServices from './Services/resetPassword.services';
const ResetPassword = () => {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password length should be at least 8 characters'),
    cpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match')
  });

  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema)
  });

  const onSubmit = (data) => {
    setLoading(true);
    delete data.cpassword;
    setMessage('');
    setSuccessful(false);
    const token = "Bearer "+searchParams.get('token')
    resetPasswordServices.resetPassword(token,data).then(
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
        console.log(error)
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
    <section id="resetPassword" className="register-container">
      <div className="card">
        <h2 className="">New password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="alerts">{errors.password?.message}</p>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register('password')}
          />

          <p className="alerts">{errors.cpassword?.message}</p>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            {...register('cpassword')}
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : <></>}
            Set Password
          </Button>
          {/* <button>Create Account</button> */}
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
}

export default ResetPassword