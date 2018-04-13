INSERT INTO store_requests ( user_id, store_name, city, zip, status )
VALUES (${user_id}, ${store_name},${city},${zip}, 'pending')

RETURNING *;