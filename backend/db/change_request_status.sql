update gift_requests
set status = ${status},
    requester_id = ${user_id}
where id = ${gift_request_id}

returning *;
