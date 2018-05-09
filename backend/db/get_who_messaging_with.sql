select (case when (mmtt.user_one <> ${user_id})Then us1.name else us2.name end)
from message_thread mmtt
-- join message_thread mmtt on mmtt.id = mess.message_thread_id
join users us1 on us1.id = mmtt.user_one
join users us2 on us2.id = mmtt.user_two
where mmtt.id = ${thread_id}