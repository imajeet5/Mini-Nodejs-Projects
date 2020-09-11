DROP FUNCTION IF EXISTS get_all_todo();

CREATE OR REPLACE FUNCTION get_all_todo() 
RETURNS SETOF todo AS
$$
BEGIN

RETURN QUERY
SELECT * FROM todo;

END;
$$
LANGUAGE plpgsql;

-- select * from get_all_todo();