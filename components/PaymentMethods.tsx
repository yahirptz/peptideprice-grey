import { Bitcoin, DollarSign, Wallet } from 'lucide-react';

export default function PaymentMethods() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
        <Bitcoin className="h-5 w-5 text-orange-400" />
        <span className="text-sm text-slate-300">Bitcoin</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
        <Wallet className="h-5 w-5 text-purple-400" />
        <span className="text-sm text-slate-300">Zelle</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
        <DollarSign className="h-5 w-5 text-green-400" />
        <span className="text-sm text-slate-300">Cash App</span>
      </div>
    </div>
  );
}