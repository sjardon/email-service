export interface ICircuitBreaker {
  call<T>(fn: () => Promise<T>): Promise<T>;
}
