import React from 'react';
import type { Order } from '../types';

interface OrderSummaryProps {
  order: Partial<Order>;
  onConfirm: () => void;
  onBack: () => void;
}

const WhatsAppIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);


export const OrderSummary: React.FC<OrderSummaryProps> = ({ order, onConfirm, onBack }) => {
  const totalQuantity = order.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleWhatsAppShare = () => {
    const intro = `*Yeni DolapKapak Siparişi Özeti*\n\n`;
    const itemsText = order.items?.map(item => 
        `- ${item.quantity} adet ${item.width}x${item.height}mm ${item.model} (${item.color})`
    ).join('\n') ?? 'Ürün bulunmuyor.';
    const priceText = `\n\n*Yaklaşık Fiyat:* ${order.price?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}`;
    const outro = `\n\nBu sipariş DolapKapak uygulaması üzerinden oluşturulmuştur.`;
    
    const message = encodeURIComponent(intro + itemsText + priceText + outro);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-3xl font-bold font-montserrat text-brand-dark mb-6 border-b-2 border-brand-gold pb-4">Sipariş Özeti</h2>
        
        <div className="space-y-4">
          {order.items?.map((item, index) => (
            <div key={item.id || index} className="p-4 border rounded-md bg-gray-50">
              <p className="font-semibold text-brand-dark">{index + 1}. Ürün</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm text-gray-700">
                <p><span className="font-medium">Ölçü:</span> {item.width} x {item.height} mm</p>
                <p><span className="font-medium">Adet:</span> {item.quantity}</p>
                <p><span className="font-medium">Model:</span> {item.model}</p>
                <p><span className="font-medium">Renk:</span> {item.color}</p>
                {item.notes && <p className="col-span-2"><span className="font-medium">Not:</span> {item.notes}</p>}
              </div>
            </div>
          ))}
        </div>
        
        {order.address && <div className="mt-4"><p className="font-medium text-brand-dark">Teslimat Adresi:</p><p className="text-sm text-gray-600">{order.address}</p></div>}
        {order.billingInfo && <div className="mt-4"><p className="font-medium text-brand-dark">Fatura Bilgileri:</p><p className="text-sm text-gray-600">{order.billingInfo}</p></div>}
        {order.file && <div className="mt-4"><p className="font-medium text-brand-dark">Yüklenen Dosya:</p><p className="text-sm text-gray-600">{order.file.name}</p></div>}

        <div className="mt-6 pt-4 border-t">
            <p className="text-lg font-bold text-right text-brand-dark">Toplam Kapak Adedi: {totalQuantity}</p>
            <p className="text-xl font-bold text-right text-brand-dark mt-2">Yaklaşık Fiyat: {order.price?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
            <p className="text-xs text-right text-gray-500 mt-1">Bu fiyatlandırma bilgi amaçlıdır. Net fiyat, üretim onayı sonrası bildirilecektir.</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
             <button
                onClick={handleWhatsAppShare}
                className="w-full sm:w-auto bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
            >
                <WhatsAppIcon />
                WhatsApp'ta Paylaş
            </button>
            <div className="flex gap-4">
                 <button
                    onClick={onBack}
                    className="bg-gray-200 text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                    Geri Dön
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-brand-gold text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-brand-gold-hover transition-colors duration-300"
                >
                    Siparişi Onayla
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
