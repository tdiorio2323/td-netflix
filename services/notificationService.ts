export type NotificationEvent = {
  type: 'new_comment' | 'new_like';
  [key: string]: any;
};

export type NotificationCallback = (notification: NotificationEvent) => void;

class NotificationService {
  private socket: WebSocket | null = null;
  private callbacks: NotificationCallback[] = [];

  connect(url: string = 'ws://localhost:8080'): void {
    if (this.socket) return;
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
  }

  subscribe(cb: NotificationCallback): void {
    this.callbacks.push(cb);
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
