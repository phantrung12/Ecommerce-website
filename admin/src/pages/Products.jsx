import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Layout from "../components/Layout";
import NewModal from "../components/Modal";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../redux/actions/product.actions";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./Products.css";

const Products = () => {
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  // const [inputs, setInputs] = useState({});
  const [images, setImages] = useState([]);

  const [productPictures, setProductPictures] = useState([]);
  const [productUrls, setProductUrls] = useState([]);

  const [productDetails, setProductDetails] = useState(null);
  const [productUpdate, setProductUpdate] = useState(null);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productUpdateModal, setProductUpdateModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState(false);

  const createCategoriesArray = (cateId, arr = []) => {
    arr.push(cateId);
    const cate = category.categoryList.find((cat) => cat._id === cateId);
    if (cate.parentId) {
      createCategoriesArray(cate.parentId, arr);
    } else {
      return arr;
    }
    return arr;
  };

  const handleShow = () => setShow(true);

  const uploadImg = () => {
    const promises = [];
    images.map((img) => {
      const fileName = new Date().getTime() + img.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, img);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProductUrls((prev) => [...prev, { img: downloadURL }]);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        alert("All images uploaded");
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    const newProduct = {
      name,
      description,
      price,
      quantity,
      size,
      color,
      category: createCategoriesArray(categoryId),
      productPictures: productUrls,
    };
    dispatch(addProduct(newProduct));
    setShow(false);
  };

  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, option);
      }
    }
    return option;
  };

  // const handleProductPictures = (e) => {
  //   setProductPictures([...productPictures, e.target.files[0]]);
  // };

  const handleImageChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const renderProducts = () => {
    return (
      <Table
        style={{ fontSize: 14 }}
        striped
        bordered
        hover
        variant="dark"
        responsive="sm"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((prod, index) => (
                <tr key={prod._id}>
                  <td>{index}</td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>{prod.quantity}</td>
                  <td>{prod.category[0].name}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => showProductDetailsModal(prod)}
                    >
                      Info
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => showProductUpdateModal(prod)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => showProductDeleteModal(prod)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={() => setShow(false)}
        modalTitle="Add new Product"
        onSubmit={handleClose}
      >
        <Input
          label="Name"
          value={name}
          type="text"
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          type="text"
          placeholder={`Product Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          type="text"
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          type="text"
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Size"
          value={size}
          type="text"
          placeholder={`Size: S,M,L,XL,...`}
          onChange={(e) => setSize(e.target.value.split(","))}
        />
        <Input
          label="Color"
          value={color}
          type="text"
          placeholder={`Color`}
          onChange={(e) => setColor(e.target.value.split(","))}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          multiple
          onChange={handleImageChange}
        />
        <button onClick={uploadImg}>Uploads</button>
      </NewModal>
    );
  };

  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };

  const onUpdateProduct = () => {
    const newProductUpdate = {
      _id,
      name,
      description,
      price,
      quantity,
      size,
      color,
      category: createCategoriesArray(categoryId),
      productPictures: productUrls,
    };

    dispatch(updateProduct(newProductUpdate));
    setProductUpdateModal(false);
  };

  const onDeleteProduct = () => {
    dispatch(deleteProduct(_id));
    setProductDeleteModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetailModal(true);
    setProductDetails(product);
    // console.log(product);
  };

  const showProductUpdateModal = (product) => {
    setProductUpdateModal(true);
    setProductUpdate(product);
    // console.log(product);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
    setCategoryId(product.category[0]._id);
    setId(product._id);
  };

  const showProductDeleteModal = (product) => {
    setProductDeleteModal(true);
    setId(product._id);
  };

  const renderProductDetailModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle="Product Details"
        size="lg"
      >
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category[0].name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Size</label>
            <p className="value">{productDetails.size}</p>
          </Col>
          <Col md={6}>
            <label className="key">Color</label>
            <p className="value">{productDetails.color}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Images</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((pic) => (
                <div className="productImgContainer">
                  <img src={pic.img} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  const renderUpdateProductModal = () => {
    return (
      <NewModal
        show={productUpdateModal}
        handleClose={() => setProductUpdateModal(false)}
        modalTitle="Product Details"
        size="lg"
        onSubmit={onUpdateProduct}
      >
        <Input
          label="Name"
          value={name}
          type="text"
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          type="text"
          placeholder={`Product Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          type="text"
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          type="text"
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Size"
          value={size}
          type="text"
          placeholder={`Size: S,M,L,XL,...`}
          onChange={(e) => setSize(e.target.value.split(","))}
        />
        <Input
          label="Color"
          value={color}
          type="text"
          placeholder={`Color`}
          onChange={(e) => setColor(e.target.value.split(","))}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          multiple
          onChange={handleImageChange}
        />
        <button onClick={uploadImg}>Uploads</button>
      </NewModal>
    );
  };

  const renderDeleteModal = () => {
    return (
      <NewModal
        show={productDeleteModal}
        handleClose={() => setProductDeleteModal(false)}
        modalTitle="Xóa sản phẩm"
        size="lg"
        buttons={[
          {
            label: "Yes",
            color: "danger",
            onClick: onDeleteProduct,
          },
        ]}
      >
        Bạn có chắc muốn xóa sản phẩm này??
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <h3>Products</h3>
              <Button variant="contained" color="primary" onClick={handleShow}>
                Add Product
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailModal()}
      {renderUpdateProductModal()}
      {renderDeleteModal()}
    </Layout>
  );
};

export default Products;
