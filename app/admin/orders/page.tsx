'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  total: number;
  profit: number;
  subtotal: number;
  shippingCharged: number;
  tax: number;
  totalCost: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  orderedAt: string;
  orderItems: OrderItem[];
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'shipped'>('all');

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/orders');
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      const ordersWithNumbers = data.map((order: Order) => ({
        ...order,
        total: Number(order.total),
        profit: Number(order.profit),
        subtotal: Number(order.subtotal || 0),
        shippingCharged: Number(order.shippingCharged || 0),
        tax: Number(order.tax || 0),
        totalCost: Number(order.totalCost || 0),
        orderItems: order.orderItems.map((item: OrderItem) => ({
          ...item,
          unitPrice: Number(item.unitPrice),
        })),
      }));
      setOrders(ordersWithNumbers);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateOrderStatus = async (orderId: number, paymentStatus: string, orderStatus: string) => {
    try {
      await fetch('/api/admin/orders/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, paymentStatus, orderStatus }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return order.paymentStatus === 'pending';
    if (filter === 'paid') return order.paymentStatus === 'paid';
    if (filter === 'shipped') return order.orderStatus === 'shipped';
    return true;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.paymentStatus === 'pending').length,
    paid: orders.filter((o) => o.paymentStatus === 'paid').length,
    shipped: orders.filter((o) => o.orderStatus === 'shipped').length,
    revenue: orders.reduce((sum, o) => sum + Number(o.total), 0),
    profit: orders.reduce((sum, o) => sum + Number(o.profit), 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order Management</h1>
            <p className="text-slate-400">Manage and track all orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm">Total Orders</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-yellow-400 text-sm">Pending</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-green-400 text-sm">Paid</div>
            <div className="text-2xl font-bold text-green-400">{stats.paid}</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-blue-400 text-sm">Shipped</div>
            <div className="text-2xl font-bold text-blue-400">{stats.shipped}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm">Revenue</div>
            <div className="text-2xl font-bold">${stats.revenue.toFixed(0)}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="text-slate-400 text-sm">Profit</div>
            <div className="text-2xl font-bold text-green-400">${stats.profit.toFixed(0)}</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all' ? 'bg-white text-slate-900' : 'bg-slate-800'
            }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${
              filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-slate-800'
            }`}
          >
            Pending Payment
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded ${
              filter === 'paid' ? 'bg-green-500 text-white' : 'bg-slate-800'
            }`}
          >
            Paid
          </button>
          <button
            onClick={() => setFilter('shipped')}
            className={`px-4 py-2 rounded ${
              filter === 'shipped' ? 'bg-blue-500 text-white' : 'bg-slate-800'
            }`}
          >
            Shipped
          </button>
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-slate-800 rounded-lg p-8 text-center text-slate-400">
              No orders found
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{order.orderNumber}</h3>
                    <p className="text-slate-400 text-sm">
                      {new Date(order.orderedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                    <div className="text-green-400 text-sm">
                      Profit: ${order.profit.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Customer</div>
                    <div className="font-semibold">{order.customerName}</div>
                    <div className="text-sm text-slate-400">{order.customerEmail}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-1">Shipping Address</div>
                    <div className="text-sm">
                      {order.shippingAddress}<br />
                      {order.shippingCity}, {order.shippingState} {order.shippingZip}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-slate-400 text-sm mb-2">Items</div>
                  <div className="space-y-1">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.productName} x{item.quantity}
                        </span>
                        <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 items-center flex-wrap">
                  <div className="flex gap-2">
                    <span className="text-slate-400 text-sm">Payment:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.paymentStatus === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : order.paymentStatus === 'paid'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {order.paymentMethod.toUpperCase()} - {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-slate-400 text-sm">Status:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.orderStatus === 'received'
                          ? 'bg-slate-500/20 text-slate-400'
                          : order.orderStatus === 'processing'
                          ? 'bg-blue-500/20 text-blue-400'
                          : order.orderStatus === 'shipped'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {order.orderStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="ml-auto flex gap-2">
                    {order.paymentStatus === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'paid', 'processing')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-sm font-semibold transition"
                      >
                        Mark as Paid
                      </button>
                    )}
                    {order.paymentStatus === 'paid' && order.orderStatus !== 'shipped' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'paid', 'shipped')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-semibold transition"
                      >
                        Mark as Shipped
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}