import React, { useState, useContext } from 'react';
import NhanvienContext from '../../Context/NhanvienContext';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
  ten: yup.string().required('Tên là trường bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là trường bắt buộc'),
  tel: yup.string().matches(/^[0-9]{1,4}-[0-9]{1,4}-[0-9]{1,4}$/, 'Tel không hợp lệ').max(14, 'Tel không được quá 14 ký tự').required('Tel là trường bắt buộc'),
});

export const Create = () => {
  const { formValues, onChange, storeNhanvien } = useContext(NhanvienContext);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await schema.validate(formValues, { abortEarly: false });
      setErrors({});
      storeNhanvien();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      }
    }
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='row'>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="" className="col-sm-2 col-form-label">Tên</label>
          <div className="col-sm-3">
            <input name="ten" type="text" placeholder="tên"
              value={formValues["ten"]}
              onChange={onChange} /><br />
            {errors.ten && (<span className='text-danger'>{errors.ten}</span>)}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-3">
            <input type="text" placeholder="Email" name="email" value={formValues["email"]} onChange={onChange} /><br />
            {errors.email && (<span className='text-danger'>{errors.email}</span>)}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="" className="col-sm-2 col-form-label">Tel</label>
          <div className="col-sm-3">
            <input type="text" placeholder="Tel" name="tel" value={formValues["tel"]} onChange={onChange} /><br />
            {errors.tel && (<span className='text-danger'>{errors.tel}</span>)}
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-outline-dark" name="">Add</button>

          <button className="btn btn-outline-dark" onClick={handleBack}>Back</button>
          {/* Rest of your component */}

        </div>
      </form>
    </div>
  );
};
