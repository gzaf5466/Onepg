import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => (
  <main className="min-h-screen bg-[#050505] text-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-[#00E5FF] text-sm font-medium hover:underline">← Back to Home</Link>
      <h1 className="text-4xl font-bold mt-6">Privacy Policy</h1>
      <p className="text-gray-400 mt-4">Last updated: October 12, 2025</p>
      <div className="mt-10 prose prose-invert prose-lg max-w-none space-y-6">
        <p>At OnePG, we prioritize the protection of your personal and corporate financial data while delivering payment onboarding and merchant services.</p>
        <p>This Privacy Policy explains how we collect, use, disclose, and protect information when you access our services.</p>
        <h2>1. Information We Collect</h2>
        <p>We collect registration details, operational metadata, and transactional parameters necessary to execute secure settlements.</p>
        <p>This may include business name, PAN, GSTIN, email, contact information, IP address, device identifiers, and checkout telemetry.</p>
        <h2>2. Use of Information</h2>
        <p>Your data is used to provide and improve our services, process transactions, comply with regulations, and support client onboarding.</p>
        <h2>3. Cookies and Tracking</h2>
        <p>We may use cookies, web beacons, and similar technologies to improve site performance, analyze usage patterns, and support authentication.</p>
        <h2>4. Data Security</h2>
        <p>All client data is encrypted in transit using TLS 1.3 and at rest using AES-256 standards. Access controls and monitoring tools are used to prevent unauthorized access.</p>
        <h2>5. Data Sharing</h2>
        <p>Data sharing is limited to certified banking networks, payment gateway partners, and regulatory authorities when necessary to provide payment and onboarding services. We do not sell or lease merchant or customer data to third-party marketing brokers.</p>
        <h2>6. Third-Party Providers</h2>
        <p>OnePG may share data with trusted third-party service providers for payment processing, identity verification, fraud monitoring, and hosting. These providers are contractually obligated to protect the data they process.</p>
        <h2>7. Data Retention</h2>
        <p>We retain personal and business information only as long as required for service delivery, legal compliance, and dispute resolution. Retention periods may vary based on applicable laws.</p>
        <h2>8. Your Rights</h2>
        <p>You may request access, correction, or deletion of your personal data by contacting us. We will respond to such requests in accordance with applicable privacy laws.</p>
        <h2>9. Children</h2>
        <p>Our services are not intended for children under the age of 18. We do not knowingly collect personal data from minors.</p>
        <h2>10. Changes to this Policy</h2>
        <p>We may update this policy from time to time. The latest version published on the website supersedes prior versions.</p>
        <h2>11. Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please contact us at <a className="text-[#00E5FF] hover:underline" href="mailto:help@onepg.in">help@onepg.in</a>.</p>
      </div>
    </div>
  </main>
);

export default PrivacyPolicyPage;
