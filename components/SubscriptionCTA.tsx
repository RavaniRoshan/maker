import React from 'react';
import { StarIcon, CheckCircleIcon } from './icons';

interface SubscriptionCTAProps {
  isSubscribed: boolean;
  onSubscribe: (subscribed: boolean) => void;
}

export const SubscriptionCTA: React.FC<SubscriptionCTAProps> = ({ isSubscribed, onSubscribe }) => {
  return (
    <div className="p-4 rounded-lg bg-accent border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center">
        {isSubscribed ? <CheckCircleIcon /> : <StarIcon />}
        <div className="ml-3">
          <h3 className="font-bold text-accent-foreground">
            {isSubscribed ? 'Premium Plan Active' : 'Upgrade to Premium'}
          </h3>
          <p className="text-sm text-accent-foreground/90">
            {isSubscribed ? 'You can now generate weekly meal plans!' : 'Unlock 7-day meal plans and more!'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${isSubscribed ? 'text-muted-foreground' : 'text-accent-foreground'}`}>
          {isSubscribed ? 'Free' : 'Premium'}
        </span>
        <label htmlFor="subscription-toggle" className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="subscription-toggle"
            className="sr-only peer"
            checked={isSubscribed}
            onChange={(e) => onSubscribe(e.target.checked)}
          />
          <div className="w-11 h-6 bg-muted rounded-full peer peer-focus:ring-4 peer-focus:ring-ring/40 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-muted-foreground/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
    </div>
  );
};