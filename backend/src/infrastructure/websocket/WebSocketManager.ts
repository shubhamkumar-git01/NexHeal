import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Logger } from '../logger/Logger';

export class WebSocketManager {
  private static io: Server;

  static initialize(server: HttpServer): void {
    this.io = new Server(server, {
      cors: {
        origin: '*', // Should be restricted in production
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connection', (socket: Socket) => {
      Logger.info(`WebSocket connected: ${socket.id}`);

      // Emergency Live Tracking
      socket.on('join-emergency', (incidentId) => {
        socket.join(`emergency_${incidentId}`);
        Logger.info(`Socket ${socket.id} joined emergency_${incidentId}`);
      });

      // Ambulance Tracking
      socket.on('join-ambulance', (ambulanceId) => {
        socket.join(`ambulance_${ambulanceId}`);
        Logger.info(`Socket ${socket.id} joined ambulance_${ambulanceId}`);
      });

      // Dashboard Live Updates
      socket.on('join-dashboard', (hospitalId) => {
        socket.join(`dashboard_${hospitalId}`);
        Logger.info(`Socket ${socket.id} joined dashboard_${hospitalId}`);
      });

      socket.on('disconnect', () => {
        Logger.info(`WebSocket disconnected: ${socket.id}`);
      });
    });
  }

  static emitToRoom(room: string, event: string, data: any): void {
    if (this.io) {
      this.io.to(room).emit(event, data);
    }
  }

  static close(): void {
    if (this.io) {
      this.io.close();
      Logger.info('WebSocket server closed.');
    }
  }
}
