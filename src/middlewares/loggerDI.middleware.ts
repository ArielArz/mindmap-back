import { NextFunction, Request, Response } from 'express';

export function loggerDI(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    const colors = {
      reset: '\x1b[0m',
      cyan: '\x1b[36m', // 200-299
      yellow: '\x1b[33m', // 300-399
      red: '\x1b[31m',    // 400+
    };

    let color = colors.cyan;
    if (statusCode >= 400) color = colors.red;
    else if (statusCode >= 300) color = colors.yellow;

    const formattedTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Bogota',
    });

    console.log(`${color}${req.method} ${req.url} ${statusCode}${colors.reset} - ${duration}ms - ${formattedTime}`);
  });

  next();
}