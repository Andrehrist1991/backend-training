// Api
import API from '../';

function getAllProducts() {
  return API.instance.get('/products/').then((res) => res.data);
}

const productsApi = Object.freeze({
  getAllProducts,
});

export default productsApi;
