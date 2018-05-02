update delivery_requests
set acceptance_seen = true
where user_id = ${user_id}
returning *;
