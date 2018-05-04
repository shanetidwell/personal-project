INSERT INTO ratings (user_id, stars, reviewer_id, review, date_recorded)
VALUES (${user_id}, ${stars}, ${reviewer_id}, ${review}, CURRENT_DATE)

RETURNING *;