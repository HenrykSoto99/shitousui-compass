import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '5219832010889';

export function WhatsAppButton() {
  const location = useLocation();
  const currentPage = location.pathname.replace('/', '') || 'dashboard';

  const message = encodeURIComponent(
    `*Hola Ventas Shitoushui*\n\nPantalla: ${currentPage}\nTengo una duda de ventas`
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  const handleClick = async () => {
    // Tracking para n8n (preparado)
    try {
      // TODO: Conectar con n8n webhook
      console.log('WhatsApp click tracked:', {
        page: currentPage,
        action: 'whatsapp_support_click',
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error('Tracking error:', e);
    }

    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl border-0 animate-pulse-slow"
      onClick={handleClick}
      title="💬 Soporte Ventas 24/7 - WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
}
