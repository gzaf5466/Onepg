import React from 'react';
import { Link } from 'react-router-dom';

const CompliancePage = () => (
  <main className="min-h-screen bg-[#050505] text-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-[#00E5FF] text-sm font-medium hover:underline">← Back to Home</Link>
      <h1 className="text-4xl font-bold mt-6">Regulatory Compliance Mandates</h1>
      <p className="text-gray-400 mt-4">Last updated: September 30, 2025</p>
      <div className="mt-10 prose prose-invert prose-lg max-w-none space-y-6">
        <p>OnePG operates in accordance with applicable payment industry regulations and compliance frameworks that govern merchant onboarding, transaction processing, and settlement services.</p>
        <h2>Licensing and Regulation</h2>
        <p>Our services are delivered under the regulatory frameworks required for payment facilitators, gateways, and merchant onboarding operations. We maintain documentation and controls to support compliance with national and international financial regulations.</p>
        <h2>Global Regulatory Frameworks</h2>
        <p>OnePG supports compliance with Indian banking regulations as well as cross-border payment standards where applicable. Our policies are aligned to local regulator expectations, including anti-fraud and payment settlement requirements.</p>
        <h2>KYC/KYB Requirements</h2>
        <p>All corporate clients must complete mandatory Know Your Customer (KYC) and Know Your Business (KYB) verification before transaction processing can begin. Verification typically includes business registration, ownership details, bank account proof, and director identity documents.</p>
        <h2>AML/CFT Monitoring</h2>
        <p>OnePG maintains anti-money laundering (AML) and counter-financing of terrorism (CFT) monitoring. Suspicious activities are escalated and reported to the relevant authorities in accordance with applicable local law and regulatory policies.</p>
        <h2>Transaction Monitoring & Reporting</h2>
        <p>We operate continuous transaction monitoring to detect unusual patterns, high-risk activity, or compliance exceptions. Our processes include periodic reporting to payment gateway partners and banks when required.</p>
        <h2>Vendor Due Diligence</h2>
        <p>We perform due diligence on third-party service providers, technology partners, and payment gateway vendors to ensure they meet our compliance standards and contractual requirements.</p>
        <h2>Client Compliance Support</h2>
        <p>OnePG assists clients in preparing documentation, meeting policy requirements, and maintaining operational compliance with banks, payment gateways, and regulatory authorities.</p>
        <h2>Change Management</h2>
        <p>Any regulatory changes that impact service delivery are communicated promptly to clients. We review and update our processes and documentation to maintain compliance with new rules and guidelines.</p>
        <h2>Privacy and Data Protection</h2>
        <p>Compliance includes protecting client and customer data through secure handling, lawful processing, and appropriate retention policies. Data is only shared with authorized parties for service delivery.</p>
      </div>
    </div>
  </main>
);

export default CompliancePage;
