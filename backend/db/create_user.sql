INSERT INTO users ( name, auth_id, email, profile_pic )
VALUES (${name}, ${auth_id},${email},${profile_pic})

RETURNING *;