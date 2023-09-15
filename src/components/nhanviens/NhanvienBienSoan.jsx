import { useContext, useEffect } from "react";
import NhanvienContext from "../../Context/NhanvienContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const NhanvienBienSoan = () => {
  const {
    formValues,
    onChange,
    getNhanvien,
    updateNhanvien,
    deleteNhanvien,
  } = useContext(NhanvienContext);
  
  let { id } = useParams();
  let navigate = useNavigate();
  const onDelete = async () => {
    navigate(`/nhanviens/confirm/delete/${id}`); // Dẫn đến trang confirm delete
};
const handleBack = () => {
  navigate('/');
};

  useEffect(() => {
    getNhanvien(id);
  }, []);
  return (
    <div className="row">
      <form onSubmit={updateNhanvien}>
        <div className="row mb-3">
          <label htmlFor="" className="col-sm-2 col-form-label">
            Tên
          </label>
          <div className="col-sm-3">
            <input
              name="ten"
              type="text"
              placeholder="tên"
              value={formValues["ten"]}
              onChange={onChange}
            />
            <br />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formValues["email"]}
              onChange={onChange}
            />
            <br />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="" className="col-sm-2 col-form-label">
            Tel
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              placeholder="Tel"
              name="tel"
              value={formValues["tel"]}
              onChange={onChange}
            />
            <br />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-outline-dark" name="">
            update
          </button>
          <button type="button" className="btn btn-outline-dark" onClick={onDelete}>
            delete
          </button>
          <button className="btn btn-outline-dark" onClick={handleBack}>Back</button>
        </div>
      </form>
    </div>
  );
};
