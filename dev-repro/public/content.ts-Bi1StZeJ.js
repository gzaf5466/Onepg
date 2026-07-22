(function(){
  console.log('[BHK] widget sdk 1.0.0');

  // Widget expects a global config `window.__BHK_CONFIG__` with publicKey/merchantId
  const cfg = window.__BHK_CONFIG__ || {};
  if (!cfg.publicKey || !cfg.merchantId) {
    console.warn('[BHK] install: missing/invalid publicKey or merchantId — aborting');
    return;
  }

  // If config present, initialize (simulated)
  console.log('[BHK] initializing widget with', { publicKey: cfg.publicKey, merchantId: cfg.merchantId });

  // Example API: open payment widget
  window.BHK = {
    open: function(opts){
      console.log('[BHK] open called', opts);
      // simulate widget UI
      alert('BHK widget would open now');
    }
  };
})();
