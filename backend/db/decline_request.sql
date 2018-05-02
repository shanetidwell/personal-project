update delivery_requests
set status = 'declined'
where id = ${delivery_request_id}

returning *;