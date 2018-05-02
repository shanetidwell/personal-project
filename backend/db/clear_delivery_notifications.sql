update delivery_requests
set delivery_request_seen = true
where gift_request_id in(select id from gift_requests where user_id = ${user_id})
returning *;


