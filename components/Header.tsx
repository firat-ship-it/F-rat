
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: 'orderForm' | 'orderHistory' | 'docs') => void;
}

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#EA4335" d="M43.611 20.083H24v8h11.303c-0.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.596 44 30.134 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold font-montserrat text-brand-dark cursor-pointer" onClick={() => onNavigate('orderForm')}>
          DolapKapak
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <nav className="hidden md:flex items-center space-x-6">
                <button onClick={() => onNavigate('orderForm')} className="text-brand-dark hover:text-brand-gold transition-colors duration-200">Yeni Sipariş</button>
                <button onClick={() => onNavigate('orderHistory')} className="text-brand-dark hover:text-brand-gold transition-colors duration-200">Siparişlerim</button>
                <button onClick={() => onNavigate('docs')} className="text-brand-dark hover:text-brand-gold transition-colors duration-200">Yardım</button>
              </nav>
              <div className="flex items-center space-x-3">
                  <span className="text-brand-dark hidden sm:inline">{user.name}</span>
                  <button onClick={onLogout} className="bg-brand-dark text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 text-sm">
                    Çıkış Yap
                  </button>
              </div>
            </>
          ) : (
             <button
                className="bg-white border border-gray-300 text-brand-dark px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 flex items-center justify-center transition-colors duration-200"
                onClick={() => { /* This would trigger login, handled by parent */ }}
                disabled={true} // The parent will show the login screen
            >
                <GoogleIcon />
                Giriş Yap
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
   