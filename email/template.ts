import transporter from "@/lib/email";

// Welcome Email
const welcomeEmail = async (name: any, email: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Welcome to Sponza, ${name}! Kickstart Your Influencer Journey 🚀`,
    text: `Hi ${name},

Welcome to Sponza, the ultimate influencer marketing platform connecting brands and creators! 🎉 We're thrilled to have you on board.

Get started by exploring exciting collaboration opportunities or setting up your influencer profile. Use the code *SPONZA10* for a 10% discount on your first campaign subscription!

Ready to dive in? [Explore Sponza Now]

Have questions? Reach out to our team at support@sponza.in.

Happy Collaborating!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Sponza</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Welcome to <strong><em>Sponza</em></strong>, the ultimate influencer marketing platform connecting brands and creators! 🎉 We're thrilled to have you on board.
      </p>

      <p>
        Get started by exploring exciting collaboration opportunities or setting up your influencer profile. Use the code <strong>SPONZA10</strong> for a <strong>10% discount</strong> on your first campaign subscription!
      </p>

      <p>
        Ready to dive in?
        <br />
        <a href="https://www.sponza.in" class="button" target="_blank">Explore Sponza Now</a>
      </p>

      <p>
        Have questions? Reach out to our team at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Happy Collaborating!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Verification Email
const verificationEmail = async (
  name: any,
  email: any,
  verificationLink: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Verify Your Sponza Account, ${name}!`,
    text: `Hi ${name},

Thank you for joining Sponza! To get started, please verify your email address by clicking the link below:

[Verify Your Email]

This link will expire in 24 hours. If you didn’t sign up for Sponza, please ignore this email.

Need help? Contact us at support@sponza.in.

Welcome aboard!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Sponza Account</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Thank you for joining <strong><em>Sponza</em></strong>! To get started, please verify your email address by clicking the button below:
      </p>

      <p>
        <a href="${verificationLink}" class="button" target="_blank">Verify Your Email</a>
      </p>

      <p>
        This link will expire in 24 hours. If you didn’t sign up for Sponza, please ignore this email.
      </p>

      <p>
        Need help? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Welcome aboard!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Password Reset Email
const passwordResetEmail = async (name: any, email: any, resetLink: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Reset Your Sponza Password`,
    text: `Hi ${name},

We received a request to reset your Sponza account password. Click the link below to set a new password:

[Reset Your Password]

This link will expire in 1 hour. If you didn’t request a password reset, please ignore this email or contact support@sponza.in.

Stay connected!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Sponza Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${name}</strong>,</p>

      <p>
        We received a request to reset your <strong><em>Sponza</em></strong> account password. Click the button below to set a new password:
      </p>

      <p>
        <a href="${resetLink}" class="button" target="_blank">Reset Your Password</a>
      </p>

      <p>
        This link will expire in 1 hour. If you didn’t request a password reset, please ignore this email or contact
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Stay connected!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Campaign Published Confirmation Email
const campaignPublishedEmail = async (
  brandName: any,
  email: any,
  campaignName: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your Campaign "${campaignName}" is Live on Sponza! 🎉`,
    text: `Hi ${brandName},

Great news! Your campaign "${campaignName}" has been successfully published on Sponza. Influencers can now discover and apply to collaborate with your brand.

Monitor applications and manage your campaign from your dashboard: [View Campaign Dashboard]

Need assistance? Contact us at support@sponza.in.

Happy collaborating!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Campaign Published on Sponza</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        Great news! Your campaign <strong>"${campaignName}"</strong> has been successfully published on <strong><em>Sponza</em></strong>. Influencers can now discover and apply to collaborate with your brand.
      </p>

      <p>
        Monitor applications and manage your campaign from your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard" class="button" target="_blank">View Campaign Dashboard</a>
      </p>

      <p>
        Need assistance? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Happy collaborating!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// New Application Received Email
const newApplicationEmail = async (
  brandName: any,
  email: any,
  influencerName: any,
  campaignName: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `New Application for "${campaignName}" from ${influencerName}`,
    text: `Hi ${brandName},

You’ve received a new application from ${influencerName} for your campaign "${campaignName}" on Sponza. Review their profile and application details in your dashboard: [View Application]

Need help? Reach out to us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Campaign Application</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        You’ve received a new application from <strong>${influencerName}</strong> for your campaign <strong>"${campaignName}"</strong> on <strong><em>Sponza</em></strong>. Review their profile and application details in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/applications" class="button" target="_blank">View Application</a>
      </p>

      <p>
        Need help? Reach out to us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Deliverables Submitted Email
const deliverablesSubmittedEmail = async (
  brandName: any,
  email: any,
  influencerName: any,
  campaignName: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Deliverables Submitted for "${campaignName}" by ${influencerName}`,
    text: `Hi ${brandName},

${influencerName} has submitted deliverables for your campaign "${campaignName}" on Sponza. Please review them in your dashboard: [Review Deliverables]

If you have feedback or need assistance, contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Deliverables Submitted</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        <strong>${influencerName}</strong> has submitted deliverables for your campaign <strong>"${campaignName}"</strong> on <strong><em>Sponza</em></strong>. Please review them in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/deliverables" class="button" target="_blank">Review Deliverables</a>
      </p>

      <p>
        If you have feedback or need assistance, contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Payment Confirmation Email
const paymentConfirmationEmail = async (
  brandName: any,
  email: any,
  campaignName: any,
  amount: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Payment Confirmation for "${campaignName}"`,
    text: `Hi ${brandName},

We’ve successfully processed your payment of ${amount} for the campaign "${campaignName}" on Sponza. Your campaign is now fully active!

View your payment details in your dashboard: [View Payment Details]

Questions? Reach out to us at support@sponza.in.

Thank you for choosing Sponza!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Payment Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        We’ve successfully processed your payment of <strong>${amount}</strong> for the campaign <strong>"${campaignName}"</strong> on <strong><em>Sponza</em></strong>. Your campaign is now fully active!
      </p>

      <p>
        View your payment details in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/payments" class="button" target="_blank">View Payment Details</a>
      </p>

      <p>
        Questions? Reach out to us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Thank you for choosing Sponza!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Low Balance Warning Email
const lowBalanceWarningEmail = async (
  brandName: any,
  email: any,
  balance: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Low Balance Alert for Your Sponza Account`,
    text: `Hi ${brandName},

Your Sponza account balance is running low at ${balance}. To ensure uninterrupted campaign activity, please top up your account: [Add Funds]

Questions? Contact us at support@sponza.in.

Stay connected!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Low Balance Alert</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        Your <strong><em>Sponza</em></strong> account balance is running low at <strong>${balance}</strong>. To ensure uninterrupted campaign activity, please top up your account:
        <br />
        <a href="https://www.sponza.in/dashboard/billing" class="button" target="_blank">Add Funds</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Stay connected!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Subscription Confirmation Email
const subscriptionConfirmationEmail = async (
  brandName: any,
  email: any,
  planName: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your ${planName} Subscription is Confirmed!`,
    text: `Hi ${brandName},

Your ${planName} subscription on Sponza has been successfully activated! You now have access to premium features to supercharge your influencer campaigns.

Manage your subscription in your dashboard: [View Subscription]

Questions? Contact us at support@sponza.in.

Thank you for choosing Sponza!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Subscription Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        Your <strong>${planName}</strong> subscription on <strong><em>Sponza</em></strong> has been successfully activated! You now have access to premium features to supercharge your influencer campaigns.
      </p>

      <p>
        Manage your subscription in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/subscription" class="button" target="_blank">View Subscription</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Thank you for choosing Sponza!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Subscription Renewal Reminder Email
const subscriptionRenewalReminderEmail = async (
  brandName: any,
  email: any,
  planName: any,
  renewalDate: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your ${planName} Subscription Renews on ${renewalDate}`,
    text: `Hi ${brandName},

This is a friendly reminder that your ${planName} subscription on Sponza is set to renew on ${renewalDate}. Ensure your payment method is up to date to continue enjoying premium features: [Update Payment Details]

Questions? Contact us at support@sponza.in.

Stay connected!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Subscription Renewal Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        This is a friendly reminder that your <strong>${planName}</strong> subscription on <strong><em>Sponza</em></strong> is set to renew on <strong>${renewalDate}</strong>. Ensure your payment method is up to date to continue enjoying premium features:
        <br />
        <a href="https://www.sponza.in/dashboard/billing" class="button" target="_blank">Update Payment Details</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Stay connected!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Application Status Update Email
const applicationStatusUpdateEmail = async (
  influencerName: any,
  email: any,
  campaignName: any,
  status: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Update: Your Application for "${campaignName}"`,
    text: `Hi ${influencerName},

We have an update on your application for the "${campaignName}" campaign on Sponza. Your application has been ${status}.

View details in your dashboard: [View Application Status]

Questions? Contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Application Status Update</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${influencerName}</strong>,</p>

      <p>
        We have an update on your application for the <strong>"${campaignName}"</strong> campaign on <strong><em>Sponza</em></strong>. Your application has been <strong>${status}</strong>.
      </p>

      <p>
        View details in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/applications" class="button" target="_blank">View Application Status</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Campaign Deadline Reminder Email
const campaignDeadlineReminderEmail = async (
  influencerName: any,
  email: any,
  campaignName: any,
  deadline: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Reminder: "${campaignName}" Deliverables Due by ${deadline}`,
    text: `Hi ${influencerName},

This is a friendly reminder that the deliverables for the "${campaignName}" campaign on Sponza are due by ${deadline}. Please submit them via your dashboard: [Submit Deliverables]

Need help? Contact us at support@sponza.in.

Keep shining!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Campaign Deadline Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${influencerName}</strong>,</p>

      <p>
        This is a friendly reminder that the deliverables for the <strong>"${campaignName}"</strong> campaign on <strong><em>Sponza</em></strong> are due by <strong>${deadline}</strong>. Please submit them via your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/deliverables" class="button" target="_blank">Submit Deliverables</a>
      </p>

      <p>
        Need help? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Keep shining!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Payment Received Email
const paymentReceivedEmail = async (
  influencerName: any,
  email: any,
  campaignName: any,
  amount: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Payment Received for "${campaignName}"`,
    text: `Hi ${influencerName},

Great news! We’ve received your payment of ${amount} for the "${campaignName}" campaign on Sponza. The funds are now available in your account.

View your earnings in your dashboard: [View Earnings]

Questions? Contact us at support@sponza.in.

Keep shining!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Payment Received</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${influencerName}</strong>,</p>

      <p>
        Great news! We’ve received your payment of <strong>${amount}</strong> for the <strong>"${campaignName}"</strong> campaign on <strong><em>Sponza</em></strong>. The funds are now available in your account.
      </p>

      <p>
        View your earnings in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/earnings" class="button" target="_blank">View Earnings</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Keep shining!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Withdrawal Confirmation Email
const withdrawalConfirmationEmail = async (
  influencerName: any,
  email: any,
  amount: any,
  method: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Withdrawal of ${amount} Confirmed`,
    text: `Hi ${influencerName},

Your withdrawal request of ${amount} via ${method} has been successfully processed on Sponza. The funds should reach you within 3-5 business days.

View your withdrawal history in your dashboard: [View Withdrawal History]

Questions? Contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Withdrawal Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${influencerName}</strong>,</p>

      <p>
        Your withdrawal request of <strong>${amount}</strong> via <strong>${method}</strong> has been successfully processed on <strong><em>Sponza</em></strong>. The funds should reach you within 3-5 business days.
      </p>

      <p>
        View your withdrawal history in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/withdrawals" class="button" target="_blank">View Withdrawal History</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Referral Reward Earned Email
const referralRewardEarnedEmail = async (
  influencerName: any,
  email: any,
  rewardAmount: any,
  referredUser: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `You’ve Earned a ${rewardAmount} Referral Reward! 🎉`,
    text: `Hi ${influencerName},

Congratulations! You’ve earned a ${rewardAmount} referral reward because ${referredUser} joined Sponza using your referral link. The reward has been added to your account.

Invite more friends to earn more rewards: [Invite Friends]

Questions? Contact us at support@sponza.in.

Keep shining!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Referral Reward Earned</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${influencerName}</strong>,</p>

      <p>
        Congratulations! You’ve earned a <strong>${rewardAmount}</strong> referral reward because <strong>${referredUser}</strong> joined <strong><em>Sponza</em></strong> using your referral link. The reward has been added to your account.
      </p>

      <p>
        Invite more friends to earn more rewards:
        <br />
        <a href="https://www.sponza.in/referral" class="button" target="_blank">Invite Friends</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Keep shining!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// New User Verification Request Email (Admin)
const newUserVerificationRequestEmail = async (
  adminName: any,
  email: any,
  userName: any,
  userId: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza Admin" <admin@sponza.in>',
    to: email,
    subject: `New User Verification Request: ${userName}`,
    text: `Hi ${adminName},

A new user, ${userName} (ID: ${userId}), has registered on Sponza and requires verification. Please review their profile and verify their account: [Review User Profile]

For assistance, contact support@sponza.in.

Best regards,
The Sponza Admin Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New User Verification Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${adminName}</strong>,</p>

      <p>
        A new user, <strong>${userName}</strong> (ID: ${userId}), has registered on <strong><em>Sponza</em></strong> and requires verification. Please review their profile and verify their account:
        <br />
        <a href="https://www.sponza.in/admin/users/${userId}" class="button" target="_blank">Review User Profile</a>
      </p>

      <p>
        For assistance, contact
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Admin Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// User Ban/Suspension Alert Email (Admin)
const userBanSuspensionAlertEmail = async (
  adminName: any,
  email: any,
  userName: any,
  userId: any,
  action: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza Admin" <admin@sponza.in>',
    to: email,
    subject: `User ${action}: ${userName}`,
    text: `Hi ${adminName},

The user ${userName} (ID: ${userId}) has been ${action} on Sponza due to a policy violation. Review the details in the admin panel: [View User Details]

For assistance, contact support@sponza.in.

Best regards,
The Sponza Admin Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>User ${action}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${adminName}</strong>,</p>

      <p>
        The user <strong>${userName}</strong> (ID: ${userId}) has been <strong>${action}</strong> on <strong><em>Sponza</em></strong> due to a policy violation. Review the details in the admin panel:
        <br />
        <a href="https://www.sponza.in/admin/users/${userId}" class="button" target="_blank">View User Details</a>
      </p>

      <p>
        For assistance, contact
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Admin Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Flagged Content Alert Email (Admin)
const flaggedContentAlertEmail = async (
  adminName: any,
  email: any,
  contentId: any,
  userName: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza Admin" <admin@sponza.in>',
    to: email,
    subject: `Flagged Content Alert: Content ID ${contentId}`,
    text: `Hi ${adminName},

Content (ID: ${contentId}) posted by ${userName} has been flagged for review on Sponza. Please investigate in the admin panel: [Review Flagged Content]

For assistance, contact support@sponza.in.

Best regards,
The Sponza Admin Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Flagged Content Alert</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${adminName}</strong>,</p>

      <p>
        Content (ID: ${contentId}) posted by <strong>${userName}</strong> has been flagged for review on <strong><em>Sponza</em></strong>. Please investigate in the admin panel:
        <br />
        <a href="https://www.sponza.in/admin/content/${contentId}" class="button" target="_blank">Review Flagged Content</a>
      </p>

      <p>
        For assistance, contact
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Admin Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Anomaly Detection Alert Email (Admin)
const anomalyDetectionAlertEmail = async (
  adminName: any,
  email: any,
  anomalyType: any,
  details: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza Admin" <admin@sponza.in>',
    to: email,
    subject: `Anomaly Detected: ${anomalyType}`,
    text: `Hi ${adminName},

An anomaly (${anomalyType}) has been detected on Sponza. Details: ${details}. Please review in the admin panel: [Investigate Anomaly]

For assistance, contact support@sponza.in.

Best regards,
The Sponza Admin Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Anomaly Detection Alert</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${adminName}</strong>,</p>

      <p>
        An anomaly (<strong>${anomalyType}</strong>) has been detected on <strong><em>Sponza</em></strong>. Details: ${details}. Please review in the admin panel:
        <br />
        <a href="https://www.sponza.in/admin/anomalies" class="button" target="_blank">Investigate Anomaly</a>
      </p>

      <p>
        For assistance, contact
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Admin Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Onboarding Reminder Email (General Users)
const onboardingReminderEmail = async (userName: any, email: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Complete Your Sponza Onboarding, ${userName}!`,
    text: `Hi ${userName},

We noticed you haven’t completed your onboarding on Sponza yet. Set up your profile to start connecting with brands or influencers: [Complete Your Profile]

Need help? Contact us at support@sponza.in.

Happy collaborating!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Complete Your Sponza Onboarding</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        We noticed you haven’t completed your onboarding on <strong><em>Sponza</em></strong> yet. Set up your profile to start connecting with brands or influencers:
        <br />
        <a href="https://www.sponza.in/onboarding" class="button" target="_blank">Complete Your Profile</a>
      </p>

      <p>
        Need help? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Happy collaborating!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Platform Announcement Email (General Users)
const platformAnnouncementEmail = async (
  userName: any,
  email: any,
  announcementTitle: any,
  announcementDetails: any
) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Sponza Update: ${announcementTitle}`,
    text: `Hi ${userName},

We’re excited to share some news from Sponza! ${announcementDetails}

Learn more on our platform: [Explore Updates]

Questions? Contact us at support@sponza.in.

Happy collaborating!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sponza Platform Update</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        We’re excited to share some news from <strong><em>Sponza</em></strong>! ${announcementDetails}
      </p>

      <p>
        Learn more on our platform:
        <br />
        <a href="https://www.sponza.in/updates" class="button" target="_blank">Explore Updates</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Happy collaborating!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Campaign Paused Notification Email (Brand)
const campaignPausedEmail = async (brandName: any, email: any, campaignName: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your Campaign "${campaignName}" Has Been Paused`,
    text: `Hi ${brandName},

Your campaign "${campaignName}" on Sponza has been paused. You can resume it anytime from your dashboard: [Manage Campaign]

Need assistance? Contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Campaign Paused Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        Your campaign <strong>"${campaignName}"</strong> on <strong><em>Sponza</em></strong> has been paused. You can resume it anytime from your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard" class="button" target="_blank">Manage Campaign</a>
      </p>

      <p>
        Need assistance? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Campaign Ended Notification Email (Brand and Influencer)
const campaignEndedEmail = async (userName: any, email: any, campaignName: any, userType: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Campaign "${campaignName}" Has Ended`,
    text: `Hi ${userName},

The campaign "${campaignName}" on Sponza has officially ended. Thank you for your participation! View the campaign results in your dashboard: [View Campaign Results]

Questions? Contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Campaign Ended Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        The campaign <strong>"${campaignName}"</strong> on <strong><em>Sponza</em></strong> has officially ended. Thank you for your participation as a ${userType}! View the campaign results in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/campaigns" class="button" target="_blank">View Campaign Results</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Campaign Application Deadline Reminder Email (Influencer)
const campaignApplicationDeadlineReminderEmail = async (influencerName: any, email: any, campaignName: any, deadline: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Reminder: "${campaignName}" Application Deadline is ${deadline}`,
    text: `Hi ${influencerName},

Don’t miss out! The application deadline for the "${campaignName}" campaign on Sponza is ${deadline}. Submit your application now: [Apply Now]

Need help? Contact us at support@sponza.in.

Keep shining!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Campaign Application Deadline Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${influencerName}</strong>,</p>

      <p>
        Don’t miss out! The application deadline for the <strong>"${campaignName}"</strong> campaign on <strong><em>Sponza</em></strong> is <strong>${deadline}</strong>. Submit your application now:
        <br />
        <a href="https://www.sponza.in/dashboard/campaigns" class="button" target="_blank">Apply Now</a>
      </p>

      <p>
        Need help? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Keep shining!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Payment Failed Notification Email (Brand and Influencer)
const paymentFailedEmail = async (userName: any, email: any, campaignName: any, userType: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Payment Failed for "${campaignName}"`,
    text: `Hi ${userName},

We’re sorry, but a payment related to the "${campaignName}" campaign on Sponza has failed. Please update your payment details in your dashboard to resolve this: [Update Payment Details]

For assistance, contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Payment Failed Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        We’re sorry, but a payment related to the <strong>"${campaignName}"</strong> campaign on <strong><em>Sponza</em></strong> has failed. Please update your payment details in your dashboard to resolve this:
        <br />
        <a href="https://www.sponza.in/dashboard/billing" class="button" target="_blank">Update Payment Details</a>
      </p>

      <p>
        For assistance, contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Add Funds Confirmation Email (Brand)
const addFundsConfirmationEmail = async (brandName: any, email: any, amount: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Funds Added: ${amount} to Your Sponza Wallet`,
    text: `Hi ${brandName},

We’ve successfully added ${amount} to your Sponza wallet. You’re all set to fund your next campaign! View your balance in your dashboard: [View Wallet]

Questions? Contact us at support@sponza.in.

Thank you for choosing Sponza!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Add Funds Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${brandName}</strong>,</p>

      <p>
        We’ve successfully added <strong>${amount}</strong> to your <strong><em>Sponza</em></strong> wallet. You’re all set to fund your next campaign! View your balance in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/billing" class="button" target="_blank">View Wallet</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Thank you for choosing Sponza!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Withdrawal Failed Notification Email (Influencer)
const withdrawalFailedEmail = async (influencerName: any, email: any, amount: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Withdrawal of ${amount} Failed`,
    text: `Hi ${influencerName},

We’re sorry, but your withdrawal request of ${amount} on Sponza has failed. Please check your payment details and try again: [Update Payment Details]

For assistance, contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Withdrawal Failed Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${influencerName}</strong>,</p>

      <p>
        We’re sorry, but your withdrawal request of <strong>${amount}</strong> on <strong><em>Sponza</em></strong> has failed. Please check your payment details and try again:
        <br />
        <a href="https://www.sponza.in/dashboard/billing" class="button" target="_blank">Update Payment Details</a>
      </p>

      <p>
        For assistance, contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Subscription Cancellation Confirmation Email (Brand and Influencer)
const subscriptionCancellationEmail = async (userName: any, email: any, planName: any, userType: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your ${planName} Subscription Has Been Cancelled`,
    text: `Hi ${userName},

Your ${planName} subscription on Sponza has been cancelled. You’ll continue to have access to premium features until the end of your current billing cycle. Manage your subscription in your dashboard: [View Subscription]

Questions? Contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Subscription Cancellation Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        Your <strong>${planName}</strong> subscription on <strong><em>Sponza</em></strong> has been cancelled. You’ll continue to have access to premium features until the end of your current billing cycle. Manage your subscription in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/subscription" class="button" target="_blank">View Subscription</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Subscription Expired Notification Email (Brand and Influencer)
const subscriptionExpiredEmail = async (userName: any, email: any, planName: any, userType: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your ${planName} Subscription Has Expired`,
    text: `Hi ${userName},

Your ${planName} subscription on Sponza has expired. Renew now to continue enjoying premium features: [Renew Subscription]

Questions? Contact us at support@sponza.in.

Stay connected!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Subscription Expired Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        Your <strong>${planName}</strong> subscription on <strong><em>Sponza</em></strong> has expired. Renew now to continue enjoying premium features:
        <br />
        <a href="https://www.sponza.in/dashboard/subscription" class="button" target="_blank">Renew Subscription</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Stay connected!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Referral Invite Sent Email (Brand and Influencer)
const referralInviteSentEmail = async (userName: any, email: any, invitedUserEmail: any, userType: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Referral Invite Sent to ${invitedUserEmail}`,
    text: `Hi ${userName},

You’ve successfully sent a referral invite to ${invitedUserEmail} on Sponza. If they join using your link, you’ll earn a referral reward! Track your referrals in your dashboard: [View Referrals]

Questions? Contact us at support@sponza.in.

Keep shining!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Referral Invite Sent</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        You’ve successfully sent a referral invite to <strong>${invitedUserEmail}</strong> on <strong><em>Sponza</em></strong>. If they join using your link, you’ll earn a referral reward! Track your referrals in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard/referrals" class="button" target="_blank">View Referrals</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Keep shining!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// High User Growth Alert Email (Admin)
const highUserGrowthAlertEmail = async (adminName: any, email: any, growthPercentage: any, timePeriod: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza Admin" <admin@sponza.in>',
    to: email,
    subject: `High User Growth Alert: ${growthPercentage}% Increase`,
    text: `Hi ${adminName},

Sponza has experienced a ${growthPercentage}% user growth over the past ${timePeriod}. Review the analytics in the admin panel: [View Analytics]

For assistance, contact support@sponza.in.

Best regards,
The Sponza Admin Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>High User Growth Alert</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${adminName}</strong>,</p>

      <p>
        <strong><em>Sponza</em></strong> has experienced a <strong>${growthPercentage}%</strong> user growth over the past <strong>${timePeriod}</strong>. Review the analytics in the admin panel:
        <br />
        <a href="https://www.sponza.in/admin/analytics" class="button" target="_blank">View Analytics</a>
      </p>

      <p>
        For assistance, contact
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Admin Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// AI Model Performance Drop Alert Email (Admin)
const aiModelPerformanceDropAlertEmail = async (adminName: any, email: any, modelName: any, performanceMetric: any, dropPercentage: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza Admin" <admin@sponza.in>',
    to: email,
    subject: `AI Model Performance Drop Alert: ${modelName}`,
    text: `Hi ${adminName},

The ${modelName} AI model on Sponza has experienced a ${dropPercentage}% drop in ${performanceMetric}. Please investigate in the admin panel: [View AI Metrics]

For assistance, contact support@sponza.in.

Best regards,
The Sponza Admin Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>AI Model Performance Drop Alert</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${adminName}</strong>,</p>

      <p>
        The <strong>${modelName}</strong> AI model on <strong><em>Sponza</em></strong> has experienced a <strong>${dropPercentage}%</strong> drop in <strong>${performanceMetric}</strong>. Please investigate in the admin panel:
        <br />
        <a href="https://www.sponza.in/admin/ai-metrics" class="button" target="_blank">View AI Metrics</a>
      </p>

      <p>
        For assistance, contact
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Admin Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Inactivity Reminder Email (Brand and Influencer)
const inactivityReminderEmail = async (userName: any, email: any, userType: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `We Miss You on Sponza, ${userName}!`,
    text: `Hi ${userName},

It’s been a while since you’ve been active on Sponza. Come back and explore new campaigns or opportunities to connect! Log in to your dashboard: [Log In Now]

Questions? Contact us at support@sponza.in.

Happy collaborating!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Inactivity Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        It’s been a while since you’ve been active on <strong><em>Sponza</em></strong>. Come back and explore new campaigns or opportunities to connect as a ${userType}! Log in to your dashboard:
        <br />
        <a href="https://www.sponza.in/login" class="button" target="_blank">Log In Now</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Happy collaborating!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// New Feature Announcement Email (All Users)
const newFeatureAnnouncementEmail = async (userName: any, email: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Discover New Features on Sponza!`,
    text: `Hi ${userName},

We’re thrilled to announce new features on Sponza to enhance your experience! Explore them now in your dashboard: [Discover New Features]

Questions? Contact us at support@sponza.in.

Happy collaborating!
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>New Feature Announcement</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        We’re thrilled to announce new features on <strong><em>Sponza</em></strong> to enhance your experience! Explore them now in your dashboard:
        <br />
        <a href="https://www.sponza.in/dashboard" class="button" target="_blank">Discover New Features</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Happy collaborating!<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Data Export Ready Email (All Users)
const dataExportReadyEmail = async (userName: any, email: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your Sponza Data Export is Ready`,
    text: `Hi ${userName},

Your requested data export from Sponza is ready. Download it from your account settings: [Download Data]

Questions? Contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Data Export Ready</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        Your requested data export from <strong><em>Sponza</em></strong> is ready. Download it from your account settings:
        <br />
        <a href="https://www.sponza.in/account/settings" class="button" target="_blank">Download Data</a>
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};

// Data Deletion Confirmation Email (All Users)
const dataDeletionConfirmationEmail = async (userName: any, email: any) => {
  const info = await transporter.sendMail({
    from: '"Sponza" <support@sponza.in>',
    to: email,
    subject: `Your Sponza Account Data Has Been Deleted`,
    text: `Hi ${userName},

We’ve successfully deleted your account data from Sponza as per your request. If you change your mind, you can always rejoin us at www.sponza.in.

Questions? Contact us at support@sponza.in.

Best regards,
The Sponza Team
www.sponza.in
`,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Data Deletion Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        padding: 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 30px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 12px 20px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff;
        background-color: #0288d1;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="logo">
        <img src="https://sponza.in/logo.png" alt="Sponza Logo" width="150" />
      </div>
      <p>Hi <strong>${userName}</strong>,</p>

      <p>
        We’ve successfully deleted your account data from <strong><em>Sponza</em></strong> as per your request. If you change your mind, you can always rejoin us at <a href="https://www.sponza.in">www.sponza.in</a>.
      </p>

      <p>
        Questions? Contact us at
        <a href="mailto:support@sponza.in">support@sponza.in</a>.
      </p>

      <p>Best regards,<br />The Sponza Team</p>

      <div class="footer">
        <a href="https://www.sponza.in">www.sponza.in</a>
      </div>
    </div>
  </body>
</html>
`,
  });
};



export {
  welcomeEmail,
  verificationEmail,
  passwordResetEmail,
  campaignPublishedEmail,
  newApplicationEmail,
  deliverablesSubmittedEmail,
  paymentConfirmationEmail,
  lowBalanceWarningEmail,
  subscriptionConfirmationEmail,
  subscriptionRenewalReminderEmail,
  applicationStatusUpdateEmail,
  campaignDeadlineReminderEmail,
  paymentReceivedEmail,
  withdrawalConfirmationEmail,
  referralRewardEarnedEmail,
  newUserVerificationRequestEmail,
  userBanSuspensionAlertEmail,
  flaggedContentAlertEmail,
  anomalyDetectionAlertEmail,
  onboardingReminderEmail,
  platformAnnouncementEmail,
   campaignPausedEmail,
  campaignEndedEmail,
  campaignApplicationDeadlineReminderEmail,
  paymentFailedEmail,
  addFundsConfirmationEmail,
  withdrawalFailedEmail,
  subscriptionCancellationEmail,
  subscriptionExpiredEmail,
  referralInviteSentEmail,
  highUserGrowthAlertEmail,
  aiModelPerformanceDropAlertEmail,
  inactivityReminderEmail,
  newFeatureAnnouncementEmail,
  dataExportReadyEmail,
  dataDeletionConfirmationEmail
};
