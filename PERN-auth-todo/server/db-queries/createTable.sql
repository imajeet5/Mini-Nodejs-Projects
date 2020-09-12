
-- set extension
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
)



CREATE TABLE todo(
    todo_id SERIAL,
    user_id UUID NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id), 
    FOREIGN KEY (user_id) REFERENCES users(user_id)   
)


--  select * from pg_extension;

-- select * from pg_available_extensions;

-- CREATE EXTENSION "uuid-ossp";

-- INSERT INTO users (user_name, user_email, user_password) VALUES ('ajeet', 'imajeet5@gmail.com', 'singh7890')

-- INSERT into todos ( user_id, description) VALUES('2699bad5-5336-4cc5-8ca3-fac92b9085ed', 'go to gym')