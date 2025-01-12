import React, { useState } from 'react';

interface RegistrationFormProps {
  email: string;
  password: string;
  error: string;
  successMessage: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  email,
  password,
  error,
  successMessage,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onClose
}) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
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
            <form onSubmit={onSubmit}>
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
