import { Resend } from "resend";
import { formatPrice } from "./utils";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "NOVA <onboarding@resend.dev>";

type OrderConfirmationItem = {
  name: string;
  priceCents: number;
  quantity: number;
};

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  items,
  totalCents,
  currency,
}: {
  to: string;
  orderId: string;
  items: OrderConfirmationItem[];
  totalCents: number;
  currency: string;
}) {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;color:#333;">${item.name} × ${item.quantity}</td>
          <td style="padding:8px 0;text-align:right;color:#333;">${formatPrice(item.priceCents * item.quantity, currency)}</td>
        </tr>`
    )
    .join("");

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#111;">
      <h1 style="font-size:20px;margin-bottom:4px;">Danke für deine Bestellung!</h1>
      <p style="color:#555;font-size:14px;margin-top:0;">Bestellnummer: ${orderId}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:24px;">
        ${rows}
        <tr>
          <td style="padding-top:16px;border-top:1px solid #e5e5e5;font-weight:bold;">Gesamt</td>
          <td style="padding-top:16px;border-top:1px solid #e5e5e5;text-align:right;font-weight:bold;">${formatPrice(totalCents, currency)}</td>
        </tr>
      </table>
      <p style="color:#555;font-size:13px;margin-top:32px;">
        Wir melden uns, sobald deine Bestellung versandt wird. Bei Fragen antworte
        einfach auf diese E-Mail.
      </p>
    </div>`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Deine Bestellung bei NOVA",
    html,
  });
}
