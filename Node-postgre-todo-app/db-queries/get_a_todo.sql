DROP FUNCTION IF EXISTS get_a_todo();

CREATE OR REPLACE FUNCTION get_a_todo(todoID integer) 
RETURNS SETOF todo AS
$$
BEGIN

RETURN QUERY
SELECT * FROM todo WHERE todo_id = todoID;

END;
$$
LANGUAGE plpgsql;

-- select * from get_a_todo(3);