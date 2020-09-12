DROP FUNCTION IF EXISTS delete_a_todo();

CREATE OR REPLACE FUNCTION delete_a_todo(todoID integer, u_id uuid) 
RETURNS SETOF todos AS
$$
BEGIN

RETURN QUERY
DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *;

END;
$$
LANGUAGE plpgsql;


