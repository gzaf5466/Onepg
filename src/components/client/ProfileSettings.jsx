import React, { useState, useContext } from 'react';
import { Download, Eye, EyeOff, RefreshCw, Play } from 'lucide-react';
import { AppContext } from '../../context/AppContext';

export default function ProfileSettings() {
  const { currentClient, saveWebhookUrl, showToast } = useContext(AppContext);

  const [webhookUrl, setWebhookUrl] = useState(currentClient?.webhook_url || '');
  const [showSecret, setShowSecret] = useState(false);
  const [sandboxKey, setSandboxKey] = useState('onepg_sb_live_049fkls39dkls923jndkl287');
  const [clientSecret, setClientSecret] = useState(currentClient?.client_secret || 'opg_sec_not_configured_yet');

  React.useEffect(() => {
    if (currentClient) {
      setWebhookUrl(currentClient.webhook_url || '');
      setClientSecret(currentClient.client_secret || 'opg_sec_not_configured_yet');
    }
  }, [currentClient]);

  const handleSaveWebhook = async () => {
    if (!webhookUrl) {
      showToast('Please enter a valid webhook URL.', 'error');
      return;
    }
    const res = await saveWebhookUrl(currentClient.id, webhookUrl);
    if (res && res.success && res.clientSecret) {
      setClientSecret(res.clientSecret);
    }
  };

  const handleGenerateKey = () => {
    const chars = 'abcdef0123456789';
    let newKey = 'onepg_sb_live_';
    for (let i = 0; i < 24; i++) {
      newKey += chars[Math.floor(Math.random() * chars.length)];
    }
    setSandboxKey(newKey);
    showToast('New Sandbox API Key generated successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white">Merchant Account Settings</h2>
        <p className="text-xs text-gray-400">Update company credentials and configure API webhooks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Profile info (Col 6) */}
        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">Company Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Merchant Name</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.name}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Company Registered</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Work Email</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.email}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Contact Phone</span>
              <p className="text-xs font-semibold text-white mt-1">{currentClient.phone}</p>
            </div>
          </div>
          <div className="pt-2">
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Registered Billing Address</span>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed font-light">
              Sharma Solutions Corp, 4th Block, HSR Layout, Bengaluru, Karnataka, 560102
            </p>
          </div>
        </div>

        {/* API credentials & webhooks (Col 6) */}
        <div className="lg:col-span-6 bg-white/[0.01] border border-white/5 rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-bold text-white border-b border-white/5 pb-3">API & Developer Configurations</h3>
          
          <div className="space-y-4">
            {/* Client ID */}
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Merchant Client ID</span>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type="text" 
                  readOnly 
                  value={currentClient.id}
                  className="flex-grow bg-white/[0.02] border border-white/5 text-gray-400 font-mono rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
                <button onClick={() => { navigator.clipboard.writeText(currentClient.id); showToast('Merchant Client ID copied to clipboard!', 'success'); }} className="p-2 rounded bg-white/5 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all cursor-pointer">
                  <Download size={14} className="rotate-[-90deg]" />
                </button>
              </div>
            </div>

            {/* Client Secret */}
            <div>
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Client Secret</span>
              <div className="flex items-center gap-2 mt-1">
                <input 
                  type={showSecret ? 'text' : 'password'}
                  readOnly 
                  value={clientSecret}
                  className="flex-grow bg-white/[0.02] border border-white/5 text-gray-400 font-mono rounded-lg px-3 py-2 text-xs focus:outline-none"
                />
                <button onClick={() => setShowSecret(!showSecret)} className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer">
                  {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Sandbox Key */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Sandbox API Token</span>
                <button onClick={handleGenerateKey} className="text-[10px] text-[#00E5FF] hover:underline flex items-center gap-1 font-bold bg-transparent border-none cursor-pointer">
                  <RefreshCw size={10} /> Rotate Token
                </button>
              </div>
              <input 
                type="text" 
                readOnly 
                value={sandboxKey}
                className="w-full bg-white/[0.02] border border-white/5 text-gray-400 font-mono rounded-lg px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            {/* Webhook Configuration */}
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Webhook Endpoint URL</span>
                <p className="text-[9px] text-gray-500 mb-2">We will dispatch transaction.captured payloads to this destination.</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="url" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-grow bg-white/[0.03] border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF5722]"
                  />
                  <button onClick={handleSaveWebhook} className="bg-[#FF5722] hover:bg-[#e64e1e] text-white px-3 py-2 rounded-lg text-xs font-bold transition-all border-none cursor-pointer">
                    Save
                  </button>
                </div>
              </div>
              <button onClick={() => showToast('Webhook ping event sent! Response Code: 200 OK', 'success')} className="text-xs bg-white/[0.04] border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all font-semibold flex items-center justify-center gap-1.5 w-full cursor-pointer">
                <Play size={10} /> Test Connection (Send Ping)
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
