/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lvvihr08gr6aegn",
    "created": "2023-11-29 17:57:53.680Z",
    "updated": "2023-11-29 17:57:53.680Z",
    "name": "records",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xaffdrk9",
        "name": "test",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lvvihr08gr6aegn");

  return dao.deleteCollection(collection);
})
