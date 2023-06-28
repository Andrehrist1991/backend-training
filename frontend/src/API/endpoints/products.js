// Modules
import queryString from 'query-string';

// Api
import API from '../';

function getAllProducts(params) {
  const query = queryString.stringify(params);
  return API.instance.get(`/products?${query}`);
}

function addNewProduct(data) {
  return API.instance.post('/products/', data);
}

function updateProduct(id, data) {
  return API.instance.put(`/products/${id}`, data).then((res) => res.data);
}

function deleteProduct(id) {
  return API.instance.delete(`/products/${id}`);
}

const productsApi = Object.freeze({
  addNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
});

export default productsApi;
