export interface EmailProvider {
  send(from: string, to: string, body: string): Promise<boolean>;
}
