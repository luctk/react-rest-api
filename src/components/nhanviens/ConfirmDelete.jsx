import { useParams, useNavigate } from 'react-router-dom';
import NhanvienContext from '../../Context/NhanvienContext';
import { useContext, useEffect, useState } from 'react';

export const ConfirmDelete = () => {
    const { formValues, confirmDeleteNhanvien, isConfirmed } = useContext(NhanvienContext);
    const [isConfirmedState, setIsConfirmedState] = useState(isConfirmed);
    const navigate = useNavigate();

    useEffect(() => {
        setIsConfirmedState(isConfirmed);
    }, [isConfirmed]);

    const onConfirm = (e) => {
        e.preventDefault();
        confirmDeleteNhanvien();
    }

    const goBackToIndex = () => {
        navigate('/');
    };

    if (isConfirmedState) {
        return (
            <div>
                <h1>xoa thành công</h1>
                <button onClick={goBackToIndex}>OK</button>
            </div>
        );
    }

    return (
        <form onSubmit={onConfirm}>
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
