export type NotificationEvent = {
  type: 'new_comment' | 'new_like';
  [key: string]: any;
};

export type NotificationCallback = (notification: NotificationEvent) => void;

class NotificationService {
  private socket: WebSocket | null = null;
  private callbacks: NotificationCallback[] = [];
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private shouldReconnect = true;

  connect(url: string = 'ws://localhost:8080'): void {
    if (this.socket) return;
    this.shouldReconnect = true;
    this.socket = new WebSocket(url);
    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const data: NotificationEvent = JSON.parse(event.data);
        this.callbacks.forEach(cb => cb(data));
        this.persist(data);
      } catch (err) {
        console.error('Failed to parse notification', err);
      }
    };
    this.socket.onerror = (err: Event) => {
      console.error('WebSocket error', err);
    };
    this.socket.onclose = () => {
      console.warn('WebSocket closed');
      this.socket = null;
      if (this.shouldReconnect) {
        this.reconnectTimeout = setTimeout(() => this.connect(url), 5000);
      }
    };
  }

  subscribe(cb: NotificationCallback): void {
    this.callbacks.push(cb);
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  private persist(notification: NotificationEvent): void {
    try {
      const existing = this.getPersisted();
      existing.push({ ...notification, timestamp: Date.now() });
      localStorage.setItem('notifications', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to persist notification', err);
    }
  }

  getPersisted(): NotificationEvent[] {
    try {
      const raw = localStorage.getItem('notifications');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}

export const notificationService = new NotificationService();
