-- DROP TABLE IF EXISTS authors;
-- DROP TABLE IF EXISTS blogs;


-- how to update table ? 

-- https://www.postgresqltutorial.com/postgresql-alter-table/

CREATE TABLE IF NOT EXISTS 
    authors(
        author_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        avatar VARCHAR(255) DEFAULT 'https://i.pravatar.cc/300',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    

CREATE TABLE IF NOT EXISTS
    blogs(
        blog_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        cover VARCHAR(255) DEFAULT 'https://picsum.photos/900/600',
        author_id INTEGER NOT NULL REFERENCES authors(author_id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );