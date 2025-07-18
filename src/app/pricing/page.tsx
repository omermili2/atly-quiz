// src/app/pricing/page.tsx
'use client';
import { Check, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import analytics from '@/lib/analytics';

const ATLY_LOGO = "/atly-logo.png";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  useEffect(() => {
    // Track pricing page view
    analytics.trackPricingPageViewed();
  }, []);

  const handlePlanChange = (planType: 'annual' | 'monthly') => {
    setSelectedPlan(planType);
    analytics.trackPlanSelected(planType);
  };

  const handleCheckoutStart = () => {
    const planPrice = selectedPlan === 'annual' ? 69.99 : 13.99;
    analytics.trackCheckoutStarted(selectedPlan, planPrice);
    // Add your checkout logic here
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-br from-[#2b2e7a] via-[#5a2d91] to-[#a259c6]">
      <header className="w-full flex items-center justify-center">
        <a href="https://www.atly.com/" target="_blank" rel="noopener noreferrer">
          <img src={ATLY_LOGO} alt="Atly logo" className="h-16 w-auto drop-shadow-2xl rounded-2xl backdrop-blur-lg cursor-pointer hover:scale-105 transition-transform duration-200" style={{ background: 'none' }} />
        </a>
      </header>

        {/* Trust Badges */}
        <div className="flex justify-center gap-12 mb-10">
          <div className="text-center text-white/90">
            <div className="text-xs font-semibold mb-1">🛡️ GLUTENED-FREE</div>
            <div className="text-xs">GUARANTEE</div>
          </div>
          <div className="text-center text-white/90">
            <div className="text-xs font-semibold mb-1">🏆 #1 DIETITIAN&apos;S</div>
            <div className="text-xs">CHOICE</div>
          </div>
          <div className="text-center text-white/90">
            <div className="text-xs font-semibold mb-1">📱 MOST RELIABLE</div>
            <div className="text-xs">CELIAC APP</div>
          </div>
        </div>
      
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Start your 7-day free trial</h1>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-4 mb-8">
          {/* Annual Plan */}
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

          {/* Monthly Plan */}
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

        {/* Payment Form */}
          <div className="flex items-center justify-center text-white mb-4">
            <span className="text-sm">🔒 Secure payment</span>
          </div>
          
          {/* Card Form */}
          <div className="bg-white rounded-2xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <CreditCard size={20} className="text-blue-600 mr-3" />
              <span className="text-lg font-semibold text-gray-800">Card</span>
            </div>
            
            {/* Card Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7eb3] focus:border-transparent outline-none"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" className="w-6 h-4" />
                  <img src="https://img.icons8.com/color/24/mastercard.png" alt="Mastercard" className="w-6 h-4" />
                  <img src="https://img.icons8.com/color/24/amex.png" alt="Amex" className="w-6 h-4" />
                </div>
              </div>
            </div>
            
            {/* Expiration and CVC */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration date</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7eb3] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Security code</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7eb3] focus:border-transparent outline-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CreditCard size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terms */}
            <p className="text-sm text-gray-500 leading-relaxed">
              By providing your card information, you allow Atly to charge your card for future payments in accordance with their terms.
            </p>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">7-DAY FREE TRIAL</h3>
            <p className="text-white/80 text-sm">No commitment. Cancel anytime.</p>
          </div>

        {/* CTA Button */}
        <button 
          onClick={handleCheckoutStart}
          className="w-full bg-gradient-to-r from-[#ff7eb3] via-[#ff758c] to-[#ff7eb3] text-white font-bold py-4 rounded-full text-xl shadow-xl hover:scale-105 transition-transform duration-200 mb-4"
        >
          START MY FREE TRIAL
        </button>

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