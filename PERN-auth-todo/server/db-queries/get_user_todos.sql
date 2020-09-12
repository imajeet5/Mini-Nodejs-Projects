DROP FUNCTION IF EXISTS get_user_todos();



CREATE OR REPLACE FUNCTION get_user_todos(uid uuid) 
RETURNS TABLE(user_name varchar(255), todo_id int, description varchar(255)) AS
$$
BEGIN

RETURN QUERY
SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1;

END;
$$
LANGUAGE plpgsql;