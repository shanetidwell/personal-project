INSERT INTO items( user_id, store_request_id, description, brand,size, color, price, quantity, link )
VALUES (${user_id}, ${store_request_id}, ${description}, ${brand}, ${size}, ${color}, ${price} ,${quantity} ,${link})

Returning *;

--Select * from items
--where store_request_id = ${store_request_id};
