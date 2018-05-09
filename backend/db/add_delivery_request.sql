INSERT INTO delivery_requests ( user_id, gift_request_id, status, delivery_request_seen, delivery_amount)
VALUES (${user_id}, ${gift_request_id}, 'pending', false, ${delivery_amount})

RETURNING *;