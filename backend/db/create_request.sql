INSERT INTO store_requests ( user_id, store_name, city, zip )
VALUES (${user_id}, ${store_name},${city},${zip})

RETURNING *;