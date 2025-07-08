import { useState, useEffect } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

export const useRateLimit = (config: RateLimitConfig) => {
  const [attempts, setAttempts] = useState<number[]>([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);

  const { maxAttempts, windowMs, blockDurationMs } = config;

  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1000) {
            setIsBlocked(false);
            setAttempts([]);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeRemaining]);

  const recordAttempt = () => {
    const now = Date.now();
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    // Add current attempt
    const newAttempts = [...recentAttempts, now];
    setAttempts(newAttempts);

    // Check if rate limit exceeded
    if (newAttempts.length >= maxAttempts) {
      setIsBlocked(true);
      setBlockTimeRemaining(blockDurationMs);
      return false;
    }

    return true;
  };

  const getRemainingTime = () => {
    return Math.ceil(blockTimeRemaining / 1000);
  };

  const reset = () => {
    setAttempts([]);
    setIsBlocked(false);
    setBlockTimeRemaining(0);
  };

  return {
    isBlocked,
    remainingTime: getRemainingTime(),
    recordAttempt,
    reset,
    attemptsCount: attempts.length
  };
};