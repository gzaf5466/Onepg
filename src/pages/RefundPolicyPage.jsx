import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicyPage = () => (
  <main className="min-h-screen bg-[#050505] text-white py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-[#00E5FF] text-sm font-medium hover:underline">← Back to Home</Link>
      <h1 className="text-4xl font-bold mt-6">Refund & Cancellation Policy – OnePG</h1>
      <p className="text-gray-400 mt-4">Effective Date: July 18, 2026</p>
      <div className="mt-10 prose prose-invert prose-lg max-w-none space-y-6">
        <p>Welcome to OnePG. By purchasing or using our services, you agree to the terms of this Refund & Cancellation Policy.</p>
        <h2>Important Notice</h2>
        <p>OnePG is a technology, consulting, and onboarding service provider that assists businesses with payment gateway integration, website development, software solutions, and related services.</p>
        <p><strong>OnePG is not a bank, payment gateway, payment aggregator, or financial institution.</strong> Final approvals, account activation, settlement timelines, transaction limits, reserve policies, and other decisions are made solely by the respective payment gateway provider, bank, financial institution, or regulatory authority.</p>
        <h2>1. No Refund Policy</h2>
        <p><strong>All sales are final.</strong></p>
        <p>All payments made to OnePG are <strong>non-refundable</strong> under any circumstances.</p>
        <p>This includes, but is not limited to:</p>
        <ul>
          <li>Payment Gateway Consultation</li>
          <li>Payment Gateway Onboarding</li>
          <li>Payment Gateway Integration</li>
          <li>Payment Gateway Routing Solutions</li>
          <li>Web Development</li>
          <li>Software Development</li>
          <li>API Integration</li>
          <li>Technical Consultation</li>
          <li>Digital Products</li>
          <li>Training & Courses</li>
          <li>Documentation Review</li>
          <li>Compliance Assistance</li>
        </ul>
        <p>Our fees are charged for professional consultation, technical expertise, documentation review, processing efforts, implementation support, and coordination.</p>
        <p>Once payment is received and work has commenced, the service shall be deemed initiated and no refund, reversal, or cancellation shall be permitted.</p>
        <h2>2. Payment Gateway Approval Disclaimer</h2>
        <p>OnePG assists clients in selecting and integrating suitable payment gateway solutions.</p>
        <p>However, payment gateway approval is entirely subject to the internal policies and compliance requirements of the respective provider.</p>
        <p>OnePG does <em>not</em> guarantee:</p>
        <ul>
          <li>Gateway Approval</li>
          <li>Merchant Account Approval</li>
          <li>Instant Settlement</li>
          <li>T+0 Settlement</li>
          <li>International Card Acceptance</li>
          <li>Payout Services</li>
          <li>Virtual Accounts</li>
          <li>Escrow Accounts</li>
          <li>Transaction Limits</li>
          <li>Settlement Speed</li>
          <li>Specific Features</li>
        </ul>
        <p>All such approvals remain solely at the discretion of the payment gateway provider or banking partner.</p>
        <h2>3. Alternative Gateway Solution</h2>
        <p>If the requested payment gateway cannot be provided due to compliance, technical limitations, commercial restrictions, or provider policies, OnePG may recommend or integrate an alternative domestic or international payment gateway offering similar functionality.</p>
        <p>Providing a suitable alternative shall constitute successful delivery of the purchased service.</p>
        <h2>4. Consultation & Service Validity</h2>
        <ul>
          <li>Consultation services will be initiated within <strong>24 business hours</strong> of successful payment.</li>
          <li>Clients must respond and provide the required information within <strong>5 calendar days</strong>.</li>
          <li>Failure to respond within this period shall result in automatic closure of the consultation request without refund.</li>
          <li>Payment Gateway Onboarding services remain valid for <strong>30 calendar days</strong> from the date of payment.</li>
          <li>Requests made after completion of the purchased service shall be treated as a new service request and may attract additional charges.</li>
        </ul>
        <h2>5. Client Responsibilities</h2>
        <ul>
          <li>Submit genuine and accurate business information.</li>
          <li>Provide complete KYC and compliance documents.</li>
          <li>Maintain a compliant website or application.</li>
          <li>Respond promptly to requests for additional information.</li>
          <li>Cooperate throughout the onboarding process.</li>
        </ul>
        <p>OnePG shall not be responsible for delays caused by incomplete documentation, incorrect information, or lack of client cooperation.</p>
        <h2>6. Merchant Website Compliance</h2>
        <p>The client is responsible for ensuring that their website or application complies with the requirements of the selected payment gateway.</p>
        <p>This includes, but is not limited to:</p>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Refund Policy</li>
          <li>Contact Details</li>
          <li>Business Information</li>
          <li>Product Information</li>
          <li>Pricing</li>
          <li>Legal Compliance</li>
          <li>Required Licenses</li>
        </ul>
        <p>Any delay arising from non-compliance shall be the sole responsibility of the client.</p>
        <h2>7. High-Risk & Restricted Businesses</h2>
        <p>Businesses operating in high-risk, restricted, or prohibited categories may require enhanced due diligence.</p>
        <p>Although OnePG will make reasonable efforts to assist with onboarding, approval cannot be guaranteed.</p>
        <p>Our service fees cover consultation and processing efforts only and are <strong>not linked to approval outcomes</strong>.</p>
        <h2>8. KYC & Compliance Rejection</h2>
        <p>No refund shall be provided if an application is rejected because of:</p>
        <ul>
          <li>Failed KYC Verification</li>
          <li>Compliance Issues</li>
          <li>Regulatory Restrictions</li>
          <li>High-Risk Business Category</li>
          <li>Website Non-Compliance</li>
          <li>Incorrect Documentation</li>
          <li>Previous Merchant History</li>
          <li>Chargeback History</li>
          <li>Fraud Detection</li>
          <li>Internal Risk Assessment of the Payment Partner</li>
        </ul>
        <p>Such cases shall be considered a completed consulting and processing service.</p>
        <h2>9. Company Documentation Policy</h2>
        <p>Applications will be processed using the company documents initially submitted by the client.</p>
        <p>Once submitted:</p>
        <ul>
          <li>Company details cannot be changed.</li>
          <li>Business ownership cannot be changed.</li>
          <li>PAN, GST, CIN, or registration details cannot be replaced.</li>
        </ul>
        <p>If the client wishes to use another business entity, a fresh application and applicable service charges will be required.</p>
        <h2>10. Abandoned Projects</h2>
        <p>If the client fails to communicate or submit required documents for more than <strong>30 calendar days</strong>, the project shall be treated as abandoned.</p>
        <p>Reactivation of the project may require additional service charges.</p>
        <h2>11. Timelines</h2>
        <p>OnePG strives to complete services as quickly as possible.</p>
        <p>However, timelines depend on:</p>
        <ul>
          <li>Banks</li>
          <li>Payment Gateway Providers</li>
          <li>Compliance Teams</li>
          <li>Government Authorities</li>
          <li>Third-Party Verification Agencies</li>
          <li>Technical Dependencies</li>
        </ul>
        <p>Accordingly, OnePG does not guarantee any fixed approval or completion timeline.</p>
        <h2>12. Payment Disputes & Chargebacks</h2>
        <p>Clients agree to contact OnePG before initiating any payment dispute or chargeback.</p>
        <p>Where services have commenced, chargebacks or payment reversals are not permitted.</p>
        <p>If a chargeback is initiated after service commencement, OnePG reserves the right to recover all associated bank charges, processing fees, legal expenses, and collection costs as permitted by applicable law.</p>
        <h2>13. Pricing Policy</h2>
        <p>Service fees may change without prior notice.</p>
        <p>However, once payment has been received, the agreed pricing for that specific order shall remain unchanged.</p>
        <h2>14. Limitation of Liability</h2>
        <p>OnePG shall not be liable for any indirect, incidental, consequential, or special damages, including but not limited to:</p>
        <ul>
          <li>Loss of Revenue</li>
          <li>Loss of Business</li>
          <li>Loss of Profits</li>
          <li>Business Interruption</li>
          <li>Delay in Merchant Approval</li>
          <li>Payment Gateway Suspension</li>
          <li>Settlement Delays</li>
          <li>Account Restrictions</li>
          <li>Technical Failures of Third Parties</li>
        </ul>
        <p>To the maximum extent permitted by law, OnePG's total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim.</p>
        <h2>15. Force Majeure</h2>
        <p>OnePG shall not be responsible for delays or failures caused by events beyond its reasonable control, including natural disasters, pandemics, cyberattacks, internet failures, banking outages, regulatory changes, government actions, strikes, or other force majeure events.</p>
        <h2>16. Changes to this Policy</h2>
        <p>OnePG reserves the right to update or modify this Refund & Cancellation Policy at any time.</p>
        <p>The latest version published on the website shall supersede all previous versions.</p>
        <h2>17. Governing Law & Jurisdiction</h2>
        <p>This policy shall be governed by the laws of India.</p>
        <p>Any dispute arising out of or relating to this policy or the services provided by OnePG shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Gurugram, Haryana, India</strong>.</p>
        <h2>Contact Us</h2>
        <p>If you have any questions regarding this Refund & Cancellation Policy, please contact us:</p>
        <p><strong>OnePG</strong></p>
        <p>Website: <a className="text-[#00E5FF] hover:underline" href="https://onepg.co.in/">https://onepg.co.in/</a></p>
        <p>Email: <a className="text-[#00E5FF] hover:underline" href="mailto:help@onepg.in">help@onepg.in</a></p>
        <p>Phone: <a className="text-[#00E5FF] hover:underline" href="tel:+917428314487">+91-7428314487</a></p>
      </div>
    </div>
  </main>
);

export default RefundPolicyPage;
