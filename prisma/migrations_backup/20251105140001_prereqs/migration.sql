-- 0001_prereqs (KISS/DRY)
-- Nota: i prerequisiti essenziali (es. citext) sono già abilitati nella baseline per garantire fresh install.
-- Questa migrazione resta intenzionalmente vuota per separare responsabilità
-- e fungere da hook per eventuali futuri prerequisiti.

-- Esempio (commentato):
-- CREATE EXTENSION IF NOT EXISTS citext;
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- CREATE EXTENSION IF NOT EXISTS unaccent;


