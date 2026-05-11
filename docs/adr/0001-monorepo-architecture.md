# ADR 0001: Monorepo Architecture with pnpm + turbo

## Status
Accepted

## Date
2026-05-10

## Context
OkOS requires a monorepo architecture to manage multiple applications, packages, and services while maintaining:
- Shared dependencies and types
- Enforced import boundaries
- Consistent build tooling
- Efficient CI/CD

## Decision
We will use:
- **pnpm** as package manager with workspace support
- **turbo** as build orchestrator for task coordination and caching
- **TypeScript** in strict mode across all packages
- **ESLint** with boundaries plugin for import enforcement

## Consequences

### Positive
- Single source of truth for types and configuration
- Atomic commits across related packages
- Efficient incremental builds via turbo
- Clear dependency graph

### Negative
- Larger repository size
- More complex tooling setup
- Requires careful boundary enforcement

## References
- [pnpm workspaces](https://pnpm.io/workspaces)
- [turbo.build](https://turbo.build)
- [ESLint boundaries](https://github.com/import-js/eslint-plugin-boundaries)