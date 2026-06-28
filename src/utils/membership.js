// Membership & Loyalty Program utility functions
// Tier thresholds based on total completed transaction spending (PRD US-4)

// Map total spending amount to membership tier
export const getTierFromSpending = (totalSpending) => {
  if (totalSpending > 15000000) return "Platinum";
  if (totalSpending >= 5000001) return "Gold";
  if (totalSpending >= 1000000) return "Silver";
  return "Bronze";
};

// Discount rate per tier (PRD US-4)
export const getDiscountRate = (tier) => {
  const rates = {
    Bronze: 0,
    Silver: 0.05,
    Gold: 0.10,
    Platinum: 0.15,
  };
  return rates[tier] || 0;
};

// Calculate loyalty points: 1 point per Rp 10.000 spent
export const calculatePoints = (netAmount) => {
  return Math.floor(netAmount / 10000);
};

// Format currency to Indonesian Rupiah
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

// Format date to Indonesian locale
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
