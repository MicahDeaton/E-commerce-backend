const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll(
      {
        include: [
            {
                model: Product
            }
        ]
      }
    );
    return res.status(200).json({ tag });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findAll(
      {
        where: {id:req.params.id},
        include: [
            {
                model: Product
            }
        ]
      }
    );
    return res.status(200).json({ tag });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

  //  req.body should look like this...
  //   {
  // "tag_name": "Yellow"
  //   }
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create(req.body)

    return res.status(200).json({ tag });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    }); 
    const tag = await Tag.findAll(
      {
        where: {id:req.params.id},
      }
    );

    return res.status(200).json({ tag });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleted = await Tag.destroy(
      {
        where: {id:req.params.id}
      }
    );
    if(deleted){
      return res.status(204).send("Tag deleted");
    }
    throw new Error("Tag not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
