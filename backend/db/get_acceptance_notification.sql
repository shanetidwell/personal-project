select count(*)
from delivery_requests
where user_id = ${user_id}
and status <> 'declined'
and acceptance_seen = false;