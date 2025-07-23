'use client';
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import type { PlanType } from '@/lib/types';
import analytics from '@/lib/analytics';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('annual');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryError, setExpiryError] = useState('');

  useEffect(() => {
    analytics.trackPricingPageViewed();
  }, []);

  const handlePlanChange = (planType: PlanType) => {
    setSelectedPlan(planType);
    analytics.trackPlanSelection(planType);
    // IMPLEMENT PAYMENT HANDLING
  };

  const handleCheckoutStart = () => {
    analytics.trackCheckoutStart(selectedPlan);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      const month = v.substring(0, 2);
      const year = v.substring(2, 4);
      return month + (year.length > 0 ? ' / ' + year : '');
    }
    
    return v;
  };

  const validateExpiryDate = (value: string) => {
    const parts = value.split(' / ');
    if (parts.length === 2) {
      const month = parseInt(parts[0]);
      const year = parseInt(parts[1]);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if ((month < 1 || month > 12) || (year < currentYear || (year === currentYear && month < currentMonth))) {
        return 'Invalid expiry date';
      }
    }
    return '';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    if (formattedValue.length <= 7) {
      setExpiryDate(formattedValue);
      const error = validateExpiryDate(formattedValue);
      setExpiryError(error);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8">
      <div className="text-center mt-2 max-w-2xl mx-auto px-4">
        <h2 className="text-4xl md:text-3xl font-bold text-white mb-4 tracking-wide font-sans">
          7-DAY FREE TRIAL
        </h2>
        <p className="text-center text-white/70 text-sm mb-8">
          No commitment. Cancel anytime.
        </p>
      </div>
        
      
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Plan Selection */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h2>
            
            <div className="space-y-4 mb-6">
              {/* Annual Plan */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'annual' 
                    ? 'border-white bg-white/20' 
                    : 'border-white/30 bg-white/5'
                }`}
                onClick={() => handlePlanChange('annual')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">Annual Plan</h3>
                    <p className="text-white/80">Save 60% with annual billing</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">$5.83</div>
                    <div className="text-sm text-white/70 mb-1">per month</div>
                    <div className="text-sm text-white/70">$69.99 billed annually</div>
                  </div>
                </div>
              </div>

              {/* Monthly Plan */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'monthly' 
                    ? 'border-white bg-white/20' 
                    : 'border-white/30 bg-white/5'
                }`}
                onClick={() => handlePlanChange('monthly')}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">Monthly Plan</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">$13.99</div>
                    <div className="text-sm text-white/70">per month</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-2">
              <div className="flex items-center gap-3 text-white">
                <Check size={20} className="text-green-400" />
                <span>Access to 270k+ verified locations</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Check size={20} className="text-green-400" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Check size={20} className="text-green-400" />
                <span>Expert-vetted reviews</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Check size={20} className="text-green-400" />
                <span>24/7 community support</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-white mb-2">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1 opacity-75">
                    <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" width={28} height={24} className="w-7 h-6" />
                    <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" width={28} height={24} className="w-7 h-6" />
                    <img src="https://img.icons8.com/color/32/amex.png" alt="Amex" width={28} height={24} className="w-7 h-6" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM / YY"
                    className={`w-full p-3 rounded-lg bg-white/20 border text-white placeholder-white/50 focus:outline-none focus:border-white ${
                      expiryError ? 'border-red-400' : 'border-white/30'
                    }`}
                  />
                  {expiryError && <p className="text-red-400 text-sm mt-1">{expiryError}</p>}
                </div>
                <div>
                  <label className="block text-white mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center text-white/90 mt-6 mb-12">
                <span className="text-sm">🔒 Secured payment</span>
              </div>

              <div className="flex items-center text-center text-white/70 text-sm mt-5">
                <span>By providing your card information, you allow Atly to charge your card for future payments in accordance with their terms.</span>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section - Updated to match image design */}
      
        <div className="text-center mt-16 mb-8 max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Button
            onClick={handleCheckoutStart}
            className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-full text-lg md:text-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            START MY FREE TRIAL
          </Button>
        </div>

        <p className="text-white/70 text-sm">
          You won&apos;t be charged till {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </p>
      </div>
    </main>
  );
}