select gr.id, gr.user_id, gr.status, gr.gender, gr.years_old, gr.interests, gr.size, gr.favorite_colors, gr.notes, gr.fulfiller_id, gr.money_amount, u.name from gift_requests gr
join users u on u.id = gr.user_id
where gr.status not in ('being fulfilled', 'fulfilled')
and user_id <> ${user_id}