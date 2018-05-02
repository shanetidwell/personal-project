update users
set street = ${street},
    city = ${city},
    state = ${state},
    zip = ${zip}
   
where id = ${user_id}

RETURNING *;
