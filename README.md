Solo Challenge:

Marketplace / Amazon Like + Postgres

You are in charge of creating a Marketplace.

Every product in your marketplace is shaped in this way:

    {
        "id": 1, //SERVER GENERATED
        "name": "3310",  // NOT NULL
        "description": "somthing longer", // NOT NUL
        "brand": "nokia", // NOT NUL
        "image_url":"https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", NOT NUL
        "price": 100, // NOT NUL
        "category": "smartphones" // NOT NUL
        "created_at": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
        "updated_at": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
    }

And the reviews look like this:

     {
        "id": 1, //SERVER GENERATED
        "comment": "A good book but definitely I don't like many parts of the plot", // NOT NUL
        "rate": 3, //REQUIRED, max 5
        "product_id": "5d318e1a8541744830bef139", // NOT NUL
        "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
    }

BACKEND

You are in charge of building the Backend using NodeJS + Express + Postgres

The backend should include the following features:

CRUD for Products ( /products GET, POST, DELETE, PUT)

CRUD for Reviews ( /reviews GET, POST, DELETE, PUT)

Extra method for product's image upload (POST /product/:id/upload)

EXTRA

Bring reviews with a product with INNER JOIN

Bring products with REVIEW run two queries.
