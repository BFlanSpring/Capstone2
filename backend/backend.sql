\echo 'Delete and recreate backend db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE backend;
CREATE DATABASE backend;
\connect backend

\i backend-schema.sql
\i backend-seed.sql

\echo 'Delete and recreate backend_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE backend_test;
CREATE DATABASE backend_test;
\connect backend_test

\i backend-schema.sql
