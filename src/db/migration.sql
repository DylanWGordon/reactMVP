DROP TABLE IF EXISTS portfolio;
CREATE TABLE portfolio(
    art_id SERIAL,
    art_name VARCHAR,
    art_year INTEGER,
    art_tags VARCHAR,
    about VARCHAR,
    image_url VARCHAR
)


