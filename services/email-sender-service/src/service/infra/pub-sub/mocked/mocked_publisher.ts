import { Publisher } from '../../../domain';

export class MockedPublisher implements Publisher {
  async connect() {}

  async publish(channel: string, message: string): Promise<number> {
    return 1;
  }

  async quit(): Promise<void> {}
}
