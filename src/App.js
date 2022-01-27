import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from './store/actions/userAction';
import Loader from './Loader';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [state, setState] = useState('');
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  console.log(loading, error, userInfo);

  const registerHandler = (e) => {
    setState('register');
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password and Confirm Password should be the same');
      setTimeout(() => setMessage(''), 3000);
    } else {
      dispatch(register(email, password));
      setEmail('');
      setConfirmPassword('');
      setPassword('');
    }
  };
  const loginHandler = (e) => {
    setState('login');
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginMessage('Email and password can not be null for login!');
      setTimeout(() => setLoginMessage(''), 3000);
    } else {
      dispatch(login(loginEmail, loginPassword));
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  return (
    <div className='app'>
      <img src={logo} className='app__logo' alt='logo' />
      <div className='app__forms'>
        <form onSubmit={registerHandler} action='' className='form'>
          <label htmlFor='email' className='form__group'>
            Email
            <input
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
            />
          </label>
          <label htmlFor='password' className='form__group'>
            Password
            <input
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
          </label>
          <label htmlFor='confirmpassword' className='form__group'>
            Confirm Password
            <input
              id='confirmpassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
            />
          </label>
          {message && <p className='form__error'>{message}</p>}

          {loading && state === 'register' ? (
            <Loader />
          ) : (
            <>
              <button className='form__btn' type='submit'>
                Register
              </button>
              {error && state === 'register' && (
                <h3 style={{ color: 'red', textAlign: 'center' }}>
                  {error.message}
                </h3>
              )}
              {userInfo && state === 'register' && (
                <div style={{ color: 'green', textAlign: 'center' }}>
                  <h1>Successfully registered</h1>
                  <p>Email: {userInfo.email}</p>
                  <p>Your id and token is stored now!</p>
                </div>
              )}
            </>
          )}
        </form>
        <div className='vl'></div>
        <form onSubmit={loginHandler} action='' className='form'>
          <label htmlFor='loginEmail' className='form__group'>
            Email
            <input
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              id='loginEmail'
              type='text'
            />
          </label>
          <label htmlFor='loginPassword' className='form__group'>
            Password
            <input
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              id='loginPassword'
              type='password'
            />
          </label>
          {loginMessage && <p>{loginMessage}</p>}

          {loading ? (
            <Loader />
          ) : (
            <>
              <button className='form__btn' type='submit'>
                Login
              </button>
              {error && state === 'login' && (
                <h3 style={{ color: 'red', textAlign: 'center' }}>
                  {error.message}
                </h3>
              )}
              {userInfo && state === 'login' && (
                <div style={{ color: 'green', textAlign: 'center' }}>
                  <h1>Successfully logged in</h1>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
