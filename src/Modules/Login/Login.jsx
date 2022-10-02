import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useForm } from 'react-hook-form';
import loginServices from './Services/login.services';
import { Navigate, useSearchParams } from 'react-router-dom';
import authHeader from '../../Global/auth-header';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
const Login = ({ location }) => {
  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const { register, handleSubmit } = useForm({
    mode: 'onTouched'
  });
  useEffect(() => {
    if (searchParams.get('emailConfirmed') === 'true') {
      setMessage('Your email has been confirmed, you can login now.');
      setSuccessful(true);
    }
  }, [searchParams]);
  const onSubmit = (data) => {
    setLoading(true);
    setMessage('');
    setSuccessful(false);
    loginServices.login(data).then(
      (response) => {
        setLoading(false);
        setSuccessful(true);
        setMessage('Successful');
        window.location.reload();
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
    <section className="register-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" className="form-control" placeholder="Email" {...register('email')} />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register('password')}
          />
          <div>
            <a href="/register">Create an account</a>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : <></>}
            Login
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

export default Login;
