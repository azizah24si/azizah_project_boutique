import { FaMedal, FaAward, FaCrown, FaGem } from "react-icons/fa";
import { TIER_THEME, getNextTierInfo, formatCurrency } from "../utils/membership";

/**
 * MembershipCard Component
 *
 * The signature visual of the CRM: renders like a physical boutique
 * loyalty card. Shows the member's name, current tier, loyalty points,
 * and a progress bar toward the next tier (based on total completed
 * spending).
 *
 * Props:
 * - name: string — member's full name
 * - tier: "Bronze" | "Silver" | "Gold" | "Platinum"
 * - points: number — loyalty points balance
 * - totalSpending: number — total completed-order spending (drives progress)
 * - memberSince: string — ISO date string
 * - className
 */
const TIER_ICONS = {
  medal: FaMedal,
  award: FaAward,
  crown: FaCrown,
  gem: FaGem,
};

export default function MembershipCard({
  name = "Member",
  tier = "Bronze",
  points = 0,
  totalSpending = 0,
  memberSince,
  className = "",
}) {
  const theme = TIER_THEME[tier] || TIER_THEME.Bronze;
  const Icon = TIER_ICONS[theme.icon] || FaMedal;
  const { nextTier, progressPercent, remaining } = getNextTierInfo(totalSpending);

  const memberSinceLabel = memberSince
    ? new Date(memberSince).toLocaleDateString("id-ID", { year: "numeric", month: "short" })
    : "-";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white bg-gradient-to-br ${theme.gradient} shadow-lg ${className}`}
    >
      {/* Decorative pattern — reads as "card texture", not noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full border-[10px] border-white" />
        <div className="absolute right-16 bottom-[-4rem] w-40 h-40 rounded-full border-[6px] border-white" />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        {/* Top row: brand + tier chip */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Azizah Boutique</p>
            <p className="text-xs text-white/70">Kartu Membership</p>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <Icon className="text-lg" />
            <span className="font-bold text-sm tracking-wide">{tier}</span>
          </div>
        </div>

        {/* Middle: name + points */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-white/70 mb-1">Nama Member</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">{name}</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70 mb-1">Poin Loyalti</p>
            <p className="text-2xl sm:text-3xl font-bold">{points.toLocaleString("id-ID")}</p>
          </div>
        </div>

        {/* Bottom: member since + progress to next tier */}
        <div className="flex items-center justify-between text-xs text-white/70">
          <span>Member sejak {memberSinceLabel}</span>
          {nextTier ? (
            <span>Menuju {nextTier}</span>
          ) : (
            <span>Tier tertinggi tercapai ✦</span>
          )}
        </div>

        <div>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-2 rounded-full bg-white transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {nextTier && (
            <p className="text-xs text-white/70 mt-2">
              Belanja {formatCurrency(remaining)} lagi untuk naik ke <strong>{nextTier}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
