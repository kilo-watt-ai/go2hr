/**
 * Loops.so Email Integration
 *
 * This module handles all email communications via Loops.so.
 * Templates are created in the Loops.so dashboard and referenced by ID.
 * If no template ID is configured, events are still sent to Loops
 * (creating/updating contacts and logging events for automation triggers).
 */

const LOOPS_API_URL = "https://app.loops.so/api/v1";
const LOOPS_API_KEY = process.env.LOOPS_API_KEY || "";

// Template IDs — set these in .env.local after creating templates in Loops dashboard
const TEMPLATES = {
  welcome: process.env.LOOPS_TEMPLATE_WELCOME || "",
  consultantApplication: process.env.LOOPS_TEMPLATE_CONSULTANT_APPLICATION || "",
  contactConfirmation: process.env.LOOPS_TEMPLATE_CONTACT_CONFIRMATION || "",
  messageNotification: process.env.LOOPS_TEMPLATE_MESSAGE_NOTIFICATION || "",
  passwordReset: process.env.LOOPS_TEMPLATE_PASSWORD_RESET || "",
};

// -------------------------------------------------------------------
// Core Loops.so API functions
// -------------------------------------------------------------------

/**
 * Create or update a contact in Loops.so
 */
export async function createLoopsContact(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  userGroup?: string;
  customFields?: Record<string, string>;
}) {
  const body: Record<string, unknown> = {
    email: data.email,
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    source: data.source || "go2hr_website",
    userGroup: data.userGroup || "",
    ...data.customFields,
  };

  const res = await fetch(`${LOOPS_API_URL}/contacts/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("[Loops] Failed to create contact:", errorText);
  }

  return res.ok;
}

/**
 * Send an event to Loops.so (triggers automations)
 */
export async function sendLoopsEvent(
  email: string,
  eventName: string,
  properties?: Record<string, string>
) {
  const body: Record<string, unknown> = {
    email,
    eventName,
    eventProperties: properties || {},
  };

  const res = await fetch(`${LOOPS_API_URL}/events/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[Loops] Failed to send event "${eventName}":`, errorText);
  }

  return res.ok;
}

/**
 * Send a transactional email via Loops.so
 * Requires a template to be created in the Loops dashboard first.
 */
export async function sendTransactionalEmail(
  templateId: string,
  email: string,
  dataVariables: Record<string, string>
) {
  if (!templateId) {
    console.warn("[Loops] No template ID configured — skipping transactional email");
    return false;
  }

  const res = await fetch(`${LOOPS_API_URL}/transactional`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOOPS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactionalId: templateId,
      email,
      dataVariables,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[Loops] Failed to send transactional email:`, errorText);
  }

  return res.ok;
}

// -------------------------------------------------------------------
// High-level email functions used by API routes
// -------------------------------------------------------------------

/**
 * New business client signs up
 * - Creates contact in Loops with "client" group
 * - Sends welcome email
 * - Fires "business_signup" event for automation
 */
export async function handleBusinessSignup(data: {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  industry: string;
  companySize: string;
}) {
  await createLoopsContact({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    source: "business_signup",
    userGroup: "clients",
    customFields: {
      company: data.company,
      industry: data.industry,
      companySize: data.companySize,
    },
  });

  await sendLoopsEvent(data.email, "business_signup", {
    firstName: data.firstName,
    company: data.company,
  });

  if (TEMPLATES.welcome) {
    await sendTransactionalEmail(TEMPLATES.welcome, data.email, {
      firstName: data.firstName,
      company: data.company,
    });
  }
}

/**
 * New consultant applies
 * - Creates contact in Loops with "consultants" group
 * - Sends application confirmation
 * - Fires event for admin notification automation
 */
export async function handleConsultantApplication(data: {
  email: string;
  firstName: string;
  lastName: string;
  credential: string;
  experience: string;
  specialties: string;
}) {
  await createLoopsContact({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    source: "consultant_application",
    userGroup: "consultants",
    customFields: {
      credential: data.credential,
      yearsExperience: data.experience,
    },
  });

  await sendLoopsEvent(data.email, "consultant_application_submitted", {
    firstName: data.firstName,
    credential: data.credential,
    experience: data.experience,
    specialties: data.specialties,
  });

  if (TEMPLATES.consultantApplication) {
    await sendTransactionalEmail(TEMPLATES.consultantApplication, data.email, {
      firstName: data.firstName,
      credential: data.credential,
    });
  }

  // Notify admin
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendLoopsEvent(adminEmail, "new_consultant_application", {
      applicantName: `${data.firstName} ${data.lastName}`,
      applicantEmail: data.email,
      credential: data.credential,
      experience: data.experience,
    });
  }
}

/**
 * Contact form submission
 * - Creates/updates contact
 * - Sends confirmation to user
 * - Notifies admin
 */
export async function handleContactSubmission(data: {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  inquiryType: string;
  message: string;
}) {
  await createLoopsContact({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    source: "contact_form",
  });

  await sendLoopsEvent(data.email, "contact_form_submitted", {
    firstName: data.firstName,
    inquiryType: data.inquiryType || "general",
  });

  if (TEMPLATES.contactConfirmation) {
    await sendTransactionalEmail(TEMPLATES.contactConfirmation, data.email, {
      firstName: data.firstName,
      inquiryType: data.inquiryType || "general",
    });
  }

  // Notify admin with message details
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendLoopsEvent(adminEmail, "contact_inquiry_received", {
      senderName: `${data.firstName} ${data.lastName}`,
      senderEmail: data.email,
      company: data.company || "Not provided",
      inquiryType: data.inquiryType || "general",
      messagePreview: data.message.slice(0, 200),
    });
  }
}

/**
 * Message notification — notify recipient of a new message
 */
export async function handleMessageNotification(data: {
  recipientEmail: string;
  senderName: string;
  messagePreview: string;
  conversationUrl: string;
}) {
  await sendLoopsEvent(data.recipientEmail, "new_message_received", {
    senderName: data.senderName,
    messagePreview: data.messagePreview.slice(0, 100),
    conversationUrl: data.conversationUrl,
  });

  if (TEMPLATES.messageNotification) {
    await sendTransactionalEmail(TEMPLATES.messageNotification, data.recipientEmail, {
      senderName: data.senderName,
      messagePreview: data.messagePreview.slice(0, 100),
      conversationUrl: data.conversationUrl,
    });
  }
}

/**
 * Password reset request
 */
export async function handlePasswordReset(data: { email: string }) {
  // In a real implementation, you'd generate a reset token and include a link.
  // For now, we fire the event so Loops automation can handle it.
  await sendLoopsEvent(data.email, "password_reset_requested", {
    email: data.email,
  });

  if (TEMPLATES.passwordReset) {
    await sendTransactionalEmail(TEMPLATES.passwordReset, data.email, {
      resetLink: `https://go2hr.io/reset-password?token=PLACEHOLDER`,
    });
  }
}
