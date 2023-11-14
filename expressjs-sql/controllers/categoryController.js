const { Category } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.send({
      status: 'success',
      data: {
        categories,
      }
    })
  } catch (err) {
    return res.status(400).send({
      status: 'failed',
      errors: err.message,
    })
  }
}

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({
        status: 'failed',
        errors: "Category Id not found"
      });
    }

    return res.send({
      status: 'success',
      data: {
        category,
      }
    })
  } catch (err) {
    return res.status(400).send({
      status: 'failed',
      errors: err.message,
    })
  }
}

exports.storeCategory = async (req, res) => {
  try {
    let { name, description } = req.body;

    const newCategory = await Category.create({
      name,
      description
    });

    return res.status(201).send({
      status: 'success',
      category: newCategory
    })
  } catch (err) {
    const { errors } = err;
    return res.status(400).send({
      status: 'failed',
      errors: errors.map(error => ({
        path: error.path,
        message: error.message
      })),
    })
  }
}

exports.updateCategoryById = async (req, res) => {
  try {
    const updatedDataCategory = req.body;
    const { id } = req.params;

    await Category.update(updatedDataCategory, {
      where: {
        id
      }
    });

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({
        status: 'failed',
        errors: "Category Id not found"
      });
    }

    return res.send({
      status: 'success',
      data: {
        category,
      }
    })

  } catch (err) {
    return res.status(400).send({
      status: 'failed',
      errors: err.message,
    })
  }
}

exports.destroyCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({
        status: 'failed',
        errors: "Category Id not found"
      });
    }

    await Category.destroy({
      where: {
        id
      }
    });

    return res.send({
      status: 'success',
      message: 'success category deleted'
    });
  } catch (err) {
    return res.status(400).send({
      status: 'failed',
      errors: err.message,
    })
  }
}