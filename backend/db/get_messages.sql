-- select * from messages
-- where message_thread_id = ${thread_id};


-- select m.id, m.message_thread_id, m.sender, m.message, 
--     (case when (mt.user_one <> ${user_id})Then u.name else u2.name end) as message_with
-- from messages m
-- join message_thread mt on mt.id = m.message_thread_id
-- join users u on u.id = mt.user_one
-- join users u2 on u2.id = mt.user_two
-- where message_thread_id = ${thread_id}

-- select (case when (mmttt.user_one <> ${user_id})Then us1.name else us2.name end)
-- from messages mess
-- join message_thread mmtt on mmtt.id = mess.message_thread_id
-- join users us1 on us1.id = mmtt.user_one
-- join users us2 on us2.id = mmtt.user_two

select m.id, m.message_thread_id, m.sender, m.message, 
    (case when (mt.user_one <> ${user_id})Then u.name else u2.name end) as message_with
from messages m
join message_thread mt on mt.id = m.message_thread_id
join users u on u.id = mt.user_one
join users u2 on u2.id = mt.user_two
where message_thread_id = ${thread_id};


