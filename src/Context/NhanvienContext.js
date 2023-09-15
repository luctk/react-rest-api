import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/"
const NhanvienContext = createContext();
export const NhanvienProvider = ({ children }) => {
    const [formValues, setFormValues] = useState({
        ten: "",
        email: "",
        tel: "",
    });
    const [nhanviens, setNhanviens] = useState([]);
    const [searchedNhanviens, setSearchedNhanviens] = useState([]); 
    const [nhanvien, setNhanvien] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
   const [searchMessage, setSearchMessage] = useState("");
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    };

    // const getNhanviens = async () => {
    //     try {
    //         const token = sessionStorage.getItem('token');
    //         const apiNhanvien = await axios.get(
    //             "nhanvien",
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );

    //         setNhanviens(apiNhanvien.data.data);
    //     } catch (error) {
    //         console.error("Error fetching data", error);
    //     }
    // };
    const getNhanviens = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const apiNhanvien = await axios.get(
                "nhanvien", 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const allNhanviens = apiNhanvien.data.data;
            setNhanviens(allNhanviens);
            setSearchedNhanviens(allNhanviens); // Cập nhật danh sách tìm kiếm khi lấy tất cả nhân viên
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const getNhanvien = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(
                "nhanvien/" + id,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const apiNhanvien = response.data.data
            setNhanvien(apiNhanvien);
            setFormValues({
                ten: apiNhanvien.ten,
                email: apiNhanvien.email,
                tel: apiNhanvien.tel
            });
            return apiNhanvien;
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    // const searchNhanvien = (ten) => {
    //     const lowerCaseTen = ten.toLowerCase();
    //     const foundNhanviens = nhanviens.filter(nhanvien => {
    //         const lowerCaseNhanvienTen = nhanvien.ten.toLowerCase();
    //         return lowerCaseNhanvienTen.includes(lowerCaseTen);
    //     });

    //     setNhanviens(foundNhanviens);

    //     if (foundNhanviens.length === 0) {
    //         setSearchMessage('Không tìm thấy nhân viên');
    //     } else {
    //         setSearchMessage('');
    //     }
    // };
    const searchNhanvien = (ten) => {
        const lowerCaseTen = ten.toLowerCase();
        const foundNhanviens = nhanviens.filter(nhanvien => {
            const lowerCaseNhanvienTen = nhanvien.ten.toLowerCase();
            return lowerCaseNhanvienTen.includes(lowerCaseTen);
        });

        setSearchedNhanviens(foundNhanviens);

        if (foundNhanviens.length === 0) {
            setSearchMessage('Không tìm thấy nhân viên');
        } else {
            setSearchMessage('');
        }
    };
   
    const storeNhanvien = (e) => {
        navigate("/nhanviens/confirm");
    };

    const confirmStoreNhanvien = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.post("nhanvien/add-nhanvien", formValues,
                { headers: { Authorization: `Bearer ${token}` } });
            setIsConfirmed(true);
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    const updateNhanvien = (e) => {
        e.preventDefault();
        navigate("/nhanviens/confirm/:id");
    };

    const confirmUpdateNhanvien = async () => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.put("nhanvien/" + nhanvien.id, formValues,
                { headers: { Authorization: `Bearer ${token}` } });
            setIsConfirmed(true);
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    const [isConfirmed, setIsConfirmed] = useState(false);
    const deleteNhanvien = (e) => {
        e.preventDefault();
        navigate("/nhanviens/confirm/delete/" + nhanvien.id);
    };

    const confirmDeleteNhanvien = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.delete(`nhanvien/${nhanvien.id}`,
                { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                setIsConfirmed(true);
            }
        } catch (error) {
            console.error('Failed to delete nhanvien:', error);
        }
    };
    const logout = () => {
        console.log('Logging out...');
        sessionStorage.removeItem('token');
        window.location.href = "/";
    };
    
    return (
        <NhanvienContext.Provider value={{
            nhanvien,
            nhanviens: searchedNhanviens, // Sử dụng searchedNhanviens thay vì nhanviens
            getNhanvien,
            getNhanviens,
            onChange,
            formValues,
            storeNhanvien,
            confirmStoreNhanvien,
            errors,
            updateNhanvien,
            confirmUpdateNhanvien,
            deleteNhanvien,
            confirmDeleteNhanvien,
            isConfirmed,
            searchNhanvien,
            searchMessage,
            logout
        }}>
            {children}
        </NhanvienContext.Provider>
    )
    // return <NhanvienContext.Provider value={{ nhanvien, nhanviens, getNhanvien, getNhanviens, onChange, formValues, storeNhanvien, confirmStoreNhanvien, errors, updateNhanvien, confirmUpdateNhanvien, deleteNhanvien, confirmDeleteNhanvien, isConfirmed, searchNhanvien, searchMessage, logout }}>{children}</NhanvienContext.Provider>
}

export default NhanvienContext;
