const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function createTableEditoras() {
  pool.query(`
    create table if not exists editora (
      id serial not null primary key,
      name varchar(50) not null,
      website varchar(50) not null
    );
  `)
}

function createTableLivros() {
  pool.query(`
    create table if not exists livro (
      id serial not null primary key,
      title varchar(50) not null,
      description varchar(50) not null,
      price numeric(10,2) not null,
      editora_id serial not null,
      foreign key ("editora_id") references "editora"(id)
    );
  `)
}

module.exports = { pool, createTableEditoras, createTableLivros }
