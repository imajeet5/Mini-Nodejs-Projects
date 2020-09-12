DROP FUNCTION IF EXISTS update_todo();

CREATE OR REPLACE FUNCTION update_todo(descrip varchar(250), t_id integer, u_id uuid ) 
RETURNS SETOF todos AS
$$
BEGIN

RETURN QUERY
UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *;

END;
$$
LANGUAGE plpgsql;