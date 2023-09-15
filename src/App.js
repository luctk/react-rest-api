import { Routes, Route, Link } from "react-router-dom";
import { NhanvienProvider } from "./Context/NhanvienContext";
import { Index } from './components/nhanviens/Index';
import { Edit } from './components/nhanviens/Edit';
import { Create } from './components/nhanviens/Create';
import { Confirmation } from "./components/nhanviens/Confirmation";
import { NhanvienBienSoan } from "./components/nhanviens/NhanvienBienSoan";
import { ConfirmUpdate } from "./components/nhanviens/ConfirmUpdate";
import { ConfirmDelete } from './components/nhanviens/ConfirmDelete';
import Login from "./components/nhanviens/Login";

// import { SearchNhanvien } from "./components/nhanviens/SearchNhanvien";
function App() {
  return (
    <NhanvienProvider>
      <div className="bg-slate-200">
        <div className="max-w-7xl mx-auto min-h-screen">
          {/* <nav>
            <ul className="flex">
              <li>
                <Link to="/nhanviens">index</Link>
              </li>
            </ul>
          </nav> */}
          <Routes>
            
            <Route path="/" element={<Index />} />
            <Route path="/login" element={< Login />} />
            <Route path="/nhanviens/create" element={<Create />} />
            <Route path="/nhanviens/:id/edit" element={<Edit />} />
            <Route path="/nhanviens/confirm" element={<Confirmation />} />
            <Route path="/nhanviens/:id/biensoan" element={<NhanvienBienSoan />} />
            <Route path="/nhanviens/confirm/:id" element={<ConfirmUpdate />} />
            <Route path="/nhanviens/confirm/delete/:id" element={<ConfirmDelete />} />

          </Routes>
        </div>
      </div>
    </NhanvienProvider>
  );

}

export default App;
