import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as StellarSdk from '@stellar/stellar-sdk';
import { z } from 'zod';

const sequenceRequestSchema = z.object({
  account_id: z.string()
    .min(1, "Account ID is required")
    .refine(
      (val) => StellarSdk.StrKey.isValidEd25519PublicKey(val),
      "Invalid Stellar account address format"
    ),
  network: z.enum(['testnet', 'mainnet'], {
    errorMap: () => ({ message: "Network must be 'testnet' or 'mainnet'" })
  })
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/sequence', async (req, res) => {
    try {
      const validationResult = sequenceRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: validationResult.error.errors[0].message 
        });
      }

      const { account_id, network } = validationResult.data;

      const horizonUrl = network === 'testnet' 
        ? 'https://horizon-testnet.stellar.org'
        : 'https://horizon.stellar.org';

      const server = new StellarSdk.Horizon.Server(horizonUrl, {
        allowHttp: false,
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const accountData = await Promise.race([
        server.accounts().accountId(account_id).call(),
        timeoutPromise
      ]) as StellarSdk.Horizon.AccountResponse;

      return res.json({
        account_id,
        sequence: accountData.sequence,
        network
      });

    } catch (error: any) {
      if (error?.response?.status === 404) {
        return res.status(404).json({ 
          error: 'Account not found on the Stellar network. Make sure the account exists and has been funded.' 
        });
      }

      if (error?.message === 'Request timeout') {
        return res.status(504).json({ 
          error: 'Request timeout. The Stellar network is taking too long to respond. Please try again.' 
        });
      }

      if (error?.message?.includes('Network Error') || error?.code === 'ENOTFOUND') {
        return res.status(503).json({ 
          error: 'Unable to connect to Stellar network. Please check your internet connection and try again.' 
        });
      }

      console.error('Error fetching sequence:', error);
      return res.status(500).json({ 
        error: 'An unexpected error occurred. Please try again later.' 
        });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
