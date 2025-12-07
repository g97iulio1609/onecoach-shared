-- Migration: Normalize all macro values to 2 decimal places
-- This ensures consistency across all nutrition-related JSONB fields

-- Function to round JSON numeric values to 2 decimals
CREATE OR REPLACE FUNCTION round_json_macro_value(value jsonb, key text)
RETURNS jsonb AS $$
BEGIN
  IF value ? key AND jsonb_typeof(value->key) = 'number' THEN
    RETURN jsonb_set(
      value,
      ARRAY[key],
      to_jsonb(ROUND((value->>key)::numeric, 2))
    );
  END IF;
  RETURN value;
END;
$$ LANGUAGE plpgsql;

-- Function to normalize macros object (calories, protein, carbs, fats, fiber)
CREATE OR REPLACE FUNCTION normalize_macros_json(macros jsonb)
RETURNS jsonb AS $$
BEGIN
  IF macros IS NULL OR jsonb_typeof(macros) != 'object' THEN
    RETURN macros;
  END IF;
  
  macros := round_json_macro_value(macros, 'calories');
  macros := round_json_macro_value(macros, 'protein');
  macros := round_json_macro_value(macros, 'carbs');
  macros := round_json_macro_value(macros, 'fats');
  macros := round_json_macro_value(macros, 'fiber');
  
  RETURN macros;
END;
$$ LANGUAGE plpgsql;

-- Function to recursively normalize macros in nested JSON structures
CREATE OR REPLACE FUNCTION normalize_nested_macros(data jsonb)
RETURNS jsonb AS $$
DECLARE
  result jsonb := data;
  key text;
  value jsonb;
BEGIN
  IF data IS NULL THEN
    RETURN NULL;
  END IF;
  
  IF jsonb_typeof(data) = 'object' THEN
    -- Check if this is a macros object
    IF data ? 'calories' OR data ? 'protein' OR data ? 'carbs' OR data ? 'fats' THEN
      RETURN normalize_macros_json(data);
    END IF;
    
    -- Recursively process object keys
    FOR key IN SELECT jsonb_object_keys(data) LOOP
      value := data->key;
      IF jsonb_typeof(value) IN ('object', 'array') THEN
        result := jsonb_set(result, ARRAY[key], normalize_nested_macros(value));
      END IF;
    END LOOP;
  ELSIF jsonb_typeof(data) = 'array' THEN
    -- Process array elements
    SELECT jsonb_agg(normalize_nested_macros(elem))
    INTO result
    FROM jsonb_array_elements(data) AS elem;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Update food_items.macrosPer100g
UPDATE food_items
SET "macrosPer100g" = normalize_macros_json("macrosPer100g")
WHERE "macrosPer100g" IS NOT NULL;

-- Update nutrition_plans.targetMacros
UPDATE nutrition_plans
SET "targetMacros" = normalize_macros_json("targetMacros")
WHERE "targetMacros" IS NOT NULL;

-- Update nutrition_plans.weeks (nested structure)
UPDATE nutrition_plans
SET weeks = normalize_nested_macros(weeks)
WHERE weeks IS NOT NULL;

-- Update nutrition_day_logs.meals (nested structure)
UPDATE nutrition_day_logs
SET meals = normalize_nested_macros(meals)
WHERE meals IS NOT NULL;

-- Update nutrition_day_logs.actualDailyMacros
UPDATE nutrition_day_logs
SET "actualDailyMacros" = normalize_macros_json("actualDailyMacros")
WHERE "actualDailyMacros" IS NOT NULL;

-- Update nutrition_plan_versions.targetMacros
UPDATE nutrition_plan_versions
SET "targetMacros" = normalize_macros_json("targetMacros")
WHERE "targetMacros" IS NOT NULL;

-- Update nutrition_plan_versions.weeks (nested structure)
UPDATE nutrition_plan_versions
SET weeks = normalize_nested_macros(weeks)
WHERE weeks IS NOT NULL;

-- Clean up functions (optional - can be kept for future use)
-- DROP FUNCTION IF EXISTS normalize_nested_macros(jsonb);
-- DROP FUNCTION IF EXISTS normalize_macros_json(jsonb);
-- DROP FUNCTION IF EXISTS round_json_macro_value(jsonb, text);

