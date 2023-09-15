import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userField, setUserField] = useState({ loginId: '', password: '' });
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserField({ ...userField, [e.target.name]: e.target.value });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://127.0.0.1:8000/api/nhanvien/login', userField);
      sessionStorage.setItem('token', result.data.access_token);
      setSuccess('Đăng nhập thành công');
      navigate('/');
    } catch (error) {
      setSuccess('LoginId hoặc password không chính xác');
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={onSubmitChange}>
        <label>
          LoginId:
          <input type="text" name="loginId" onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <button type="submit">Đăng nhập</button>
      </form>
      {success && <p>{success}</p>}
    </div>
  );
};

export default Login;
