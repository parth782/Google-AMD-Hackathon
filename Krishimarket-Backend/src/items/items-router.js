const path = require('path');
const express = require('express');
const xss = require('xss');
const itemsService = require('./items-service');

const itemsRouter = express.Router();
const jsonParser = express.json();

const serializeItems = (items) => (

  {
   id: items.id,
    users_id: items.users_id,
    name: xss(items.name),
    description: xss(items.description),
    itemCount: xss(items.itemCount),
    itemPrice: xss(items.itemPrice),
    img: xss(items.img),

  });



itemsRouter
  .route('/')
  .get((req, res, next) => {
    itemsService.getAllItems(req.app.get('db'))
      .then(items => {
        res.json(items);
      })
      .catch((err)=>{
        console.log(err);
        return res.status(404).json({error:"Some Error Occured"});
      });
  })

  .post(jsonParser, (req, res, next) => {
    const {
      users_id,
      name,
      description,
      itemCount,
      itemPrice,
      img,
    } = req.body;

    const newItem = {
      users_id,
      name,
      description,
      itemCount,
      itemPrice,
      img,

    };

    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`,
          },
        });

    //console.log(newItem)


    itemsService.insertItems(req.app.get('db'), newItem)
      .then(item => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(item);
      })
      .catch((err)=>{
        console.log(err);
        return res.status(404).json({error:"Some Error Occured"});
      });
  });

itemsRouter
  .route('/:item_id')
  .all((req, res, next) => {
    // const { user_id } = req.params;
    //     UsersService.getById(req.app.get('db'), user_id)
    const { item_id } = req.params;
    itemsService.getItemsById(req.app.get('db'), item_id)
      .then(items => {

        if (!items) {
          return res.status(404).json({
            error: { message: `Item doesn't exist` },
          });
        }
        res.items = items; // save the item for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch((err)=>{
        console.log(err);
        return res.status(404).json({error:"Some Error Occured"});
      });
  })

  .get((req, res, next) => {
    console.log(res.items, "hello");
    res.json(
      serializeItems(res.items));
  })

  .delete((req, res, next) => {
    itemsService
      .deleteItemById(
        req.app.get('db'),
        item_id)
      .then((itemRows) => {
        res.status(204).json(itemRows).end();
      })
      .catch((err)=>{
        console.log(err);
        return res.status(404).json({error:"Some Error Occured"});

      });
  })

  .patch(jsonParser, (req, res, next) => {
    //console.log(req.body, "hello");
    const {
      users_id,
      name,
      description,
      itemCount,
      itemPrice,
      img,
    } = req.body;

    const itemToUpdate = {
      users_id,
      name,
      description,
      itemCount,
      itemPrice,
      img,

    };
    //console.log(itemToUpdate,"hello")


    const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Missing 'name', 'description',  'itemCount', 'itemPrice', 'img', date_created'`
        }
      })
    }
    itemsService.updateItemById(
      req.app.get('db'),
      req.params.item_id,
      itemToUpdate
    )
      .then((response) => {

        res
          .status(200)
          .json(serializeItems(itemToUpdate))

      })
      .catch(next)

  })

itemsRouter
  .route('/user/:user_id')
  .all((req, res, next) => {
    const { user_id } = req.params;
    itemsService.getItemsByUserId(req.app.get('db'), req.params.user_id)
      .then(items => {
        if (!items) {
          return res.status(404).json({
            error: { message: `Item doesn't exist` },
          });
        }
        res.items = items; // save the item for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch((err)=>{
        console.log(err);
        return res.status(404).json({error:"Some Error Occured"});

      });
  })

  .get((req, res, next) => {
    res.json(res.items);
  })

itemsRouter
  .route('/keyword/:searchTerm')
  .all((req, res, next) => {
    const { searchTerm } = req.params;
    itemsService.getItemsByItemsByKeyword(req.app.get('db'), searchTerm.toLowerCase())
      .then(items => {
        if (!items) {
          return res.status(404).json({
            error: { message: `Item doesn't exist` },
          });
        }
        res.items = items; // save the item for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(res.items);
  })




module.exports = itemsRouter;