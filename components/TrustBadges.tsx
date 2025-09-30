import { Shield, Lock, Truck, CheckCircle, FlaskConical, Package } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Lock,
      title: "Secure Checkout",
      description: "256-bit SSL encryption"
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Your data is safe"
    },
    {
      icon: Truck,
      title: "Discreet Shipping",
      description: "Plain unmarked packaging"
    },
    {
      icon: FlaskConical,
      title: "Lab Tested",
      description: "COA available on request"
    },
    {
      icon: Package,
      title: "Quality Assured",
      description: "Vetted suppliers only"
    },
    {
      icon: CheckCircle,
      title: "Order Tracking",
      description: "Track every shipment"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="flex flex-col items-center text-center p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg backdrop-blur hover:border-slate-600 transition"
        >
          <badge.icon className="h-8 w-8 text-slate-400 mb-2" />
          <h4 className="text-sm font-semibold text-white mb-1">{badge.title}</h4>
          <p className="text-xs text-slate-500">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}