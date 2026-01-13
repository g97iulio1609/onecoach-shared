# OneCoach Shared - Agent Guide

> **Meta**: Shared types, schemas, constants, and utilities. Single source of truth for data structures across the entire platform.

## Quick Reference

| Attribute    | Value                                       |
| :----------- | :------------------------------------------ |
| **Monorepo** | `submodules/onecoach-shared`                |
| **Purpose**  | Types, Zod schemas, constants, shared logic |
| **Used By**  | Backend, Frontend, Mobile                   |

---

## Package Structure

```
submodules/onecoach-shared/
├── packages/
│   ├── types/          # @onecoach/types - TypeScript definitions
│   ├── schemas/        # @onecoach/schemas - Zod validation
│   ├── constants/      # @onecoach/constants - App constants
│   ├── contracts/      # @onecoach/contracts - API contracts
│   ├── lib-shared/     # @onecoach/lib-shared - Utilities
│   └── lib-theme/      # @onecoach/lib-theme - Theme state
```

---

## Key Packages

### `@onecoach/types`

All shared TypeScript definitions:

- `src/index.ts` - Core types
- `src/prisma-helpers.ts` - Prisma-related types

### `@onecoach/schemas`

Zod validation schemas:

- `src/exercise.schema.ts`
- `src/food.schema.ts`
- `src/workout.schema.ts`
- `src/nutrition.schema.ts`

> [!CAUTION]
> **Never reinvent schemas.** Import from `@onecoach/schemas`.

### `@onecoach/constants`

Centralized constants:

- `supported-locales` - i18n configuration
- `subscription-prices` - IAP data
- `config` - General app config

### `@onecoach/contracts`

API contracts and service interfaces for consistent inter-service communication.

### `@onecoach/lib-shared`

Utility belt:

- `id-generator` - Unique ID creation
- `storage.service` - Storage helpers
- `date-utils` - Date manipulation (date-fns)
- `utils/validation` - Common validators
- `utils/formatters` - Data formatters

### `@onecoach/lib-theme`

Theme management:

- Zustand store for theme state
- React ThemeProvider

---

## Usage

```typescript
// Types
import { UserProfile, Workout } from '@onecoach/types';

// Schemas
import { workoutSchema, nutritionPlanSchema } from '@onecoach/schemas';

// Constants
import { SUPPORTED_LOCALES } from '@onecoach/constants';

// Utilities
import { generateId, formatDate } from '@onecoach/lib-shared';
```

---

## Navigation Guide

### Finding Types

1. Check `packages/types/src/index.ts`
2. For DB models, check Prisma-related files

### Validating Data

Always use `@onecoach/schemas`:

```typescript
import { workoutSchema } from '@onecoach/schemas';

const result = workoutSchema.safeParse(data);
if (!result.success) {
  // Handle validation error
}
```

### Adding Utilities

Before writing a helper:

1. Check `packages/lib-shared/` - it likely exists
2. If new, add to appropriate module in `lib-shared`

---

## Development Guidelines

| Action           | Location               |
| :--------------- | :--------------------- |
| Add type         | `packages/types/`      |
| Add schema       | `packages/schemas/`    |
| Add constant     | `packages/constants/`  |
| Add utility      | `packages/lib-shared/` |
| Add API contract | `packages/contracts/`  |
