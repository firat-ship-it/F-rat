import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { OrderForm } from './components/OrderForm';
import { OrderHistory } from './components/OrderHistory';
import { OrderSummary } from './components/OrderSummary';
import { Documentation } from './components/Documentation';
import { CampaignBanner } from './components/CampaignBanner';
import { SuccessAnimation } from './components/SuccessAnimation';
import type { User, Order, OrderItem } from './types';
import { CabinetModel, SurfaceColor } from './types';
import { BASE_PRICE_PER_SQ_METER, MODEL_PRICE_COEFFICIENTS } from './constants';

// Mock Data
const MOCK_USER: User = {
  name: 'Fırat Özgül',
  email: 'firat@antkap.com.tr',
};

const MOCK_ORDERS: Order[] = [
    {
        orderId: 'ORD-1715346000000',
        trackingNumber: 'DK-240510-A1B2',
        userEmail: 'firat@antkap.com.tr',
        items: [
            { id: 'i1', width: 600, height: 720, quantity: 4, model: CabinetModel.ALVIC_LUXE, color: SurfaceColor.GLOSSY_WHITE, notes: 'Menteşe yeri açılsın.' },
            { id: 'i2', width: 450, height: 720, quantity: 2, model: CabinetModel.ALVIC_ZENIT, color: SurfaceColor.MATTE_BLACK },
        ],
        status: 'Completed',
        createdAt: new Date('2024-05-10'),
        price: 8856,
        address: 'Örnek Mah. Test Sk. No:12 D:3, Ataşehir/İstanbul',
    },
    {
        orderId: 'ORD-1716199200000',
        trackingNumber: 'DK-240520-C3D4',
        userEmail: 'firat@antkap.com.tr',
        items: [
            { id: 'i3', width: 800, height: 400, quantity: 5, model: CabinetModel.EGEPRES, color: SurfaceColor.WOOD_GRAIN },
        ],
        status: 'In Production',
        createdAt: new Date('2024-05-20'),
        price: 4000,
        billingInfo: 'Antkap Proje Ltd. Şti. - V.D. 1234567890',
    },
];

type View = 'orderForm' | 'orderHistory' | 'summary';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('orderForm');
  const [orders, setOrders] = useState<Order[]>([]);
  const [pendingOrder, setPendingOrder] = useState<Partial<Order> | null>(null);
  const [showDocs, setShowDocs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  
  const handleLogin = () => {
    setIsLoading(true);
     setTimeout(() => {
        setUser(MOCK_USER);
        setOrders(MOCK_ORDERS);
        setView('orderForm');
        setIsLoading(false);
    }, 500);
  };
  
  const handleLogout = () => {
    setUser(null);
    setOrders([]);
    setPendingOrder(null);
  };

  const handleNavigate = (targetView: 'orderForm' | 'orderHistory' | 'docs') => {
    if (targetView === 'docs') {
        setShowDocs(true);
    } else {
        setView(targetView);
        setPendingOrder(null); // Clear pending order when navigating away
    }
  };

  const calculatePrice = (items: OrderItem[]): number => {
    return items.reduce((total, item) => {
      const areaM2 = (item.width / 1000) * (item.height / 1000);
      const itemPrice = areaM2 * item.quantity * BASE_PRICE_PER_SQ_METER * MODEL_PRICE_COEFFICIENTS[item.model];
      return total + itemPrice;
    }, 0);
  };

  const handleOrderSubmit = (orderData: Partial<Order>) => {
    if (!orderData.items || orderData.items.length === 0) return;
    const price = calculatePrice(orderData.items);
    setPendingOrder({ ...orderData, price });
    setView('summary');
  };

  const handleConfirmOrder = () => {
     if (!user || !pendingOrder) return;

    const timestamp = new Date();
    const newOrder: Order = {
        ...pendingOrder,
        orderId: `ORD-${timestamp.getTime()}`,
        trackingNumber: `DK-${timestamp.toISOString().slice(2, 10).replace(/-/g, '')}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        userEmail: user.email,
        items: pendingOrder.items!.map(item => ({...item, id: `item-new-${Math.random()}`})),
        status: 'Pending',
        createdAt: timestamp,
        price: pendingOrder.price!,
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // --- SIMULATIONS ---
    console.group("🚀 New Order Simulation");
    console.log("Order Confirmed:", newOrder);
    console.log("📄 Simulating: Saving order to Google Sheets...");
    if (newOrder.file) {
        console.log(`🖼️ Simulating: Uploading file '${newOrder.file.name}' to Google Drive...`);
    }
    console.log("📧 Simulating: Sending confirmation PDF to customer at", newOrder.userEmail);
    console.log("📨 Simulating: Sending new order notification to admin at firat@antkap.com.tr");
    console.groupEnd();
    
    setPendingOrder(null); // Close summary modal
    setShowSuccessAnimation(true); // Show animation
    
    // After animation, show alert and navigate to history
    setTimeout(() => {
        setShowSuccessAnimation(false);
        alert(`Siparişiniz (${newOrder.trackingNumber}) başarıyla alındı! Detaylar e-posta adresinize gönderildi.`);
        setView('orderHistory');
    }, 2000);
  };

  const renderContent = () => {
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><p className="text-xl text-brand-dark">Yükleniyor...</p></div>;
    }

    if (!user) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (view) {
      case 'orderForm':
        return <OrderForm onOrderSubmit={handleOrderSubmit} />;
      case 'orderHistory':
        return <OrderHistory orders={orders} />;
      case 'summary':
         // Show form behind summary for context
         return <OrderForm onOrderSubmit={handleOrderSubmit} />;
      default:
        return <OrderForm onOrderSubmit={handleOrderSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {user && <Header user={user} onLogout={handleLogout} onNavigate={handleNavigate} />}
      {user && <CampaignBanner />}
      <main className="flex-grow">
        {renderContent()}
      </main>
      {view === 'summary' && pendingOrder && (
        <OrderSummary 
          order={pendingOrder} 
          onConfirm={handleConfirmOrder} 
          onBack={() => setView('orderForm')} 
        />
      )}
      {showDocs && <Documentation onClose={() => setShowDocs(false)} />}
      {showSuccessAnimation && <SuccessAnimation />}
    </div>
  );
};

export default App;