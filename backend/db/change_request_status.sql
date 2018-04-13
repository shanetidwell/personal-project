update store_requests
set status = ${status},
    driver_id = ${user_id}
where id = ${store_request_id}

returning *;
