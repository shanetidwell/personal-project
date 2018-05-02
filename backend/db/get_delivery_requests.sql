select d.id, d.user_id, u.name, d.gift_request_id, d.acceptance_seen, d.delivery_request_seen, r.stars from delivery_requests d
join users u on u.id = d.user_id
left join ratings r on r.user_id = d.user_id
where d.gift_request_id = ${gift_request_id}
and d.status <> 'declined'