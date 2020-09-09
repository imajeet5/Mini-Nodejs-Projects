DROP FUNCTION IF EXISTS get_user();

CREATE OR REPLACE FUNCTION get_user(email varchar) 
RETURNS SETOF users AS
$$
BEGIN

RETURN QUERY
SELECT * FROM users WHERE user_email = email;

END;
$$
LANGUAGE plpgsql;

-- Overloading the function to get data from the user_id also

CREATE FUNCTION get_user(u_id uuid) 
RETURNS SETOF users AS
$$
BEGIN

RETURN QUERY
SELECT * FROM users WHERE user_id = u_id;

END;
$$
LANGUAGE plpgsql;

-- SELECT * FROM get_user(u_id:='064b6307-0b83-436f-9f0c-3e13accf0124')