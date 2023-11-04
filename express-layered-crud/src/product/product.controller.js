// Handler Request and Response; Validate Body;
const express = require('express');

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById
} = require('./product.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await getAllProducts()

  res.send(products);
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await getProductById(parseInt(productId));

    res.send({
      data: product,
    })
  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData)

    res.status(201).send({
      message: 'Create product success',
      data: {
        productId: product.id,
      },
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.image &&
      productData.description &&
      productData.name &&
      productData.price
    )
  ) {
    return res.status(400).send({
      message: 'Some fields are missing',
    })
  }

  try {
    const product = await editProductById(parseInt(id), productData)

    res.send({
      message: 'product updated',
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.send({
      message: 'product updated',
    })
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteProductById(parseInt(productId));

    res.send({
      message: 'product success deleted',
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router