import React from 'react';
import type { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
    const statusStyles = {
        Pending: 'bg-yellow-100 text-yellow-800',
        'In Production': 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Shipped: 'bg-indigo-100 text-indigo-800',
    };
    const statusText = {
        Pending: 'Beklemede',
        'In Production': 'Üretimde',
        Completed: 'Tamamlandı',
        Shipped: 'Kargolandı',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
            {statusText[status]}
        </span>
    );
};


export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="container mx-auto p-6 bg-brand-bg min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold font-montserrat text-brand-dark mb-6 border-b-2 border-brand-gold pb-4">Sipariş Geçmişi</h2>
        
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Daha önce verilmiş siparişiniz bulunmamaktadır.</p>
        ) : (
          <div className="space-y-6">
            {orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(order => (
              <details key={order.orderId} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow open:ring-2 open:ring-brand-gold open:ring-opacity-50">
                <summary className="p-4 cursor-pointer">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                            <p className="font-bold text-brand-dark text-lg">Sipariş No: {order.trackingNumber}</p>
                            <p className="text-sm text-gray-500">Tarih: {order.createdAt.toLocaleDateString('tr-TR')}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <p className="font-semibold text-brand-dark">{order.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
                            <StatusBadge status={order.status} />
                        </div>
                    </div>
                </summary>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="overflow-x-auto mb-4">
                        <table className="min-w-full bg-white text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Ölçü (GxY)</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Adet</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Model</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Renk</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-600">Notlar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {order.items.map(item => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2">{`${item.width}x${item.height} mm`}</td>
                                        <td className="px-4 py-2">{item.quantity}</td>
                                        <td className="px-4 py-2">{item.model}</td>
                                        <td className="px-4 py-2">{item.color}</td>
                                        <td className="px-4 py-2">{item.notes || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        {order.address && <div><h4 className="font-semibold text-gray-700">Teslimat Adresi</h4><p className="text-gray-600">{order.address}</p></div>}
                        {order.billingInfo && <div><h4 className="font-semibold text-gray-700">Fatura Bilgileri</h4><p className="text-gray-600">{order.billingInfo}</p></div>}
                        {order.file && <div><h4 className="font-semibold text-gray-700">Ek Dosya</h4><a href={order.file.url} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">{order.file.name}</a></div>}
                    </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
