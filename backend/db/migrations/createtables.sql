create Table users (
    id serial primary key,
    name varchar,
    email varchar,
    auth_id varchar
    profile_pic text,
    street varchar,
    city varchar,
    state varchar,
    zip integer
);

CREATE Table ratings (
    id serial primary key,
    user_id integer references users(id),
    stars integer
);
Create table gift_requests (
    id serial PRIMARY key,
    user_id integer REFERENCES users(id),
    status varchar,
    requester_id integer REFERENCES users(id),
    gender varchar,
    years_old integer,
    interests varchar,
    size varchar,
    favorite_colors varchar,
    notes text 
)
Create table items (
    id serial PRIMARY key,
    user_id integer REFERENCES users(id),
    gift_request_id integer REFERENCES gift_requests(id),
    description text,
    price money,
    quantity INTEGER,
    link text,
    brand varchar,
    size varchar,
    color varchar
)