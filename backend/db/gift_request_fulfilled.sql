update gift_requests
set status = 'fulfilled'
where id = ${gift_request_id};

-- update gift_requests
-- set status = 'being fulfilled',
--   fulfiller_id = ${deliverer_id}
-- where id = ${gift_request_id};

select g.id, g.user_id, g.status, g.gender, g.years_old, g.interests, g.size, g.favorite_colors, g.notes, g.fulfiller_id, u.name
from gift_requests g
left join users u on u.id = g.fulfiller_id
where user_id = ${user_id}
and status <> 'fulfilled'
order by id;