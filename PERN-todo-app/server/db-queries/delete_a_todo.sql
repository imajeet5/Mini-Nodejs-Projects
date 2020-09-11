DROP FUNCTION IF EXISTS delete_a_todo();

CREATE OR REPLACE FUNCTION delete_a_todo(todoID integer) 
RETURNS SETOF todo AS
$$
BEGIN

RETURN QUERY
DELETE FROM todo WHERE todo_id = todoID RETURNING *;

END;
$$
LANGUAGE plpgsql;

-- select * from delete_a_todo(3);