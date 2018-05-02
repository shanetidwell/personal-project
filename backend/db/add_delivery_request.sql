INSERT INTO delivery_requests ( user_id, gift_request_id, status, delivery_request_seen)
VALUES (${user_id}, ${gift_request_id}, 'pending', false)

RETURNING *;