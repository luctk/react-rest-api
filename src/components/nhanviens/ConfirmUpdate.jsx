import { useParams, useNavigate } from 'react-router-dom';
import NhanvienContext from '../../Context/NhanvienContext';
import { useContext } from 'react';
export const ConfirmUpdate = () => {
    const { formValues, confirmUpdateNhanvien, isConfirmed } = useContext(NhanvienContext);
    const navigate = useNavigate();
  
    const onConfirm = (e) => {
      e.preventDefault();
      confirmUpdateNhanvien();
    }
  
    const goBackToIndex = () => {
        navigate('/');
    };
  
    if (isConfirmed) {
      return (
        <div>
          <h1>sửa thành công</h1>
          <button onClick={goBackToIndex}>OK</button>
        </div>
      );
    }
  
    return (
      <form onSubmit={onConfirm}>
        <h1>Xác nhận thông tin</h1>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Tên</label>
          <div className="col-sm-3">
            <input type="text" placeholder="Tên" name="ten" value={formValues.ten} readOnly /><br />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-3">
            <input type="text" placeholder="Email" name="email" value={formValues.email} readOnly /><br />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Tel</label>
          <div className="col-sm-3">
            <input type="text" placeholder="Tel" name="tel" value={formValues.tel} readOnly /><br />
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Xác nhận</button>
      </form>
    );
}
