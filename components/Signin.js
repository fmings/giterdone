import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div>
        <img alt="giterdone logo" width="400" src="/giterdone-logo.png" />
      </div>
      <Button type="button" className="copy-btn sign-in-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
