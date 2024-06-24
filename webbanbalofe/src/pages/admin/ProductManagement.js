import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/productManage.css';
import Sidebar from '../../Component/admin/Sidebar';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null, nameP: '', image: '', price: '', quantity: '', description: '', category: { nameC: '' }
  });
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const images = require.context('../../images/product', false, /\.(png|jpe?g|svg|ifif)$/);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(100);
  const [categories, setCategories] = useState([]);

  const getImage = (imageName) => {
    try {
      return images(`./${imageName}`);
    } catch (error) {
      console.error('Hình ảnh không tìm thấy:', error);
      return null;
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
        setCurrentProduct({ ...currentProduct, image: file});
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
      const response = await axios.get(`http://localhost:8080/products?page=${page}&size=${size}`);
      setProducts(response.data.content);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct({ id: null, nameP: '', image: '', price: '', quantity: '', description: '', category: { id: '', nameC: '' } });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setImagePreview(getImage(product.image) || (product.image));
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
  try {
    console.log('Deleting product with ID:', id); // Kiểm tra giá trị của id
    await axios.delete(`http://localhost:8080/products/${id}`);
    console.log('Product deleted successfully.');
    // Cập nhật lại danh sách sản phẩm sau khi xóa thành công
    await fetchProducts();
  } catch (error) {
    console.error('Error deleting product:', error.response ? error.response.data : error.message);
  }
};

  const handleSaveProduct = async () => {
    console.log('Saving product:', currentProduct);
    try {
      if (currentProduct.image instanceof Blob) {
        // Upload image to Firebase Storage
        console.log('Uploading image:', currentProduct.image.name);
        const storageRef = ref(storage, 'images/' + currentProduct.image.name);
        await uploadBytes(storageRef, currentProduct.image);
        const imageUrl = await getDownloadURL(storageRef);
        currentProduct.image = imageUrl;
        console.log('Image uploaded, URL:', imageUrl);
      }

      if (currentProduct.id) {
        console.log('Updating product:', currentProduct.id);
        await axios.put(`http://localhost:8080/products/${currentProduct.id}`, currentProduct);
      } else {
        console.log('Adding new product');
        await axios.post('http://localhost:8080/products', currentProduct);
      }

      await fetchProducts();
      setShowModal(false);
      setCurrentProduct({ id: null, nameP: '', image: '', price: '', quantity: '', description: '', category: {id: '', nameC: '' } });
    } catch (error) {
      console.error('Error saving product', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setCurrentProduct({ ...currentProduct, category: categories.find(category => category.id === parseInt(value)) });
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

  useEffect(() => {
    axios.get('http://localhost:8080/category')
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mt-4">
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
                          src={getImage(product.image) || (product.image)} 
                          alt="Product" 
                          style={{ width: '100px', cursor: 'pointer' }} 
                          onClick={() => handleImageClick(product.image)}
                        />
                      </td>
                      <td>{product.nameP}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {expandedDescriptions[product.id] ? product.description : product.description.slice(0, 100)}
                        {product.description?.length > 100 && (
                          <span className="toggle-description" onClick={() => toggleDescription(product.id)}>
                            {expandedDescriptions[product.id] ? ' Thu gọn' : '... Xem thêm'}
                          </span>
                        )}
                      </td>
                      <td>{product.category.nameC}</td>
                      <td>
                        <button className="btn btn-secondary" onClick={() => handleEditProduct(product)}>Sửa</button>
                        <button className="btn btn-secondary" style={{backgroundColor: 'red'}} onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
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
                          <select
                            className="form-control"
                            name="category"
                            value={currentProduct.category.id}
                            onChange={handleChange}
                          >
                            <option value="" disabled>Chọn loại sản phẩm</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.nameC}
                              </option>
                            ))}
                          </select>
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
};

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

export default ProductManagement;
