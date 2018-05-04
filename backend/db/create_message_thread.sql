INSERT INTO message_thread ( user_one, user_two)
VALUES (${user_id}, ${recipientId})

RETURNING *;