const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then(result=>{
    console.log(result);
    res.redirect("/");
  }).catch(err=>{
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId}})
  .then(product=>{
    if (!product[0]) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product[0],
    });
  }).catch(err=>console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  Product.findAll({where: {id: prodId}}).then(products=>{
    products[0].title=updatedTitle;
    products[0].price=updatedPrice;
    products[0].description=updatedDescription;
    products[0].imageUrl=updatedImageUrl;
    return products[0].save();
  }).then(result=>{
    console.log('UPDATED PRODUCT')
    res.redirect("/admin/products");
  }).catch(err=>console.log(err))
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProducts = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({where: {id: prodId}})
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};
