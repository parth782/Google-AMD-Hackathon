function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}


const ItemsService = {
  getAllItems(db) {
    return db
      .from('items')
      .select('*')
  },
  getItemsById(db, items_id) {

    return db
      .from('items')
      .select('*')
      .where({
        id: items_id
      })
      .first()
  },
  getItemsByUserId(db, users_id) {

    return db
      .from('items')
      .select('*')
      .where({
        users_id: users_id
      })
  },
  getItemsByItemsByKeyword(db, keyword) {

    return db
      .from('items')
      .select('*')
      .where('name', 'like', `%${keyword}%`)
      .orWhere('name', 'like', `%${keyword.toUpperCase()}%`)
      .orWhere('name', 'like', `%${titleCase(keyword)}%`)

  },
  



  insertItems(db, newItem) {
    return db
      .insert(newItem)
      .into('items')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  deleteItemById(db, items_id) {
    return db('items')
      .where({
        id: items_id
      })
      .delete()
  },

  updateItemById(db, items_id, newItem) {
    //console.log(items_id, newItem,"hi")
    return db('items')
      .update(newItem, returning = true)
      .where({
        id: items_id
      })
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

}
module.exports = ItemsService;


