export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'approved':
    case 'completed':
    case 'active':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'in progress':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'under review':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'pending':
    case 'applied':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'failed':
    case 'rejected':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    default:
      return 'bg-white/5 text-gray-400 border-white/5';
  }
};
