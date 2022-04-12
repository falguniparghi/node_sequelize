const Product = require('../models/product');

exports.getProduct = (req, res, next) => {
    const products = Product.findAll().then(
      result => {
        console.log(result);
        res.render('shop', {
          prods: result,
          pageTitle: 'Shop',
          path: '/',
        });
      }
    ).catch(err => {
      console.log(error);
    });
};

exports.getProductDetails = (req, res, next) => {
  const prodID = req.params.productId;
  console.log(prodID);
  Product.findByPk(prodID)
    .then(product => {
      res.render('product-details', {
        product: product,
        pageTitle: 'Admin Products',
        path: '/admin/product-details'
      });
    })
    .catch(err => console.log(err));
};
