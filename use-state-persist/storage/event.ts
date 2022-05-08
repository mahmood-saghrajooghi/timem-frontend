interface IEvent<T> {
  on(handler: { (data?: T): void }): void;
  off(handler: { (data?: T): void }): void;
}

export class Event<T> implements IEvent<T> {
  private handlers: { (data?: T): void }[] = [];

  public on(handler: { (data?: T): void }): () => void {
    this.handlers.push(handler);
    return () => this.off(handler);
  }

  public off(handler: { (data?: T): void }): void {
    this.handlers = this.handlers.filter(h => h !== handler);
  }

  public trigger(data?: T) {
    this.handlers.slice(0).forEach(h => h(data));
  }

  public expose(): Event<T> {
    return this;
  }
}
