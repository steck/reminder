import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { register, login, logout, AuthResponse } from '../services/authService';
import RegistrationForm from './RegistrationForm';

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userEmail?: string;
  showRegisterModal: boolean;
  showLoginModal: boolean;
  email: string;
  password: string;
  error: string;
  successMessage: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onCloseRegister: () => void;
  onCloseLogin: () => void;
  onLogoutClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isLoggedIn,
  userEmail,
  showRegisterModal,
  showLoginModal,
  email,
  password,
  error,
  successMessage,
  onEmailChange,
  onPasswordChange,
  onLoginClick,
  onRegisterClick,
  onCloseRegister,
  onCloseLogin,
  onLogoutClick,
}) => {
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await register(email, password);
      onRegisterClick();
      setTimeout(() => {
        onCloseRegister();
        onEmailChange('');
        onPasswordChange('');
      }, 1500);
    } catch (err) {
      onEmailChange('');
      onPasswordChange('');
    }
  };

  return (
    <div className="d-flex align-items-center gap-2">
      {/* Registration Modal */}
      {showRegisterModal && (
        <>
          <RegistrationForm
            email={email}
            password={password}
            error={error}
            successMessage={successMessage}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            onSubmit={handleRegister}
            onClose={onCloseRegister}
          />
          <div className="modal-backdrop fade show"></div>
        </>
      )}

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
                  onClick={onCloseLogin}
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
                  try {
                    const result = await login(email, password);
                    onLoginClick();
                    setTimeout(() => {
                      onCloseLogin();
                      onEmailChange('');
                      onPasswordChange('');
                    }, 1500);
                  } catch (err) {
                    onEmailChange('');
                    onPasswordChange('');
                  }
                }}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => onEmailChange(e.target.value)}
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
                      onChange={(e) => onPasswordChange(e.target.value)}
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
      {isLoggedIn ? (
        <>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="userDropdown"
            >
              {userEmail}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={onLogoutClick}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <button
            className="btn btn-outline-primary"
            onClick={onLoginClick}
          >
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Login
          </button>
          <button
            className="btn btn-primary"
            onClick={onRegisterClick}
          >
            <i className="bi bi-person-plus me-2"></i>
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
