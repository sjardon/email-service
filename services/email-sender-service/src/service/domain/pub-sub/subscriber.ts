export interface Subscriber {
  subscribe(
    channel: string,
    messageHandler: (channel: string, message: string) => void,
  ): Promise<void>;

  quit(): Promise<void>;
}
