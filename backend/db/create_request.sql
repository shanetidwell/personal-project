INSERT INTO gift_requests ( user_id,gender, years_old, interests, size, favorite_colors, notes, status, money_amount )
VALUES (${user_id}, ${gender},${years_old},${interests}, ${size},${favorite_colors},${notes}, 'pending', ${maxMoney})

RETURNING *;
