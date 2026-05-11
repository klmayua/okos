import { SCOPE, type ScopeType, type ContainerToken } from './tokens.js';

interface Registration<T> {
  token: ContainerToken;
  implementation: new (...args: unknown[]) => T;
  instance?: T;
  scope: ScopeType;
  dependencies: ContainerToken[];
}

export class Container {
  private registrations = new Map<ContainerToken, Registration<unknown>>();
  private resolved = new Map<ContainerToken, unknown>();

  constructor() {
    this.registerCoreServices();
  }

  private registerCoreServices(): void {
    console.log('[container] Core services registered');
  }

  register<T>(token: ContainerToken, implementation: new (...args: unknown[]) => T, scope: ScopeType = SCOPE.SINGLETON, dependencies: ContainerToken[] = []): void {
    if (this.registrations.has(token)) {
      throw new Error(`Token ${token} is already registered`);
    }
    this.registrations.set(token, {
      token,
      implementation,
      scope,
      dependencies,
    });
  }

  registerSingleton<T>(token: ContainerToken, implementation: new (...args: unknown[]) => T, dependencies: ContainerToken[] = []): void {
    this.register(token, implementation, SCOPE.SINGLETON, dependencies);
  }

  registerScoped<T>(token: ContainerToken, implementation: new (...args: unknown[]) => T, dependencies: ContainerToken[] = []): void {
    this.register(token, implementation, SCOPE.SCOPED, dependencies);
  }

  registerTransient<T>(token: ContainerToken, implementation: new (...args: unknown[]) => T, dependencies: ContainerToken[] = []): void {
    this.register(token, implementation, SCOPE.TRANSIENT, dependencies);
  }

  resolve<T>(token: ContainerToken): T {
    const registration = this.registrations.get(token) as Registration<T> | undefined;

    if (!registration) {
      throw new Error(`Token ${token} is not registered`);
    }

    if (registration.scope === SCOPE.SINGLETON && registration.instance) {
      return registration.instance;
    }

    const deps = registration.dependencies.map(dep => this.resolve(dep));
    const instance = new registration.implementation(...deps);

    if (registration.scope === SCOPE.SINGLETON) {
      registration.instance = instance;
      this.resolved.set(token, instance);
    }

    return instance;
  }

  has(token: ContainerToken): boolean {
    return this.registrations.has(token);
  }

  createScope(): Container {
    const child = new Container();
    for (const [token, reg] of this.registrations) {
      if (reg.scope === SCOPE.SINGLETON) {
        child.registrations.set(token, reg);
      }
    }
    return child;
  }

  clear(): void {
    this.registrations.clear();
    this.resolved.clear();
  }
}

const globalContainer = new Container();

export function getContainer(): Container {
  return globalContainer;
}

export function registerService<T>(token: ContainerToken, implementation: new (...args: unknown[]) => T, scope: ScopeType = SCOPE.SINGLETON): void {
  getContainer().register(token, implementation, scope);
}

export function resolveService<T>(token: ContainerToken): T {
  return getContainer().resolve<T>(token);
}