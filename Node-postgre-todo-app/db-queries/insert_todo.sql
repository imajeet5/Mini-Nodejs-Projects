DROP FUNCTION IF EXISTS insert_todo();

CREATE OR REPLACE FUNCTION insert_todo(des varchar(255)) 
RETURNS SETOF todo AS
$$
BEGIN

RETURN QUERY
INSERT INTO todo(description) VALUES (des) RETURNING *;

END;
$$
LANGUAGE plpgsql;

-- select * from insert_todo('testing function');