-- select * from message_thread
-- where user_one = ${user_id}
-- or user_two = ${user_id};

-- select m.id, (case when (user_one <> ${user_id})Then user_one else user_two end) as user_id,
--         (case when (user_one <> ${user_id})Then u.name else u2.name end) from message_thread m
-- join users u on u.id = m.user_one
-- join users u2 on u2.id = m.user_two
-- where user_one = ${user_id}
-- or user_two = ${user_id}

select m.id, (case when (user_one <> ${user_id})Then user_one else user_two end) as user_id,
        (case when (user_one <> ${user_id})Then u.name else u2.name end), mess.message, mess.rn, mess.sender from message_thread m
join users u on u.id = m.user_one
join users u2 on u2.id = m.user_two
full outer join (select *, row_number () OVER (partition by message_thread_id order by id desc) as rn from messages
order by rn) mess on mess.message_thread_id = m.id
where user_one = ${user_id}
and ( rn is null or rn = 1)
or user_two = ${user_id}
and ( rn is null or rn = 1)
order by mess.id desc