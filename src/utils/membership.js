// Membership & Loyalty Program utility functions
// Tier thresholds based on total completed transaction spending (PRD US-4)

export const TIER_ORDER = ["Bronze", "Silver", "Gold", "Platinum"];

// Minimum total spending required to *enter* each tier
export const TIER_THRESHOLDS = {
  Bronze: 0,
  Silver: 1000000,    // Rp 1 juta
  Gold: 5000000,      // Rp 5 juta
  Platinum: 15000000, // Rp 15 juta
};

// Map total spending amount to membership tier
export const getTierFromSpending = (totalSpending) => {
  if (totalSpending >= 15000000) return "Platinum";
  if (totalSpending >= 5000000) return "Gold";
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

// Visual identity per tier — intentionally distinct from brand chrome so a
// membership badge/card always reads as "status you earned", not theme decoration.
export const TIER_THEME = {
  Bronze: {
    gradient: "from-bronze-500 via-bronze-600 to-bronze-700",
    ring: "ring-bronze-400",
    chip: "bg-bronze-50 text-bronze-600",
    solidText: "text-bronze-600",
    icon: "medal",
  },
  Silver: {
    gradient: "from-silver-400 via-silver-500 to-silver-700",
    ring: "ring-silver-400",
    chip: "bg-silver-50 text-silver-600",
    solidText: "text-silver-600",
    icon: "award",
  },
  Gold: {
    gradient: "from-gold-400 via-gold-500 to-gold-700",
    ring: "ring-gold-400",
    chip: "bg-gold-50 text-gold-700",
    solidText: "text-gold-700",
    icon: "crown",
  },
  Platinum: {
    gradient: "from-platinum-500 via-platinum-600 to-plum-950",
    ring: "ring-platinum-400",
    chip: "bg-platinum-50 text-platinum-600",
    solidText: "text-platinum-600",
    icon: "gem",
  },
};

// Given total completed-order spending, return where the member stands
// relative to the next tier — used to drive the progress bar on the
// membership card. Platinum has no "next", so it's always 100%.
export const getNextTierInfo = (totalSpending) => {
  const spending = totalSpending || 0;
  const currentTier = getTierFromSpending(spending);
  const currentIndex = TIER_ORDER.indexOf(currentTier);
  const nextTier = TIER_ORDER[currentIndex + 1] || null;

  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      progressPercent: 100,
      remaining: 0,
    };
  }

  const floor = TIER_THRESHOLDS[currentTier];
  const ceiling = TIER_THRESHOLDS[nextTier];
  const progressPercent = Math.min(
    100,
    Math.max(0, ((spending - floor) / (ceiling - floor)) * 100)
  );

  return {
    currentTier,
    nextTier,
    progressPercent,
    remaining: Math.max(0, ceiling - spending),
  };
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
