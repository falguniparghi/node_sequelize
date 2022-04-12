const Product = require('../models/product');

exports.getAdminProducts = (req, res, next) => {
  console.log('1');
  Product.findAll().then(
    result => {
      console.log(result);
      res.render('admin-products', {
        prods: result,
        pageTitle: 'Admin Products',
        path: '/admin-products',
      });
    }
  ).catch(err => {
    console.log(error);
  });
};

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    })
};

exports.getEditProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findByPk(prodID)
    .then(product => {
      res.render('edit-product', {
        product: product,
        pageTitle: 'Edit Products',
        path: '/admin/edit-product'
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  console.log('test');
  console.log(req.body.title);
  const prodID = req.body.productID;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.findByPk(prodID)
    .then(product => {
      console.log(prodID);
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDesc;
      return product.save();
    }).then( product => {
      console.log('Product Updated');
      res.redirect('/admin/admin-products');
    })
    .catch(err => console.log(err));
};

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(result => {
      console.log(result);
      console.log('Created Product');
      res.redirect('/admin/admin-products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const Id = req.body.productId;
  Product.destroy({
    where: {
      id: Id
    }
  })
  .then(result => {
    console.log('Product Deleted');
    res.redirect('/admin/admin-products');
  })
  .catch(err => {
    console.log(err);
  });


}