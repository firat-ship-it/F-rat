import React, { useState, useRef, useEffect } from 'react';
import type { OrderItem, Order } from '../types';
import { MODEL_OPTIONS, COLOR_OPTIONS, MODEL_IMAGES, COLOR_SWATCHES } from '../constants';
import type { CabinetModel, SurfaceColor } from '../types';

interface OrderFormProps {
  onOrderSubmit: (orderData: Partial<Order>) => void;
}

const initialItemState: Omit<OrderItem, 'id'> = {
  width: 0,
  height: 0,
  quantity: 1,
  model: MODEL_OPTIONS[0],
  color: COLOR_OPTIONS[0],
  notes: '',
};

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderSubmit }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [currentItem, setCurrentItem] = useState<Omit<OrderItem, 'id'>>(initialItemState);
  const [address, setAddress] = useState('');
  const [billingInfo, setBillingInfo] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
            setIsColorPickerOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: name === 'width' || name === 'height' || name === 'quantity' ? Number(value) : value }));
  };

  const handleModelChange = (model: CabinetModel) => {
    setCurrentItem(prev => ({...prev, model}));
  }

  const handleColorSelect = (color: SurfaceColor) => {
    setCurrentItem(prev => ({ ...prev, color }));
    setIsColorPickerOpen(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
          setFile(selectedFile);
          setFilePreview(URL.createObjectURL(selectedFile));
      }
  };

  const handleAddItem = () => {
    if (currentItem.width <= 0 || currentItem.height <= 0 || currentItem.quantity <= 0) {
      setError('Genişlik, yükseklik ve adet 0\'dan büyük olmalıdır.');
      return;
    }
    setError(null);
    setItems(prev => [...prev, { ...currentItem, id: `item-${Date.now()}` }]);
    setCurrentItem(initialItemState);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    if (items.length === 0) {
        setError('Lütfen en az bir ürün ekleyin.');
        return;
    }
    setError(null);
    const orderData: Partial<Order> = {
        items,
        address,
        billingInfo,
        file: file ? { name: file.name, url: filePreview! } : undefined,
    };
    onOrderSubmit(orderData);
    setItems([]); // Clear form after submission
    setAddress('');
    setBillingInfo('');
    setFile(null);
    setFilePreview(null);
  };

  return (
    <div className="container mx-auto p-6 bg-brand-bg min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold font-montserrat text-brand-dark mb-6 border-b-2 border-brand-gold pb-4">Yeni Kapak Siparişi</h2>
        
        {/* Items List */}
         <div className="mt-8 mb-8">
          <h3 className="text-2xl font-bold font-montserrat text-brand-dark mb-4">Sipariş Listesi</h3>
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-md">Henüz ürün eklenmedi.</p>
          ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ölçü (GxY)</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adet</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renk</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td className="px-4 py-2 whitespace-nowrap">{`${item.width}x${item.height} mm`}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{item.model}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{item.color}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-600 hover:text-red-800 text-sm font-semibold">Kaldır</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="p-6 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-brand-dark mb-4">Yeni Ürün Ekle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Genişlik (mm)</label>
                    <input type="number" name="width" id="width" value={currentItem.width} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Yükseklik (mm)</label>
                    <input type="number" name="height" id="height" value={currentItem.height} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Model Seçimi</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {MODEL_OPTIONS.map(model => (
                            <div 
                                key={model} 
                                onClick={() => handleModelChange(model)}
                                className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 group transform hover:-translate-y-1 ${currentItem.model === model ? 'border-brand-gold ring-2 ring-brand-gold shadow-lg' : 'border-gray-200 hover:border-brand-gold hover:shadow-md'}`}
                            >
                                <img src={MODEL_IMAGES[model]} alt={model} className="w-full h-24 object-cover" />
                                <div className="p-2 text-center bg-white">
                                    <p className={`text-sm font-semibold text-brand-dark transition-colors duration-200 group-hover:text-brand-gold ${currentItem.model === model ? 'text-brand-gold' : ''}`}>{model.split(' (')[0]}</p>
                                    <p className="text-xs text-gray-500">{model.match(/\((.*?)\)/)?.[1]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Adet</label>
                    <input type="number" name="quantity" id="quantity" value={currentItem.quantity} onChange={handleInputChange} min="1" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold" />
                </div>

                <div ref={colorPickerRef} className="relative">
                    <label htmlFor="color-picker" className="block text-sm font-medium text-gray-700 mb-1">Renk / Yüzey</label>
                    <button
                        type="button"
                        id="color-picker"
                        onClick={() => setIsColorPickerOpen(prev => !prev)}
                        className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >
                        <span className="flex items-center">
                            <img src={COLOR_SWATCHES[currentItem.color]} alt={currentItem.color} className="w-6 h-6 mr-3 rounded-sm object-cover" />
                            <span className="text-gray-800">{currentItem.color}</span>
                        </span>
                        <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isColorPickerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>

                    {isColorPickerOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border rounded-md p-2 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                            {COLOR_OPTIONS.map(color => (
                                <div
                                    key={color}
                                    onClick={() => handleColorSelect(color)}
                                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100 flex flex-col items-center text-center group"
                                >
                                    <img src={COLOR_SWATCHES[color]} alt={color} className="w-full h-16 object-cover rounded-md border" />
                                    <span className="mt-2 text-xs text-gray-700 group-hover:text-brand-gold">{color}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Ek Notlar (isteğe bağlı)</label>
                    <textarea name="notes" id="notes" value={currentItem.notes ?? ''} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
            </div>
            <div className="flex justify-end">
            <button onClick={handleAddItem} className="bg-brand-dark text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
                Listeye Ekle
            </button>
            </div>
        </div>
        
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        
        {/* Additional Info */}
        <div className="mt-8">
            <h3 className="text-2xl font-bold font-montserrat text-brand-dark mb-4">Ek Bilgiler</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Teslimat Adresi (isteğe bağlı)</label>
                    <textarea name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div>
                    <label htmlFor="billingInfo" className="block text-sm font-medium text-gray-700 mb-1">Fatura Bilgileri (isteğe bağlı)</label>
                    <textarea name="billingInfo" id="billingInfo" value={billingInfo} onChange={(e) => setBillingInfo(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">Görsel Yükle (çizim, fotoğraf vb.)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {filePreview ? (
                                <img src={filePreview} alt="Preview" className="mx-auto h-24 w-auto object-contain rounded-md"/>
                            ) : (
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            )}
                            <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-gold hover:text-brand-gold-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-gold">
                                    <span>Dosya seç</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf"/>
                                </label>
                                <p className="pl-1">veya sürükleyip bırakın</p>
                            </div>
                             {file && <p className="text-xs text-gray-500">{file.name}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button 
            onClick={handleSubmit} 
            disabled={items.length === 0}
            className="bg-brand-gold text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-brand-gold-hover transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Siparişi Özetle
          </button>
        </div>
      </div>
    </div>
  );
};
