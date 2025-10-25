import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { spawn } from "child_process";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

let angularDevServer: any = null;

export async function setupAngular(app: Express, server: Server) {
  log("Starting Angular development server...", "angular");
  
  // Start Angular CLI dev server
  angularDevServer = spawn('npx', ['ng', 'serve', '--port', '4200', '--host', '0.0.0.0'], {
    stdio: 'inherit',
    shell: true
  });

  angularDevServer.on('error', (err: Error) => {
    log(`Angular dev server error: ${err.message}`, "angular");
  });

  // Wait a bit for Angular to start
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Proxy requests to Angular dev server
  app.use("*", async (req, res) => {
    try {
      const url = `http://localhost:4200${req.originalUrl}`;
      const response = await fetch(url);
      const body = await response.text();
      res.status(response.status).send(body);
    } catch (e: any) {
      log(`Error proxying to Angular: ${e.message}`, "angular");
      res.status(500).send("Angular dev server not ready");
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "..", "dist", "client", "browser");

  if (!fs.existsSync(distPath)) {
    log(`Build directory not found at: ${distPath}. Building Angular app...`, "angular");
    
    // Build the Angular app
    const buildProcess = spawn('npx', ['ng', 'build'], {
      stdio: 'inherit',
      shell: true
    });

    buildProcess.on('close', (code) => {
      if (code !== 0) {
        throw new Error(`Angular build failed with code ${code}`);
      }
    });
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

process.on('exit', () => {
  if (angularDevServer) {
    angularDevServer.kill();
  }
});
