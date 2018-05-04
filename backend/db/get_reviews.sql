select r.id, r.user_id, r.stars, r.reviewer_id, r.review, u.name, TO_Char(r.date_recorded, 'Mon dd, yyyy') as date_recorded from ratings r
left join users u on u.id = r.reviewer_id
where user_id = ${user_id};
