import React from 'react';
import { Link } from 'react-router-dom';

const SecurityPage = () => (
  <main className="min-h-screen bg-[#050505] text-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-[#00E5FF] text-sm font-medium hover:underline">← Back to Home</Link>
      <h1 className="text-4xl font-bold mt-6">Security & Encryption Standards</h1>
      <p className="text-gray-400 mt-4">Last updated: December 05, 2025</p>
      <div className="mt-10 prose prose-invert prose-lg max-w-none space-y-6">
        <p>OnePG maintains industry-grade security standards designed to protect merchant information, transaction flows, and application infrastructure.</p>
        <h2>Information Security</h2>
        <p>We employ secure architecture, hardened servers, and granular access controls to protect client and customer information. Data access is restricted based on role and need-to-know principles.</p>
        <h2>Encryption Standards</h2>
        <p>All sensitive data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Encryption keys are managed using secure processes and separated from production data storage.</p>
        <h2>Access Control & Identity Management</h2>
        <p>OnePG uses strong identity and access management controls. Administrative access is protected with multi-factor authentication and periodic reviews of user privileges.</p>
        <h2>Application Security</h2>
        <p>Our development lifecycle includes secure coding practices, static and dynamic application security testing, and regular dependency audits to reduce vulnerabilities.</p>
        <h2>Network & Endpoint Protection</h2>
        <p>Network protections include firewalls, intrusion detection, and segmentation. Critical endpoints are monitored for anomalies and protected with advanced endpoint security controls.</p>
        <h2>PCI-DSS Compliance</h2>
        <p>OnePG follows best practices aligned with PCI-DSS requirements. Cardholder data is isolated from the platform's main infrastructure using secure tokenization and sandboxed checkout workflows.</p>
        <h2>Fraud Monitoring and Incident Response</h2>
        <p>We perform continuous real-time fraud monitoring, threat detection, and vulnerability scanning. Our incident response processes capture and investigate security events promptly.</p>
        <h2>Backup and Recovery</h2>
        <p>Regular backups are taken and protected with encryption. Recovery plans are tested to ensure business continuity and data resiliency in case of system disruptions.</p>
        <h2>Third-Party Testing</h2>
        <p>Regular external penetration testing and security audits are conducted by certified third-party auditors to validate our controls and improve our security posture.</p>
      </div>
    </div>
  </main>
);

export default SecurityPage;
