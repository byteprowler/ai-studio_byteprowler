import nodemailer from "nodemailer";

/**
 * High-Integrity server-side API handler to route contact transmissions safely.
 * Promotes real-world integrations by checking for SMTP transport or custom external forwarding 
 * targets (e.g., another microservice on Render).
 */
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, subject, message } = req.body;

  // Validate presence
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: "INTEGRITY_ERR: Missing mandatory transmission signature attributes."
    });
  }

  // Sanitize simple tags
  const cleanName = String(name).replace(/<[^>]*>/g, "").trim();
  const cleanEmail = String(email).replace(/<[^>]*>/g, "").trim();
  const cleanSubject = String(subject).replace(/<[^>]*>/g, "").trim();
  const cleanMessage = String(message).replace(/<[^>]*>/g, "").trim();

  const payload = {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
    timestamp: new Date().toISOString()
  };

  // Pipeline A: External Webhook / Render Forwarding Service
  const renderEmailUrl = process.env.RENDER_EMAIL_URL || process.env.CONTACT_FORWARD_URL;
  if (renderEmailUrl) {
    console.log(`[UPLINK ROTATOR] Forwarding payload to external Render service: ${renderEmailUrl}`);
    try {
      const forwardResponse = await fetch(renderEmailUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!forwardResponse.ok) {
        throw new Error(`External target responded with HTTP status ${forwardResponse.status}`);
      }

      const result = await forwardResponse.json().catch(() => ({}));
      return res.status(200).json({
        success: true,
        message: "Transmission Secure. Message successfully forwarded to external Render service node.",
        data: result
      });
    } catch (e: any) {
      console.error("[UPLINK ERROR] Failed forwarding to external URL on Render:", e.message);
      return res.status(502).json({
        error: `FORWARDING_ERR: Failed to relay communication signal to external Render service. Details: ${e.message}`
      });
    }
  }

  // Pipeline B: Direct SMTP Nodemailer Transmissions (e.g., if hosted on Render using Gmail, SendGrid, Resend, Zoho SMTP, etc.)
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.SMTP_TO || smtpUser; // Default recipient is the sender mail if not specified

  if (smtpHost && smtpUser && smtpPass) {
    console.log(`[UPLINK SMTP] Attempting SMTP delivery via host: ${smtpHost} to: ${mailTo}`);
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // Use true for SSL/TLS 465, false for 587 STARTTLS
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const textBody = `
=== PORTFOLIO CONTACT TRANSMISSION ===
Sender: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
Timestamp: ${payload.timestamp}

Payload Message:
----------------------------------------
${cleanMessage}
----------------------------------------
This form submission was securely processed by your Byteprowler portfolio API.
`;

      const htmlBody = `
<div style="font-family: 'Courier New', monospace; background-color: #0b0c10; color: #c5c6c7; padding: 25px; border: 1px solid #39ff14; max-width: 600px; margin: 0 auto; border-radius: 4px;">
  <h2 style="color: #39ff14; border-bottom: 2px solid #39ff14; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">[BYTEPROWLER_UPLINK] TRANSMISSION</h2>
  <p><strong>TIMESTAMP:</strong> ${payload.timestamp}</p>
  <p><strong>SENDER:</strong> ${cleanName} &lt;<a href="mailto:${cleanEmail}" style="color: #00e5ff; text-decoration: none;">${cleanEmail}</a>&gt;</p>
  <p><strong>SUBJECT:</strong> ${cleanSubject}</p>
  <hr style="border: 0; border-top: 1px solid #1f2833; margin: 20px 0;" />
  <div style="background-color: #1f2833; padding: 15px; border-radius: 2px; white-space: pre-wrap; font-size: 14px; color: #ffffff; border-left: 3px solid #8a2be2;">
${cleanMessage}
  </div>
  <hr style="border: 0; border-top: 1px solid #1f2833; margin: 20px 0;" />
  <p style="font-size: 10px; color: #45a29e; text-align: center;">Secure communication payload channeled through Express + Vite Node Architecture.</p>
</div>
`;

      await transporter.sendMail({
        from: `"${cleanName} (via Byteprowler Portfolio)" <${smtpUser}>`,
        replyTo: cleanEmail,
        to: mailTo,
        subject: `[Portfolio Link] ${cleanSubject}`,
        text: textBody,
        html: htmlBody
      });

      return res.status(200).json({
        success: true,
        message: "Transmission Secure. Message dispatched via SMTP node successfully."
      });
    } catch (e: any) {
      console.error("[UPLINK SMTP ERROR] SMTP transaction failed:", e);
      return res.status(500).json({
        error: `SMTP_DELIVERY_ERR: Node failed executing message dispatch loop: ${e.message}`
      });
    }
  }

  // Pipeline C: Dev Sandbox / Local Simulation Fallback Mode
  console.log(`
======================================================================
[SANDBOX TELEMETRY LOG] TRANSMISSION SECURE: MESSAGE DISPATCH MOCKED
To enable live delivery, configure RENDER_EMAIL_URL or SMTP keys on Render.
----------------------------------------------------------------------
Timestamp: ${payload.timestamp}
Sender:    ${cleanName}
Email:     ${cleanEmail}
Subject:   ${cleanSubject}
Message:   ${cleanMessage}
======================================================================
  `);

  return res.status(201).json({
    success: true,
    _mocked: true,
    message: "Transmission Secure. Message queued successfully in central grid buffers.",
    info: "Operating in high-contrast simulation fallback mode. Configure SMTP_USER or RENDER_EMAIL_URL to route real-world signals."
  });
}