select count(*)
from delivery_requests d
left join gift_requests g on g.id = d.gift_request_id
where g.user_id = ${user_id}
and g.status not in('fulfilled', 'being fulfilled') 
and delivery_request_seen = false;
