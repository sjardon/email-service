import { ICircuitBreaker } from '../../domain/circuit-breaker/circuit_breaker';

enum CircuitBreakerStates {
  OPEN = 'open',
  CLOSE = 'close',
  HALFOPEN = 'half-open',
}

interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
}

export class CircuitBreaker implements ICircuitBreaker {
  private failureThreshold: number;
  private recoveryTimeout: number;
  private state: CircuitBreakerStates = CircuitBreakerStates.CLOSE;
  private failureCount: number = 0;
  private lastFailureTime: number | null = null;

  constructor(config: CircuitBreakerConfig) {
    const { failureThreshold, recoveryTimeout } = config;
    this.failureThreshold = failureThreshold;
    this.recoveryTimeout = recoveryTimeout;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitBreakerStates.OPEN) {
      if (this.timeSinceLastFailure() > this.recoveryTimeout) {
        this.state = CircuitBreakerStates.HALFOPEN;
      } else {
        throw new Error(`Circuit Breaker is ${CircuitBreakerStates.OPEN}`);
      }
    }

    try {
      const response = await fn();
      this.onSuccess();
      return response;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = CircuitBreakerStates.CLOSE;
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.failureThreshold) {
      this.state = CircuitBreakerStates.OPEN;
    }
  }

  private timeSinceLastFailure() {
    return Date.now() - (this.lastFailureTime || 0);
  }
}
