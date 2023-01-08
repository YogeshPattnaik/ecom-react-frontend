import React, { useState, useEffect } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, forgotPassword } from '../../actions/profileAction';
import './ForgotPassword.css';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      alert.error(error);
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const forgotPasswordSubmit = () => {
    const myForm = new FormData();

    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  value="Send"
                  className="forgotPasswordBtn"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
