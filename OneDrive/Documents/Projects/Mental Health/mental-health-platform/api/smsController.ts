import { Request, Response } from 'express';
import { smsService } from '../services/smsService';
import { supabase } from '../services/supabase';

/**
 * Handle incoming SMS messages from MessageBird webhook
 */
export async function handleIncomingSMS(req: Request, res: Response) {
  try {
    const { from, to, message, timestamp } = req.body;

    if (!from || !to || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: from, to, message' 
      });
    }

    // Process the incoming message
    await smsService.handleIncomingMessage(message, from);

    res.status(200).json({ 
      success: true, 
      message: 'Message processed successfully' 
    });
  } catch (error) {
    console.error('Error handling incoming SMS:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}

/**
 * Handle SMS delivery status updates from MessageBird
 */
export async function handleSMSStatusUpdate(req: Request, res: Response) {
  try {
    const { messageId, status, timestamp } = req.body;

    if (!messageId || !status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: messageId, status' 
      });
    }

    // Update message status in database
    const { error } = await supabase
      .from('sms_messages')
      .update({ 
        status: status.toLowerCase(),
        delivered_at: timestamp ? new Date(timestamp).toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', messageId);

    if (error) {
      console.error('Error updating message status:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to update message status' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Status updated successfully' 
    });
  } catch (error) {
    console.error('Error handling SMS status update:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}

/**
 * Get SMS message history for a specific phone number
 */
export async function getSMSHistory(req: Request, res: Response) {
  try {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number is required' 
      });
    }

    const history = await smsService.getMessageHistory(phoneNumber as string);

    res.status(200).json({ 
      success: true, 
      data: history 
    });
  } catch (error) {
    console.error('Error getting SMS history:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}

/**
 * Send an SMS message (for testing or admin use)
 */
export async function sendSMS(req: Request, res: Response) {
  try {
    const { to, message, crisisDetected = false } = req.body;

    if (!to || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: to, message' 
      });
    }

    const result = await smsService.sendMessage(to, message, crisisDetected);

    res.status(200).json({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message' 
    });
  }
}

/**
 * Create crisis alert and send immediate response
 */
export async function createCrisisAlert(req: Request, res: Response) {
  try {
    const { phoneNumber, message, severity = 'high' } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: phoneNumber, message' 
      });
    }

    // Send immediate crisis response
    const crisisMessage = "Thank you for reaching out. A crisis counselor will respond shortly. " +
      "If this is an emergency, call 911 or your local emergency number. " +
      "You can also text HOME to 741741 to reach the Crisis Text Line.";

    await smsService.sendMessage(phoneNumber, crisisMessage, true);

    // Send crisis resources
    await smsService.sendCrisisResources(phoneNumber);

    res.status(200).json({ 
      success: true, 
      message: 'Crisis alert created and response sent' 
    });
  } catch (error) {
    console.error('Error creating crisis alert:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create crisis alert' 
    });
  }
}