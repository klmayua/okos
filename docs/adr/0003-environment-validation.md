# ADR 0003: Environment Variable Validation

## Status
Accepted

## Date
2026-05-10

## Context
OkOS requires explicit environment configuration with:
- Startup validation blocking on missing variables
- Type-safe environment access
- Runtime boundary enforcement

## Decision
Use Zod for environment validation:
- All environment variables defined in `.env.example`
- Zod schemas with transforms for type coercion
- Validation at startup with clear error messages
- Runtime boundaries enforced (browser vs server)

## Consequences

### Positive
- Fail-fast on misconfiguration
- Type-safe environment access
- Clear documentation of required variables

### Negative
- Must maintain .env.example alongside code

## References
- [Zod](https://zod.dev)