import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import NhanvienContext from "../../Context/NhanvienContext";

export const Index = () => {
  const { nhanviens, getNhanviens, searchNhanvien, searchMessage, logout } =
    useContext(NhanvienContext);

  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      getNhanviens();
    } else {
      // Đặt một thông báo hoặc thực hiện hành động khác ở đây
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    searchNhanvien(inputValue);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <div className="row g-3">
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-primary">
                Tìm kiếm
              </button>
            </div>
            {searchMessage && <p>{searchMessage}</p>}
          </div>
        </form>

        <div className="col-sm-9">
          <div><p>Tạo mới nhân viên</p></div>
          <Link to="/nhanviens/create" className="btn btn-outline-dark">
            Add
          </Link>
        </div>
        <div className="col-sm">
          <button onClick={logout} className="btn btn-outline-dark">
            Log out
          </button>


        </div>
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Tel</th>
              <td scope="col">Thao tác</td>
            </tr>
          </thead>
          <tbody>
            {nhanviens.map((nv) => {
              return (
                <tr key={nv.id}>
                  <td>{nv.id}</td>
                  <td>{nv.ten}</td>
                  <td>{nv.email}</td>
                  <td>{nv.tel}</td>
                  <td> <Link
                    to={`/nhanviens/${nv.id}/biensoan`}
                    className="btn btn-outline-dark"
                  >
                    Biên soạn
                  </Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
