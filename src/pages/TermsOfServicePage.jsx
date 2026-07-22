import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage = () => (
  <main className="min-h-screen bg-[#050505] text-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-[#00E5FF] text-sm font-medium hover:underline">← Back to Home</Link>
      <h1 className="text-4xl font-bold mt-6">Terms of Service</h1>
      <p className="text-gray-400 mt-4">Last updated: November 01, 2025</p>
      <div className="mt-10 prose prose-invert prose-lg max-w-none space-y-6">
        <p>These Terms of Service govern your use of the payment processing, payout rails, and dashboard systems provided by OnePG Technologies Pvt. Ltd.</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using OnePG services, you agree to comply with these terms and all applicable laws and regulations.</p>
        <h2>2. Service Scope</h2>
        <p>OnePG provides technology, consulting, onboarding, and integration services for merchants, payment gateways, and financial institutions.</p>
        <p>Service delivery may include payment gateway integration, website development, API integration, compliance support, and related technical assistance.</p>
        <h2>3. Definitions</h2>
        <p>In these terms, "services" refers to all software, consulting, onboarding, and support services offered by OnePG. "Client" refers to the business or merchant receiving services.</p>
        <h2>4. No Guarantee of Approval</h2>
        <p>OnePG does not guarantee payment gateway approval, merchant account activation, transaction settlement speed, or specific financial services.</p>
        <p>Decisions regarding merchant acceptance, risk assessment, transaction limits, and regulatory compliance are made by the payment gateway provider, bank, or financial institution.</p>
        <h2>5. User Responsibilities</h2>
        <p>Clients must provide accurate business information, maintain compliant websites or applications, and cooperate with documentation and compliance requests.</p>
        <p>Any delay or rejection caused by incorrect or incomplete information is the responsibility of the client.</p>
        <h2>6. Fees and Payments</h2>
        <p>Fees for OnePG services are due according to the agreed schedule. Failure to pay on time may result in suspension of services.</p>
        <p>All service fees are non-refundable once the service has commenced, except as otherwise agreed in writing.</p>
        <h2>7. Account Suspension</h2>
        <p>OnePG may suspend or terminate services if a client violates these terms, fails to provide required documents, or engages in prohibited activity.</p>
        <h2>8. Intellectual Property</h2>
        <p>OnePG retains ownership of all proprietary software, documentation, and technical materials delivered as part of the service, unless otherwise agreed in writing.</p>
        <h2>9. Disclaimer of Warranties</h2>
        <p>Services are provided "as is" and "as available." OnePG disclaims all warranties to the extent permitted by law, including implied warranties of merchantability and fitness for a particular purpose.</p>
        <h2>10. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, OnePG’s liability is limited to the amount paid for the specific service giving rise to the claim.</p>
        <p>OnePG is not liable for indirect, incidental, consequential, or special damages, including loss of revenue, profit, or business opportunity.</p>
        <h2>11. Force Majeure</h2>
        <p>OnePG will not be liable for delays or failures caused by events outside its reasonable control, such as natural disasters, internet outages, strikes, or government actions.</p>
        <h2>12. Changes to Terms</h2>
        <p>OnePG may update these terms from time to time. The latest version published on the website supersedes prior versions.</p>
        <h2>13. Governing Law</h2>
        <p>These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Gurugram, Haryana, India.</p>
      </div>
    </div>
  </main>
);

export default TermsOfServicePage;
