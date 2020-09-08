DROP FUNCTION IF EXISTS update_todo();

CREATE OR REPLACE FUNCTION update_todo(todoID integer, des varchar(250)) 
RETURNS SETOF todo AS
$$
BEGIN

RETURN QUERY
UPDATE todo SET description = des WHERE todo_id = todoID RETURNING *;

END;
$$
LANGUAGE plpgsql;

-- select * from update_todo(3, 'updated todo');