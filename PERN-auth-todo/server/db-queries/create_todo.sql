DROP FUNCTION IF EXISTS create_todo();

CREATE OR REPLACE FUNCTION create_todo(u_id uuid, des varchar(255)) 
RETURNS SETOF todos AS
$$
BEGIN

RETURN QUERY
INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *;

END;
$$
LANGUAGE plpgsql;


-- select * from insert_todo('testing function');