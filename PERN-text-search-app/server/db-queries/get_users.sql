CREATE OR REPLACE FUNCTION get_users(user_name text)
RETURNS SETOF users AS 
$$
BEGIN

RETURN QUERY 
SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE '%'||$1||'%';

END;
$$
LANGUAGE plpgsql;

-- SELECT * FROM get_users('Buck')