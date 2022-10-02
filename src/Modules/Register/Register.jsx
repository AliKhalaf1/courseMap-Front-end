import React, { useState } from 'react';
import './Register.scss';
import { useForm } from 'react-hook-form';
import { addUser } from './Services/register.services';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authHeader from '../../Global/auth-header';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import majors from '../../Assets/json/majors.json';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const Register = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
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
  const [major, setMajor] = useState('');
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
    addUser(data).then(
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
    <section className="register-container">
      {console.log(major)}
      <div className="card">
        <h2 className="">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="alerts">{errors.name?.message}</p>
          <input type="text" className="form-control" placeholder="Name" {...register('name')} />

          <p className="alerts">{errors.email?.message}</p>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...register('email', { required: true })}
          />

          <p className="alerts">{errors.mobile?.message}</p>
          <input
            type="tel"
            className="form-control"
            placeholder="Phone (01xxxxxxxxx) (Optional)"
            pattern="[0]{1}[1]{1}[0-9]{9}"
            {...register('mobile')}
          />
          <Form.Select drop="up" title="Major" {...register('program')}>
            {majors.map((value, key) => (
              <option key={key} value={value} onClick={() => setMajor(value)}>
                {value}
              </option>
            ))}
          </Form.Select>
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
          <div>
            <a href="/login">Already have an account? Login</a>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : <></>}
            Create Account
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
};

export default Register;
