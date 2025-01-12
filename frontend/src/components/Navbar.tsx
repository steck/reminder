import React, { useState, useEffect } from 'react';
import {  login, logout } from '../services/authService';
import AuthButtons from './AuthButtons';

const Navbar = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth).isLoggedIn : false;
  });
  const [email, setEmail] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth).email : '';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/src/assets/react.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            Remainer
          </a>
          <AuthButtons
            isLoggedIn={isLoggedIn}
            userEmail={isLoggedIn ? email : undefined}
            showRegisterModal={showRegisterModal}
            showLoginModal={showLoginModal}
            email={email}
            password={password}
            error={error}
            successMessage={successMessage}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onLoginClick={() => setShowLoginModal(true)}
            onRegisterClick={() => setShowRegisterModal(true)}
            onCloseRegister={() => {
              setShowRegisterModal(false);
              setError('');
              setSuccessMessage('');
            }}
            onCloseLogin={() => {
              setShowLoginModal(false);
              setError('');
              setSuccessMessage('');
            }}
            onLogoutClick={async () => {
              try {
                await logout();
                setIsLoggedIn(false);
                localStorage.removeItem('auth');
              } catch (err) {
                setError((err as Error).message);
              }
            }}
          />
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowLoginModal(false);
                    setError('');
                    setSuccessMessage('');
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setError('');
                  setSuccessMessage('');

                  try {
                    const result = await login(email, password);
                    setSuccessMessage(result.message);
                    setIsLoggedIn(true);
                    localStorage.setItem('auth', JSON.stringify({
                      isLoggedIn: true,
                      email: email
                    }));
                    setTimeout(() => {
                      setShowLoginModal(false);
                      setEmail('');
                      setPassword('');
                    }, 1500);
                  } catch (err) {
                    setError((err as Error).message);
                  }
                }}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showLoginModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Navbar;
