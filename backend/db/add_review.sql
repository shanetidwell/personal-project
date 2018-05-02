INSERT INTO ratings (user_id, stars, reviewer_id, review)
VALUES (${user_id}, ${stars}, ${reviewer_id}, ${review})

RETURNING *;