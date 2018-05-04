select * from message_thread
where user_one in (${user_id}, ${recipientId})
and user_two in (${user_id}, ${recipientId});
