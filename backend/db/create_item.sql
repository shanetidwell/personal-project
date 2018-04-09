INSERT INTO items( user_id, store_request_id, description, image_url, price, quantity, link )
VALUES (${user_id}, ${store_request_id}, ${description}, ${image_url}, ${price} ,${quantity} ,${link})

RETURNING *;
