-- Migration: Add Performance Indexes
-- Date: 2024-11-29
-- Description: Aggiunge indici per migliorare le performance delle query più frequenti
--              Include indici composti, full-text search vectors e ottimizzazioni JOIN.
--
-- NOTA: Usa CREATE INDEX CONCURRENTLY per evitare lock su tabelle in produzione.
--       Tuttavia, all'interno di una transazione (migration), CONCURRENTLY non è supportato.
--       Per ambienti di produzione critici, eseguire questi indici separatamente.

-- ============================================================================
-- ALTA PRIORITÀ - Query più frequenti
-- ============================================================================

-- EXERCISES: Query lista esercizi approvati ordinati per data
CREATE INDEX IF NOT EXISTS idx_exercises_approval_created 
  ON exercises("approvalStatus", "createdAt" DESC);

-- WORKOUT_SESSIONS: Query sessioni utente per programma
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_program 
  ON workout_sessions("userId", "programId");

-- WORKOUT_SESSIONS: Query cronologiche sessioni utente con orderBy
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_started 
  ON workout_sessions("userId", "startedAt" DESC);

-- WORKOUT_PROGRAMS: Query programmi attivi per utente
CREATE INDEX IF NOT EXISTS idx_workout_programs_user_status 
  ON workout_programs("userId", "status");

-- NUTRITION_PLANS: Query piani attivi per utente
CREATE INDEX IF NOT EXISTS idx_nutrition_plans_user_status 
  ON nutrition_plans("userId", "status");

-- NUTRITION_DAY_LOGS: Query log per range date utente
CREATE INDEX IF NOT EXISTS idx_nutrition_day_logs_user_date 
  ON nutrition_day_logs("userId", "date");

-- NUTRITION_DAY_LOGS: Query log specifici per piano e date
CREATE INDEX IF NOT EXISTS idx_nutrition_day_logs_user_plan_date 
  ON nutrition_day_logs("userId", "planId", "date");

-- CONVERSATIONS: Lista conversazioni utente ordinate
CREATE INDEX IF NOT EXISTS idx_conversations_user_lastmsg 
  ON conversations("userId", "lastMessageAt" DESC);

-- CONVERSATION_MESSAGES: Messaggi ordinati per sequenza
CREATE INDEX IF NOT EXISTS idx_conversation_messages_conv_seq 
  ON conversation_messages("conversationId", "sequence");

-- CREDIT_TRANSACTIONS: Storico transazioni utente cronologico
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_created 
  ON credit_transactions("userId", "createdAt" DESC);

-- PLANNINGPLAN: Piani in progress per utente
CREATE INDEX IF NOT EXISTS idx_planning_plan_user_status 
  ON "PlanningPlan"("userId", "status");

-- EXERCISE_PERFORMANCE_RECORDS: Storico performance per esercizio
CREATE INDEX IF NOT EXISTS idx_exercise_perf_user_ex_date 
  ON exercise_performance_records("userId", "exerciseId", "date");


-- ============================================================================
-- MEDIA PRIORITÀ - Query secondarie frequenti
-- ============================================================================

-- WORKOUT_SESSIONS: Query sessione specifica per settimana/giorno
CREATE INDEX IF NOT EXISTS idx_workout_sessions_prog_week_day 
  ON workout_sessions("programId", "weekNumber", "dayNumber");

-- WORKOUT_PROGRAMS: Lista programmi utente ordinata
CREATE INDEX IF NOT EXISTS idx_workout_programs_user_created 
  ON workout_programs("userId", "createdAt" DESC);

-- NUTRITION_PLANS: Lista piani utente ordinata cronologicamente
CREATE INDEX IF NOT EXISTS idx_nutrition_plans_user_created 
  ON nutrition_plans("userId", "createdAt" DESC);

-- NUTRITION_DAY_LOGS: Aggregazioni settimanali per piano
CREATE INDEX IF NOT EXISTS idx_nutrition_day_logs_plan_week 
  ON nutrition_day_logs("planId", "weekNumber");

-- CONVERSATION_MESSAGES: Messaggi ordinati per data
CREATE INDEX IF NOT EXISTS idx_conversation_messages_conv_created 
  ON conversation_messages("conversationId", "createdAt");

-- PROJECT: Progetti attivi per utente
CREATE INDEX IF NOT EXISTS idx_project_user_status 
  ON "Project"("userId", "status");

-- PROJECT: Lista progetti ordinata
CREATE INDEX IF NOT EXISTS idx_project_user_created 
  ON "Project"("userId", "createdAt" DESC);

-- TASK: Task per progetto filtrando stato
CREATE INDEX IF NOT EXISTS idx_task_project_status 
  ON "Task"("projectId", "status");

-- TASK: Ordinamento task
CREATE INDEX IF NOT EXISTS idx_task_project_order 
  ON "Task"("projectId", "order");

-- TASK: Task scadenti per utente
CREATE INDEX IF NOT EXISTS idx_task_user_duedate 
  ON "Task"("userId", "dueDate");

