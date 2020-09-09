DROP FUNCTION IF EXISTS create_user();

CREATE OR REPLACE FUNCTION create_user("name" varchar, email varchar, "password" varchar) 
RETURNS SETOF users AS
$$
BEGIN

RETURN QUERY
INSERT INTO users(user_name, user_email, user_password) VALUES ("name", email, "password") RETURNING *;

END;
$$
LANGUAGE plpgsql;

SELECT * FROM create_user('abc', 'abc@gmail.com', 'password');