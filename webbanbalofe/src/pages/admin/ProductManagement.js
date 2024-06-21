import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/productManage.css';
import Topbar from '../../Component/admin/Topbar';
import Sidebar from '../../Component/admin/Sidebar';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null, nameP: '', image: '', price: '', quantity: '', description: '', category: { nameC: '' }
  });
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const images = require.context('../../images/product', false, /\.(png|jpe?g|svg)$/);

  const getImage = (imageName) => {
    try {
      return images(`./${imageName}`);
    } catch (error) {
      console.error('Hình ảnh không tìm thấy:', imageName);
      return null; // hoặc đường dẫn hình ảnh thay thế
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct({ ...currentProduct, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data.content);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct({ id: null, nameP: '', image: '', price: '', quantity: '', description: '', category: { nameC: '' } });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setImagePreview(getImage(product.image));
    setShowModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('nameP', currentProduct.nameP);
      formData.append('price', currentProduct.price);
      formData.append('quantity', currentProduct.quantity);
      formData.append('description', currentProduct.description);
      formData.append('category', JSON.stringify(currentProduct.category));
      if (currentProduct.image instanceof Blob) {
        formData.append('image', currentProduct.image);
      } else {
        formData.append('imagePath', currentProduct.image);
      }

      if (currentProduct.id) {
        await axios.put(`http://localhost:8080/products/${currentProduct.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/products', formData);
      }
      await fetchProducts();
      setShowModal(false);
      setCurrentProduct({ id: null, nameP: '', image: '', price: '', quantity: '', description: '', category: { nameC: '' } });
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setCurrentProduct({ ...currentProduct, category: { nameC: value } });
    } else {
      setCurrentProduct({ ...currentProduct, [name]: value });
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mt-4">
      <Topbar />
      <div id="page-wrapper">
        <div className="row">
          <Sidebar />
          <div className="col">
            <div className="page-wrapper">
              <h2 style={{ textAlign: 'left' }}>Quản lý sản phẩm</h2>
              <button className="btn btn-primary" onClick={handleAddProduct}>Thêm sản phẩm</button>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Ảnh sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th style={{ width: '350px' }}>Mô tả</th>
                    <th>Phân loại</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img 
                          src={getImage(product.image)} 
                          alt="Product" 
                          style={{ width: '100px', cursor: 'pointer' }} 
                          onClick={() => handleImageClick(getImage(product.image))}
                        />
                      </td>
                      <td>{product.nameP}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {expandedDescriptions[product.id] ? product.description : product.description.slice(0, 100)}
                        {product.description.length > 100 && (
                          <span className="toggle-description" onClick={() => toggleDescription(product.id)}>
                            {expandedDescriptions[product.id] ? ' Thu gọn' : '... Xem thêm'}
                          </span>
                        )}
                      </td>
                      <td>{product.category.nameC}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleEditProduct(product)}>Sửa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
                currentPage={currentPage}
              />

              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                      <h2>{currentProduct.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</h2>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="form-group">
                          <label>Tên sản phẩm</label>
                          <input
                            type="text"
                            name="nameP"
                            value={currentProduct.nameP}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Ảnh sản phẩm</label>
                          <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <img src={imagePreview} alt="Product Preview" style={{ width: '100px', marginTop: '10px' }} />
                          )}
                        </div>
                        <div className="form-group">
                          <label>Giá</label>
                          <input
                            type="number"
                            name="price"
                            value={currentProduct.price}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Số lượng</label>
                          <input
                            type="number"
                            name="quantity"
                            value={currentProduct.quantity}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Mô tả</label>
                          <input
                            type="text"
                            name="description"
                            value={currentProduct.description}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Phân loại</label>
                          <input
                            type="text"
                            name="category"
                            value={currentProduct.category.nameC}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                      <button className="btn btn-primary" onClick={handleSaveProduct}>Lưu</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="image-modal-content" src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
}

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
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

