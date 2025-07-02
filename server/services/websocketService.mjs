
// When using ES modules (files with .mjs extension), we need to import the Server class directly
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

class WebSocketService {
  constructor() {
    this.wss = null;
    this.clients = new Set();
  }

  initialize(server) {
    // Create WebSocket server - now using WebSocketServer directly
    this.wss = new WebSocketServer({ 
      server,
      path: '/api/admin/activity-stream'
    });

    this.wss.on('connection', (ws) => {
      // Add client to the set
      this.clients.add(ws);
      
      console.log(`WebSocket client connected. Total clients: ${this.clients.size}`);
      
      // Send welcome message
      ws.send(JSON.stringify({
        type: 'connection',
        data: 'Connected to admin activity stream'
      }));

      // Handle disconnection
      ws.on('close', () => {
        this.clients.delete(ws);
        console.log(`WebSocket client disconnected. Total clients: ${this.clients.size}`);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        // Remove client on error
        this.clients.delete(ws);
      });
    });

    console.log('WebSocket server initialized');
  }

  // Broadcast activity to all connected clients
  broadcastActivity(username, action, details, ipAddress) {
    if (!this.wss) {
      console.error('WebSocket server not initialized');
      return;
    }

    const activityData = {
      id: uuidv4(),
      username,
      action,
      timestamp: new Date(),
      ipAddress,
      details
    };

    const message = JSON.stringify({
      type: 'activity',
      data: activityData
    });

    // Send to all connected clients
    this.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

export const websocketService = new WebSocketService();
