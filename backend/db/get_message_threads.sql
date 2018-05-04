-- select * from message_thread
-- where user_one = ${user_id}
-- or user_two = ${user_id};

select m.id, (case when (user_one <> ${user_id})Then user_one else user_two end) as user_id,
        (case when (user_one <> ${user_id})Then u.name else u2.name end) from message_thread m
join users u on u.id = m.user_one
join users u2 on u2.id = m.user_two
where user_one = ${user_id}
or user_two = ${user_id}