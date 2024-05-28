export interface Publisher {
  connect(): Promise<void>;

  publish(channel: string, message: string): Promise<number>;

  quit(): Promise<void>;
}
