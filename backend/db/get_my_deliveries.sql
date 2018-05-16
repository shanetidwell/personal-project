-- select * from delivery_requests d
-- join gift_requests g on g.id = d.gift_request_id
-- where d.status <> 'declined';

select d.id, g.user_id, d.gift_request_id, d.status, d.acceptance_seen, 
    g.user_id as requester_id, g.gender, g.years_old, g.interests, g.size, g.favorite_colors, g.notes, g.money_amount, u.name
from delivery_requests d
join gift_requests g on g.id = d.gift_request_id
join users u on u.id = g.user_id
where d.status <> 'declined'
and d.user_id = ${user_id};

