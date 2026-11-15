'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Check, Zap } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface CreatePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePackageModal({ isOpen, onClose }: CreatePackageModalProps) {
  const { createPackage } = useAuth();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('₹399');
  const [priceNumber, setPriceNumber] = useState(399);
  const [period, setPeriod] = useState('/month');
  const [accountLimit, setAccountLimit] = useState(10);
  const [postLimit, setPostLimit] = useState('Unlimited');
  const [isPopular, setIsPopular] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'Reels 9:16 Auto-Detect',
    '1080p High Quality Video Mode',
    'Multi-Destination Scheduling Queue',
  ]);

  if (!isOpen) return null;

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featureInput.trim()) return;
    setFeatures([...features, featureInput.trim()]);
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createPackage({
      name: name.trim(),
      price: price.startsWith('₹') || price.startsWith('$') ? price : `₹${price}`,
      priceNumber: Number(priceNumber) || 399,
      period: period,
      accountLimit: Number(accountLimit) || 10,
      monthlyPostLimit: postLimit,
      features: [
        `${accountLimit} Social Channels`,
        `${postLimit} Posts & Reels`,
        ...features,
      ],
      isPopular: isPopular,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans text-white animate-in fade-in duration-150">
      <div className="bg-[#1e2025] border border-[#2a2d34] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2a2d34] flex items-center justify-between bg-[#16171b]">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8fd98b]" />
              <span>Create Subscription Package</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Packages created here will instantly appear inside creator upgrade options
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto max-h-[80vh]">
          {/* Plan Name */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Package Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Creator Plus Tier or Enterprise"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
            />
          </div>

          {/* Price & Period Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Display Price</label>
              <input
                type="text"
                required
                placeholder="₹399 or $29"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  const num = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                  if (!isNaN(num)) setPriceNumber(num);
                }}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Billing Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white focus:outline-none cursor-pointer"
              >
                <option value="/month">/month</option>
                <option value="/year">/year</option>
                <option value="forever">forever (Free)</option>
              </select>
            </div>
          </div>

          {/* Channels & Posts Limit Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Max Channels Allowed</label>
              <input
                type="number"
                min={1}
                max={100}
                value={accountLimit}
                onChange={(e) => setAccountLimit(Number(e.target.value))}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white focus:outline-none focus:border-[#8fd98b]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Monthly Posts Limit</label>
              <select
                value={postLimit}
                onChange={(e) => setPostLimit(e.target.value)}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white focus:outline-none cursor-pointer"
              >
                <option value="Unlimited">Unlimited</option>
                <option value="50 posts / mo">50 posts / mo</option>
                <option value="25 posts / mo">25 posts / mo</option>
                <option value="10 posts / mo">10 posts / mo</option>
              </select>
            </div>
          </div>

          {/* Popular Toggle */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="isPopular"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
              className="rounded bg-[#16171b] border-[#2a2d34] text-[#8fd98b] focus:ring-0 cursor-pointer w-4 h-4"
            />
            <label htmlFor="isPopular" className="text-slate-300 font-medium cursor-pointer">
              Tag as "Most Popular" / Recommended Tier
            </label>
          </div>

          {/* Features Manager */}
          <div className="pt-2 border-t border-[#2a2d34]">
            <label className="block font-semibold text-slate-300 mb-1.5">Feature Checklist</label>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Add a benefit (e.g. Priority Support)..."
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className="flex-1 bg-[#16171b] border border-[#2a2d34] rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-2.5 bg-[#26282f] hover:bg-[#343842] text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#16171b] border border-[#26282f] text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-[#8fd98b]" />
                    <span>{feat}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-[#2a2d34] flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              Save & Launch Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
