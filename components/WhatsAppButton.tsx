import Link from 'next/link';

const WHATSAPP_NUMBER = '18015550100'; // TODO: reemplazar con el número real de la academia
const WHATSAPP_MESSAGE = 'Hola! Quiero conectarme con Carnaval de Barranquilla en Utah 🎭';

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conéctate con nosotros por WhatsApp"
      title="Conéctate por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 animate-float"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.31.653 4.469 1.786 6.303L4 29l7.897-1.746A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.818a9.78 9.78 0 0 1-4.99-1.365l-.358-.213-3.706.82.79-3.61-.233-.372A9.77 9.77 0 0 1 6.182 15c0-5.418 4.401-9.818 9.819-9.818S25.818 9.582 25.818 15 21.42 24.818 16.001 24.818zm5.408-7.34c-.296-.148-1.752-.865-2.024-.964-.272-.099-.47-.148-.667.148-.198.297-.766.964-.94 1.162-.173.198-.346.223-.642.075-.297-.149-1.253-.462-2.386-1.472-.882-.787-1.478-1.76-1.651-2.057-.173-.297-.018-.457.13-.605.134-.133.297-.347.445-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.148-.667-1.608-.914-2.202-.24-.578-.485-.5-.667-.51l-.568-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.477 0 1.46 1.065 2.872 1.213 3.07.148.198 2.096 3.2 5.078 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.872.118.571-.085 1.752-.716 1.999-1.408.247-.693.247-1.286.173-1.409-.074-.123-.272-.198-.568-.347z" />
      </svg>
    </Link>
  );
}
