select * from gift_requests
where status not in ('being fulfilled', 'fulfilled')
and user_id <> ${user_id};