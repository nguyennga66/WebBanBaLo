import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Topbar from '../../Component/admin/Topbar';
import Sidebar from '../../Component/admin/Sidebar';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, nameC: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory({ id: null, nameC: '' });
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleSaveCategory = async () => {
    try {
      if (currentCategory.id) {
        await axios.put(`http://localhost:8080/category/${currentCategory.id}`, currentCategory);
      } else {
        await axios.post('http://localhost:8080/category', currentCategory);
      }
      await fetchCategories();
      setShowModal(false);
      setCurrentCategory({ id: null, nameC: '' });
    } catch (error) {
      console.error('Error saving category', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/category/${id}`);
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current categories
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <div className="container mt-4">
      <Topbar />
      <div id="page-wrapper">
        <div className="row">
          <Sidebar />
          <div className="col">
            <div className="page-wrapper">
              <h2 style={{ textAlign: 'left' }}>Quản lý danh mục</h2>
              <button className="btn btn-primary" onClick={handleAddCategory}>Thêm danh mục</button>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>Mã danh mục</th>
                    <th>Tên danh mục</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map(category => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.nameC}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleEditCategory(category)}>Sửa</button>
                        <button className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsPerPage={categoriesPerPage}
                totalItems={categories.length}
                paginate={paginate}
                currentPage={currentPage}
              />

              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                      <h2>{currentCategory.id ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}</h2>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label>Tên danh mục</label>
                          <input
                            type="text"
                            name="nameC"
                            value={currentCategory.nameC}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                      <button className="btn btn-primary" onClick={handleSaveCategory}>Lưu</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage - 1)} className="page-link">
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <button onClick={() => paginate(currentPage + 1)} className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
