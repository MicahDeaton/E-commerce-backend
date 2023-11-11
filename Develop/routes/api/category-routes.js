const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll(
      {
        include: [
            {
                model: Product
            }
        ]
      }
    );
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findAll(
      {
        where: {id:req.params.id},
        include: [
            {
                model: Product
            }
        ]
      }
    );
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

  // create a new category
  //  req.body should look like this...
  //   {
  // "category_name": "Shirts"
  //   }
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body)

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    }); 
    const category = await Category.findAll(
      {
        where: {id:req.params.id},
      }
    );

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy(
      {
        where: {id:req.params.id}
      }
    );
    if(deleted){
      return res.status(204).send("category deleted");
    }
    throw new Error("category not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
