import { QueueManager } from "../queue/QueueManager";

export interface NotificationPayload {
  userId: string;
  type: 'IN_APP' | 'PUSH' | 'EMAIL' | 'SMS' | 'WHATSAPP';
  templateKey: string;
  data: any;
}

export class NotificationManager {
  /**
   * Centralized Notification Architecture.
   * Maps abstract notifications to specific delivery queues based on type.
   */
  static async send(payload: NotificationPayload): Promise<void> {
    switch (payload.type) {
      case 'IN_APP':
        // Write to DB directly or via queue
        await QueueManager.enqueueNotification(payload);
        break;
      case 'PUSH':
        await QueueManager.enqueueNotification({ ...payload, delivery: 'FCM' });
        break;
      case 'EMAIL':
        await QueueManager.enqueueEmail(payload);
        break;
      case 'SMS':
        await QueueManager.enqueueSMS(payload);
        break;
      case 'WHATSAPP':
        await QueueManager.enqueueNotification({ ...payload, delivery: 'WHATSAPP' });
        break;
      default:
        console.warn("[NotificationManager] Unknown notification type.");
    }
  }
}
