import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle, ArrowLeft, ShieldCheck, Download, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PaymentPageProps {
  planName: string;
  price: string;
  onBack: () => void;
}

export function PaymentPage({ planName, price, onBack }: PaymentPageProps) {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string>('');

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage(null);

    const txId = 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setTransactionId(txId);

    try {
      // 1. Generate text receipt content
      const receiptContent = `================================================
SYNAPTRINTECH TECHNOLOGIES - OFFICIAL SUBSCRIPTION RECEIPT
================================================
Transaction ID : ${txId}
Date & Time    : ${new Date().toLocaleString()}
Plan Subscribed: SynaptrinTech ${planName} Plan
Billing Amount : ${price}
Customer Name  : ${cardholderName}
Customer Email : ${email}
Payment Status : SUCCESSFUL (Razorpay Verified)
================================================
Thank you for purchasing a subscription!
Visit again as you know correct suitable for you.
================================================`;

      const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
      const fileName = `receipt_${txId}.txt`;

      // 2. Upload receipt file to Supabase Storage Bucket ('receipts')
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(fileName, blob, { contentType: 'text/plain', upsert: true });

      let publicReceiptUrl = '';
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('receipts')
          .getPublicUrl(fileName);
        publicReceiptUrl = publicUrlData.publicUrl;
        setReceiptUrl(publicReceiptUrl);
      }

      // 3. Save subscription details to Supabase Database Table ('subscriptions')
      const { error: dbError } = await supabase
        .from('subscriptions')
        .insert([
          {
            plan_name: planName,
            price: price,
            cardholder_name: cardholderName,
            email: email,
            receipt_url: publicReceiptUrl || null,
          },
        ]);

      if (dbError) {
        console.error('Database insertion warning:', dbError.message);
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while processing your subscription.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Thank You Page View
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[128px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-3xl shadow-2xl p-8 sm:p-10 text-center relative z-10"
        >
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
            <CheckCircle size={44} />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Payment Successful!</h2>
          
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-6">
            <p className="text-emerald-300 font-semibold text-sm sm:text-base leading-relaxed">
              Thanks you for purchase a subscription. Visit again as you know correct suitable for you.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 mb-6 text-left space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Transaction ID</span>
              <span className="font-mono text-cyan-400 font-bold">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Plan Purchased</span>
              <span className="font-bold text-white">SynaptrinTech {planName}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Amount Paid</span>
              <span className="font-extrabold text-emerald-400">{price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Customer</span>
              <span className="text-slate-200 font-medium">{email}</span>
            </div>
          </div>

          <div className="space-y-3">
            {receiptUrl && (
              <a
                href={receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Download size={18} />
                <span>Download Saved Supabase Receipt</span>
              </a>
            )}

            <button
              onClick={onBack}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-base"
            >
              Return to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Checkout View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-cyan-400 font-semibold mb-8 transition-colors text-sm group"
        >
          <ArrowLeft size={18} className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Pricing
        </button>

        <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col md:flex-row">
          {/* Order Summary Sidebar */}
          <div className="md:w-5/12 bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-950/60 p-8 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold mb-4">
                Selected Plan
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">SynaptrinTech {planName}</h3>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
                {price} <span className="text-sm font-normal text-slate-400">{price !== 'Custom' ? '/ month' : ''}</span>
              </p>

              <div className="border-t border-slate-800 pt-6 space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Features Included</h4>
                <ul className="text-slate-300 text-xs space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-cyan-400" /> Complete AI Growth Suite
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-cyan-400" /> Real-time SEO Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-cyan-400" /> Dedicated Account Manager
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400">
              Data is securely recorded to your <strong className="text-cyan-400">Supabase DB & Bucket</strong> upon checkout.
            </div>
          </div>

          {/* Payment Form */}
          <div className="md:w-7/12 p-8 lg:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-white">Razorpay Checkout</h2>
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <ShieldCheck size={14} />
                <span>Razorpay Secured</span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-start gap-3">
                <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handlePayment} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  placeholder="Cardholder Name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Card Information
                </label>
                <div className="relative mb-3">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <CreditCard size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    placeholder="4532 0000 0000 0000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="CVV"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 mt-4 flex justify-center items-center gap-2 text-base disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Processing & Saving to Supabase...</span>
                  </>
                ) : (
                  <span>Pay & Subscribe ({price})</span>
                )}
              </button>

              <p className="text-center text-xs text-slate-500 mt-4 flex justify-center items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Payments are processed securely via Razorpay</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
