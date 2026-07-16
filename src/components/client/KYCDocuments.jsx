import React, { useState, useContext } from 'react';
import { Shield, CheckCircle2, Clock, AlertCircle, UploadCloud } from 'lucide-react';
import { AppContext } from '../../context/AppContext';

export default function KYCDocuments() {
  const { currentClient, uploadDocument } = useContext(AppContext);
  const [uploadingDoc, setUploadingDoc] = useState(null);

  const handleDocUpload = (docName) => {
    setUploadingDoc(docName);
    setTimeout(() => {
      uploadDocument(currentClient.id, docName, 'Uploaded');
      setUploadingDoc(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white">Merchant KYC Documents</h2>
          <p className="text-xs text-gray-400">Upload business credentials and review legal compliance audits.</p>
        </div>
        <div className="text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg font-semibold">
          KYC Progress: <span className="text-emerald-400">80% Approved</span>
        </div>
      </div>

      <div className="bg-white/[0.01] border border-white/5 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield size={14} className="text-[#FF5722]" /> KYC Compliance Rule
            </h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              OnePG complies with RBI guidelines and PCI-DSS rules. Incomplete or rejected documents will delay live gateway activation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#00E5FF]/5 border border-[#00E5FF]/10 space-y-1">
            <h4 className="text-xs font-bold text-white">Need support?</h4>
            <p className="text-[10px] text-gray-400">If your document is rejected, raise a ticket or dial support.</p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {currentClient.documents && currentClient.documents.map((doc) => {
            const isPending = doc.status === 'Pending';
            const isReview = doc.status === 'Under Review';
            const isUploaded = doc.status === 'Uploaded';
            return (
              <div key={doc.name} className="bg-white/[0.02] border border-white/5 rounded-lg p-4 flex justify-between items-center hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  {isUploaded ? <CheckCircle2 size={18} className="text-emerald-400" /> : 
                   isReview ? <Clock size={18} className="text-orange-400 animate-pulse" /> : 
                   <AlertCircle size={18} className="text-gray-500" />}
                  <div>
                    <span className="text-xs font-bold text-white">{doc.name}</span>
                    <p className="text-[9px] text-gray-500 mt-0.5">Required for merchant ID verification.</p>
                  </div>
                </div>
                <div>
                  {isUploaded && <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded uppercase tracking-wider">Approved</span>}
                  {isReview && <span className="text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded uppercase tracking-wider">Under Review</span>}
                  {isPending && (
                    <button 
                      disabled={uploadingDoc === doc.name}
                      onClick={() => handleDocUpload(doc.name)}
                      className="bg-white/[0.04] border border-white/10 hover:border-[#FF5722] hover:bg-white/[0.08] text-gray-300 hover:text-white px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <UploadCloud size={14} />
                      {uploadingDoc === doc.name ? 'Uploading...' : 'Upload File'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
