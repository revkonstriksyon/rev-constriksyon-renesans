import { useState, useEffect } from 'react';
import { Button } from './button';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  className?: string;
}

export const Captcha = ({ onVerify, className = '' }: CaptchaProps) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setUserInput('');
    setIsVerified(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    const isValid = userInput.toLowerCase() === captchaCode.toLowerCase();
    setIsVerified(isValid);
    onVerify(isValid);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (isVerified) {
      setIsVerified(false);
      onVerify(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3 font-mono text-xl tracking-wider select-none">
          <span className="text-primary font-bold">{captchaCode}</span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generateCaptcha}
          className="flex-shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Tape kòd la"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
        <Button
          type="button"
          onClick={handleVerify}
          disabled={!userInput.trim()}
          className="flex-shrink-0"
        >
          Verifye
        </Button>
      </div>
      
      {isVerified && (
        <p className="text-sm text-green-600 font-medium">
          ✓ CAPTCHA verifye ak siksè
        </p>
      )}
      
      {userInput && !isVerified && userInput.length >= captchaCode.length && (
        <p className="text-sm text-red-600">
          Kòd la pa kòrèk. Eseye ankò.
        </p>
      )}
    </div>
  );
};