import { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StockPage from '../features/stock/StockPage';
import DonatePage from '../features/donate/DonatePage';
import CampaignsPage from '../features/campaigns/CampaignsPage';

export default function PublicPage() {
  const [activeTab, setActiveTab] = useState<'stock' | 'donate' | 'campaigns'>('stock');

  return (
    <>
      <Header
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        isAdmin={false}
        onLogin={() => {}}
        onLogout={() => {}}
      />

      {activeTab === 'stock' && <StockPage />}
      {activeTab === 'donate' && <DonatePage isAdmin={false} />}
      {activeTab === 'campaigns' && <CampaignsPage isAdmin={false} />}

      {activeTab !== 'donate' && <Footer />}
    </>
  );
}