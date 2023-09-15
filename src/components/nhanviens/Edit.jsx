import{ useContext, useEffect } from 'react'
import NhanvienContext from '../../Context/NhanvienContext';
import { useParams } from 'react-router-dom';
export const Edit = () => {
  const { formValues, onChange,errors,nhanvien,getNhanvien,updateNhanvien } = useContext(NhanvienContext);
  let { id }=useParams();

  useEffect(()=>{
    getNhanvien(id);
  },[])
  return (
    <div className='row'>
    <form onSubmit={updateNhanvien}>  
      <div className="row mb-3">
        <label htmlFor="" className="col-sm-2 col-form-label">Tên</label>
        <div className="col-sm-3">
          <input name="ten" type="text" placeholder="tên"
          value={formValues["ten"]} 
          onChange={onChange}/><br/>
          {/* {errors.ten && (<span className='text-danger'>{errors.ten[0]}</span>)} */}
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-3">
          <input type="text" placeholder="Email" name="email"value={formValues["email"]} onChange={onChange} /><br/>
          {/* {errors.email && (<span className='text-danger'>{errors.email[0]}</span>)} */}
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="" className="col-sm-2 col-form-label">Tel</label>
        <div className="col-sm-3">
          <input type="text" placeholder="Tel" name="tel"value={formValues["tel"]} onChange={onChange} /><br/>
          {/* {errors.tel && (<span className='text-danger'>{errors.tel[0]}</span>)} */}
        </div>
      </div>
      <div>
         <button type="submit" className="btn btn-outline-dark" name="">update</button>
      </div>
     
      {/* <button type="submit" className="btn btn-outline-dark" name="back">Back</button> */}
    </form>
  </div>
  )
}
