# @ok-os/geography

Synthetic Nigeria geography engine for OkOS simulation.

## Features

- Complete Nigerian geographic hierarchy (country → zones → states → LGAs → wards → polling units)
- Deterministic seed-based generation
- Language distribution modeling
- Economic profile generation
- Voting profile simulation
- Connectivity and network quality modeling
- Security risk assessment

## Usage

```typescript
import { createGeography, getStates, getLgas } from '@ok-os/geography';

const entities = createGeography({ seed: 'deterministic-seed' });
const states = getStates(entities);
const lgas = getLgas(entities);
```

## Deterministic Generation

The same seed will always produce the same geographic entities:

```typescript
const entities1 = createGeography({ seed: 'test-seed' });
const entities2 = createGeography({ seed: 'test-seed' });
// entities1 === entities2 (structurally equivalent)
```