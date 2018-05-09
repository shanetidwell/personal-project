select q2.id, q2.name, q2.gift_request_id, q2.acceptance_seen, q2.delivery_request_seen, q2.delivery_amount, r.user_id, avg(stars) from ratings r 
left join (select  d.id, d.user_id, u.name, d.gift_request_id, d.acceptance_seen, d.delivery_request_seen, d.delivery_amount 
            from delivery_requests d
            join users u on u.id = d.user_id
            where d.gift_request_id = ${gift_request_id}
            and d.status <> 'declined') q2 
    on q2.user_id = r.user_id
where r.user_id in (select  d.user_id 
            from delivery_requests d
            join users u on u.id = d.user_id
            where d.gift_request_id = ${gift_request_id}
            and d.status <> 'declined' )
group by r.user_id, q2.id, q2.name, q2.gift_request_id, q2.acceptance_seen, q2.delivery_request_seen, q2.delivery_amount;

-- select d.id, d.user_id, u.name, d.gift_request_id, d.acceptance_seen, d.delivery_request_seen, r.stars from delivery_requests d
-- join users u on u.id = d.user_id
-- left join ratings r on r.user_id = d.user_id
-- where d.gift_request_id = ${gift_request_id}
-- and d.status <> 'declined'