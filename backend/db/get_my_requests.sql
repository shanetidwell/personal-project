select g.id, g.user_id, g.status, g.gender, g.years_old, g.interests, g.size, g.favorite_colors, g.notes, g.fulfiller_id, g.money_amount, g.delivery_amount, u.name
from gift_requests g
left join users u on u.id = g.fulfiller_id
where user_id = ${user_id}
and status <> 'fulfilled'
order by id;
