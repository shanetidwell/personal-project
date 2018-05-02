INSERT INTO gift_requests ( user_id,gender, years_old, interests, size, favorite_colors, notes, status )
VALUES (${user_id}, ${gender},${years_old},${interests}, ${size},${favorite_colors},${notes}, 'pending')

RETURNING *;