-- MARKETPLACE_PLANS: Filtro piani pubblicati per tipo
CREATE INDEX IF NOT EXISTS idx_marketplace_plans_pub_type 
  ON marketplace_plans("isPublished", "planType");

-- MARKETPLACE_PLANS: Ordinamento per rating
CREATE INDEX IF NOT EXISTS idx_marketplace_plans_pub_rating 
  ON marketplace_plans("isPublished", "averageRating" DESC NULLS LAST);

-- USERS: Ordinamento lista utenti
CREATE INDEX IF NOT EXISTS idx_users_created 
  ON users("createdAt");

-- USERS: Query admin per utenti attivi per ruolo
CREATE INDEX IF NOT EXISTS idx_users_role_status 
  ON users("role", "status");

-- PLANNINGPLAN: Query piani per tipo e stato
CREATE INDEX IF NOT EXISTS idx_planning_plan_agent_status 
  ON "PlanningPlan"("agentType", "status");

-- PLANNINGPLAN: Lista piani ordinata
CREATE INDEX IF NOT EXISTS idx_planning_plan_user_created 
  ON "PlanningPlan"("userId", "createdAt" DESC);

-- CREDIT_TRANSACTIONS: Query transazioni per tipo
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_type 
  ON credit_transactions("userId", "type");

-- EXERCISE_PERFORMANCE_RECORDS: Performance globali per periodo
CREATE INDEX IF NOT EXISTS idx_exercise_perf_user_date 
  ON exercise_performance_records("userId", "date");

-- EXERCISE_PERFORMANCE_RECORDS: Join con workout_sessions
CREATE INDEX IF NOT EXISTS idx_exercise_perf_session 
  ON exercise_performance_records("sessionId") WHERE "sessionId" IS NOT NULL;


-- ============================================================================
-- FULL-TEXT SEARCH VECTORS
-- ============================================================================

-- Abilita full-text search per exercise_translations (italiano)
-- Step 1: Aggiungi colonna tsvector se non esiste
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'exercise_translations' AND column_name = 'search_vector_ita'
  ) THEN
    ALTER TABLE exercise_translations 
    ADD COLUMN search_vector_ita tsvector 
    GENERATED ALWAYS AS (
      setweight(to_tsvector('italian', COALESCE(name, '')), 'A') ||
      setweight(to_tsvector('italian', COALESCE("shortName", '')), 'B') ||
      setweight(to_tsvector('italian', COALESCE(description, '')), 'C')
    ) STORED;
  END IF;
END $$;

-- Step 2: Crea indice GIN per full-text search exercises
CREATE INDEX IF NOT EXISTS idx_exercise_tr_fts 
  ON exercise_translations USING GIN(search_vector_ita);


-- Abilita full-text search per food_item_translations (italiano)
-- Step 1: Aggiungi colonna tsvector se non esiste
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'food_item_translations' AND column_name = 'search_vector_ita'
  ) THEN
    ALTER TABLE food_item_translations 
    ADD COLUMN search_vector_ita tsvector 
    GENERATED ALWAYS AS (
      setweight(to_tsvector('italian', COALESCE(name, '')), 'A') ||
      setweight(to_tsvector('italian', COALESCE(description, '')), 'B')
    ) STORED;
  END IF;
END $$;

-- Step 2: Crea indice GIN per full-text search food items
CREATE INDEX IF NOT EXISTS idx_food_tr_fts 
  ON food_item_translations USING GIN(search_vector_ita);


-- ============================================================================
-- BASSA PRIORITÀ - Ottimizzazioni aggiuntive
-- ============================================================================

-- MARKETPLACE_PLANS: Piani coach pubblicati
CREATE INDEX IF NOT EXISTS idx_marketplace_plans_coach_pub 
  ON marketplace_plans("coachId", "isPublished");

-- HABIT: Abitudini attive per utente
CREATE INDEX IF NOT EXISTS idx_habit_user_archived 
  ON "Habit"("userId", "archived");

-- HABITLOG: Log per data
CREATE INDEX IF NOT EXISTS idx_habitlog_habit_date 
  ON "HabitLog"("habitId", "date");

-- SUBSCRIPTIONS: Sottoscrizioni attive per utente
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status 
  ON subscriptions("userId", "status");

-- USER_PROFILES: Indice composto per query utente (già ottimale con unique)

-- BODY_MEASUREMENTS: Già ben indicizzato

-- NUTRITION_ADHERENCE_METRICS: Metriche per piano e settimana
CREATE INDEX IF NOT EXISTS idx_nutrition_adherence_plan_week 
  ON nutrition_adherence_metrics("planId", "weekNumber");


-- ============================================================================
-- VERIFICA FINALE
-- ============================================================================
-- Per verificare gli indici creati:
-- SELECT indexname, tablename FROM pg_indexes 
-- WHERE schemaname = 'public' 
-- AND indexname LIKE 'idx_%'
-- ORDER BY tablename, indexname;
