import React from 'react';

interface DocumentationProps {
  onClose: () => void;
}

const DocSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-bold font-montserrat text-brand-dark mb-2">{title}</h3>
        <div className="space-y-3 text-gray-700">{children}</div>
    </div>
);

export const Documentation: React.FC<DocumentationProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-brand-dark text-2xl font-bold">&times;</button>
            <h2 className="text-3xl font-bold font-montserrat text-brand-dark mb-6 border-b-2 border-brand-gold pb-4">Yardım ve Dokümantasyon</h2>
            
            <DocSection title="Müşteriler İçin">
                <p><strong>1. Giriş ve Arayüz:</strong> "Google ile Giriş Yap" butonuyla sisteme erişin. Giriş yaptıktan sonra sizi ana ekranda güncel kampanyaları gösteren bir banner karşılayabilir.</p>
                <p><strong>2. Sipariş Verme:</strong>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                        <li>"Yeni Ürün Ekle" bölümünden kapaklarınızın genişlik, yükseklik, adet, model ve renk bilgilerini girin. Model seçerken yanında beliren küçük görselden önizleme yapabilirsiniz.</li>
                        <li>"Listeye Ekle" butonuyla ürünü sipariş listenize taşıyın. İstediğiniz kadar farklı ölçü ve modelde ürün ekleyebilirsiniz.</li>
                        <li>"Ek Bilgiler" bölümüne teslimat ve fatura adreslerinizi yazabilir, "Görsel Yükle" alanından projenize ait çizim veya fotoğraf ekleyebilirsiniz.</li>
                        <li>Tüm ürünleri ekledikten sonra "Siparişi Özetle" butonuna tıklayın.</li>
                    </ul>
                </p>
                 <p><strong>3. Sipariş Özeti ve Onay:</strong> Özet ekranında tüm ürünlerinizi, ek bilgilerinizi ve sistem tarafından hesaplanmış <strong>yaklaşık toplam fiyatı</strong> görebilirsiniz. "WhatsApp'ta Paylaş" butonuyla sipariş özetini kolayca gönderebilir, "Siparişi Onayla" ile işlemi tamamlayabilirsiniz.</p>
                 <p><strong>4. Sipariş Takibi:</strong> Üst menüdeki "Siparişlerim" linkinden tüm geçmiş siparişlerinizi, durumlarını, takip numaralarını ve detaylarını görüntüleyebilirsiniz.</p>
            </DocSection>

            <DocSection title="Yöneticiler İçin">
                <p><strong>1. Sipariş Bildirimleri:</strong> Her yeni sipariş onaylandığında, sistem tarafından yönetici e-posta adresine (<span className="font-semibold">firat@antkap.com.tr</span>) tüm detayları (müşteri bilgisi, ürünler, adresler, ekli dosya linki) içeren bir bilgilendirme maili gönderilir (simüle edilmiştir).</p>
                <p><strong>2. Sipariş Kayıtları ve Dosyalar:</strong>
                    <ul className="list-disc list-inside pl-4 space-y-2">
                         <li>Tüm siparişler, paylaşılan bir Google Sheets tablosuna anlık olarak kaydedilir (simüle edilmiştir).</li>
                         <li>Müşterinin yüklediği görseller Google Drive'daki ilgili sipariş klasörüne kaydedilir (simüle edilmiştir).</li>
                         <li>Sipariş özetinin bir PDF kopyası oluşturulup hem müşteriye e-posta atılır hem de Google Drive'a kaydedilir (simüle edilmiştir).</li>
                    </ul>
                </p>
                <p><strong>3. Sipariş Durumu Güncelleme:</strong> Siparişin durumu (Üretimde, Kargolandı vb.) Google Sheets'teki "Durum" kolonu üzerinden güncellenir. Durum her değiştiğinde müşteriye otomatik bir bilgilendirme e-postası gönderilir (simüle edilmiştir).</p>
            </DocSection>

             <div className="mt-8 text-center">
                <button
                    onClick={onClose}
                    className="bg-brand-gold text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-brand-gold-hover transition-colors duration-300"
                >
                    Anladım
                </button>
            </div>
        </div>
    </div>
  );
};
