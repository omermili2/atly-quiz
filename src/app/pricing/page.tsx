'use client';
import { Check, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
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
    analytics.trackPlanSelected(planType);
  };

  const handleCheckoutStart = () => {
    const planPrice = selectedPlan === 'annual' ? 69.99 : 13.99;
    analytics.trackCheckoutStarted(selectedPlan, planPrice);
    // Add your checkout logic here
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
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (v.length === 4) {
      const month = parseInt(v.substring(0, 2));
      const year = parseInt(v.substring(2, 4));
      
      if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth))  {
        return 'Invalid expiration date';
      }

    } else if (v.length > 0) {
      return 'Please enter complete date (MM/YY)';
    }
    
    return '';
  };

  const formatCvv = (value: string) => {
    return value.replace(/[^0-9]/gi, '').substring(0, 3);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
    const error = validateExpiryDate(formatted);
    setExpiryError(error);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCvv(e.target.value);
    setCvv(formatted);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      <header className="w-full flex items-center justify-center">
        <Logo size="md" />
      </header>

        <div className="flex justify-center gap-12 mb-10">
          <div className="text-center text-white/90">
            <div className="text-xs font-semibold mb-1">GLUTENED-FREE</div>
            <div className="text-xs font-semibold mb-1">GUARANTEE</div>
            <div className="text-xs font-semibold">🛡️</div>
          </div>
          <div className="text-center text-white/90">
            <div className="text-xs font-semibold mb-1">#1 DIETITIAN&apos;S</div>
            <div className="text-xs font-semibold mb-1">CHOICE</div>
            <div className="text-xs font-semibold">🏆</div>
          </div>
          <div className="text-center text-white/90">
            <div className="text-xs font-semibold mb-1">MOST RELIABLE</div>
            <div className="text-xs font-semibold">CELIAC APP</div>
            <div className="text-xs font-semibold">📱</div>
          </div>
        </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Start your free trial</h1>
        </div>

        <div className="space-y-4 mb-8">
          <div 
            className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
              selectedPlan === 'annual' ? 'ring-2 ring-[#ff7eb3]' : ''
            }`}
            onClick={() => handlePlanChange('annual')}
          >
            <div className="absolute -top-3 left-6 flex gap-2">
              <span className="bg-[#2b2e7a] text-white text-xs font-bold px-3 py-1 rounded-full">
                Save 60%
              </span>
              <span className="bg-[#00d4aa] text-white text-xs font-bold px-3 py-1 rounded-full">
                7-DAY FREE TRIAL
              </span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  selectedPlan === 'annual' 
                    ? 'bg-[#ff7eb3] border-[#ff7eb3]' 
                    : 'border-gray-300'
                }`}>
                  {selectedPlan === 'annual' && <Check size={16} className="text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2b2e7a]">Annual</h3>
                  <p className="text-sm text-gray-500">$69.99 billed annually</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#2b2e7a]">$5.83/mo</p>
                <p className="text-sm text-gray-400 line-through">$13.99/mo</p>
              </div>
            </div>
          </div>

          <div 
            className={`bg-white rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
              selectedPlan === 'monthly' ? 'ring-2 ring-[#ff7eb3]' : ''
            }`}
            onClick={() => handlePlanChange('monthly')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  selectedPlan === 'monthly' 
                    ? 'bg-[#ff7eb3] border-[#ff7eb3]' 
                    : 'border-gray-300'
                }`}>
                  {selectedPlan === 'monthly' && <Check size={16} className="text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2b2e7a]">1 Month</h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#2b2e7a]">$13.99/mo</p>
              </div>
            </div>
          </div>
        </div>

          <div className="flex items-center justify-center text-white mb-4">
            <span className="text-sm">🔒 Secure payment</span>
          </div>
          
          <div className="bg-white rounded-2xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <CreditCard size={20} className="text-blue-600 mr-3" />
              <span className="text-lg font-semibold text-gray-800">Card</span>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7eb3] focus:border-transparent outline-none text-gray-900 font-medium"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" className="w-7 h-6" />
                  <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" className="w-7 h-6" />
                  <img src="https://img.icons8.com/color/32/amex.png" alt="Amex" className="w-7 h-6" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration date</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={7}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 outline-none text-gray-900 font-medium ${
                    expiryError 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:ring-[#ff7eb3] focus:border-transparent'
                  }`}
                />
                {expiryError && <p className="text-red-500 text-xs mt-1">{expiryError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security code</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cvv}
                    onChange={handleCvvChange}
                    maxLength={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7eb3] focus:border-transparent outline-none text-gray-900 font-medium"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CreditCard size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              By providing your card information, you allow Atly to charge your card for future payments in accordance with their terms.
            </p>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">7-DAY FREE TRIAL</h3>
            <p className="text-white/80 text-sm">No commitment. Cancel anytime.</p>
          </div>

        <Button 
          variant="rounded"
          size="lg"
          fullWidth
          onClick={handleCheckoutStart}
          className="mb-4"
        >
          START MY FREE TRIAL
        </Button>

        <p className="text-center text-white/60 text-xs">
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