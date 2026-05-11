# @ok-os/personas

Synthetic population engine for OkOS simulation.

## Features

- 1M-10M scalable synthetic population
- 15 persona categories (students, artisans, farmers, traders, civic organizers, etc.)
- Deterministic seed-based generation
- Behavioral modeling (civic engagement, trust, misinformation susceptibility)
- Realistic demographic distribution by state/LGA

## Usage

```typescript
import { createPersonas, getVoters, getVolunteers } from '@ok-os/personas';

const personas = createPersonas({ seed: 'test-seed', count: 10000 });
const voters = getVoters(personas, 0.3);
const volunteers = getVolunteers(personas, 0.5);
```

## Deterministic Generation

```typescript
const p1 = createPersonas({ seed: 'seed123', count: 1000 });
const p2 = createPersonas({ seed: 'seed123', count: 1000 });
// p1 and p2 are structurally equivalent
```