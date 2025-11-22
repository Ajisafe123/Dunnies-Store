export interface WhatsAppOrderMessage {
  productName: string;
  productPrice: number;
  productQuantity: number;
  productImage?: string;
  productLink: string;
  customerName: string;
  whatsappNumber: string;
}

export function generateWhatsAppOrderMessage(order: WhatsAppOrderMessage): string {
  const message = `Hi! 👋 I'd like to order:

📦 *${order.productName}*
💰 Price: ₦${order.productPrice.toLocaleString()}
📊 Quantity: ${order.productQuantity}
🔗 Link: ${order.productLink}

Please confirm my order. My name is ${order.customerName}.`;

  return encodeURIComponent(message);
}

export function getWhatsAppLink(
  whatsappNumber: string,
  order: WhatsAppOrderMessage
): string {
  const message = generateWhatsAppOrderMessage(order);
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${message}`;
}

export function generateWhatsAppAPIMessage(
  whatsappNumber: string,
  order: WhatsAppOrderMessage
): {
  phone: string;
  message: string;
} {
  return {
    phone: whatsappNumber,
    message: `Hi! 👋 I'd like to order:

📦 *${order.productName}*
💰 Price: ₦${order.productPrice.toLocaleString()}
📊 Quantity: ${order.productQuantity}
🔗 Link: ${order.productLink}

Please confirm my order. My name is ${order.customerName}.`,
  };
}
