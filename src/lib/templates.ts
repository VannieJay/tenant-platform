export const EmailTemplates = {
    welcome: (name: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Welcome to Tenant Platform!</h1>
      <p>Hi ${name},</p>
      <p>We are excited to have you on board. Your account has been successfully created.</p>
      <p>Please log in to your dashboard to complete your profile and view your tenancy details.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
      <p>Best regards,<br/>The Team</p>
    </div>
  `,
    paymentReceipt: (amount: number, reference: string, date: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Payment Receipt</h1>
      <p>Thank you for your payment.</p>
      <div style="background: #f4f4f4; padding: 20px; border-radius: 5px;">
        <p><strong>Amount:</strong> ₦${amount.toLocaleString()}</p>
        <p><strong>Reference:</strong> ${reference}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Status:</strong> Successful</p>
      </div>
      <p>You can view your payment history in your dashboard.</p>
    </div>
  `
};
