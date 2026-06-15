import { useState } from "react";
import { FaTrophy, FaStar, FaGift, FaCheck, FaClock, FaLock } from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import Tabs from "../components/Tabs";
import Dialog from "../components/Dialog";
import { useToast } from "../components/Toast";

export default function Quest() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("daily");
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [claimingReward, setClaimingReward] = useState(false);

  // User Stats
  const userStats = {
    level: 12,
    xp: 2850,
    xpToNext: 3500,
    totalQuests: 47,
    completedToday: 3,
    points: 15420,
  };

  // Daily Quests
  const dailyQuests = [
    {
      id: "D1",
      title: "Tambahkan 5 Produk Baru",
      description: "Upload minimal 5 produk baru ke katalog boutique",
      progress: 3,
      target: 5,
      reward: { xp: 150, points: 50 },
      status: "active",
      icon: <FaGift />,
      color: "cyan",
    },
    {
      id: "D2",
      title: "Proses 10 Pesanan",
      description: "Selesaikan proses 10 pesanan pelanggan hari ini",
      progress: 10,
      target: 10,
      reward: { xp: 200, points: 75 },
      status: "completed",
      icon: <FaCheck />,
      color: "green",
    },
    {
      id: "D3",
      title: "Update Stok Produk",
      description: "Perbarui stok minimal 15 produk di inventori",
      progress: 8,
      target: 15,
      reward: { xp: 100, points: 40 },
      status: "active",
      icon: <FaClock />,
      color: "orange",
    },
    {
      id: "D4",
      title: "Balas Chat Pelanggan",
      description: "Balas semua pesan pelanggan yang masuk hari ini",
      progress: 12,
      target: 12,
      reward: { xp: 120, points: 50 },
      status: "completed",
      icon: <FaCheck />,
      color: "green",
    },
  ];

  // Weekly Quests
  const weeklyQuests = [
    {
      id: "W1",
      title: "Master Penjualan Mingguan",
      description: "Capai target penjualan Rp 10JT dalam seminggu",
      progress: 7500000,
      target: 10000000,
      reward: { xp: 500, points: 200 },
      status: "active",
      icon: <FaTrophy />,
      color: "pink",
      timeLeft: "3 hari lagi",
    },
    {
      id: "W2",
      title: "Koleksi Baru",
      description: "Tambahkan koleksi produk baru dengan minimal 20 item",
      progress: 14,
      target: 20,
      reward: { xp: 400, points: 150 },
      status: "active",
      icon: <FaStar />,
      color: "purple",
      timeLeft: "5 hari lagi",
    },
    {
      id: "W3",
      title: "Customer Satisfaction",
      description: "Dapatkan 25 review positif dari pelanggan",
      progress: 18,
      target: 25,
      reward: { xp: 350, points: 120 },
      status: "active",
      icon: <FaStar />,
      color: "orange",
      timeLeft: "4 hari lagi",
    },
  ];

  // Monthly Quests
  const monthlyQuests = [
    {
      id: "M1",
      title: "Fashion Master",
      description: "Jual 100 produk dalam sebulan dengan rating 4.5+",
      progress: 67,
      target: 100,
      reward: { xp: 1000, points: 500 },
      status: "active",
      icon: <FaTrophy />,
      color: "cyan",
      timeLeft: "12 hari lagi",
    },
    {
      id: "M2",
      title: "Boutique Legend",
      description: "Raih pendapatan Rp 50JT dalam sebulan",
      progress: 32000000,
      target: 50000000,
      reward: { xp: 1500, points: 750 },
      status: "active",
      icon: <FaTrophy />,
      color: "pink",
      timeLeft: "15 hari lagi",
    },
    {
      id: "M3",
      title: "Social Butterfly",
      description: "Dapatkan 50 pelanggan baru melalui referral",
      progress: 0,
      target: 50,
      reward: { xp: 800, points: 400 },
      status: "locked",
      icon: <FaLock />,
      color: "gray",
      timeLeft: "Unlock di Level 15",
    },
  ];

  const tabs = [
    { key: "daily", label: "Daily Quest", badge: dailyQuests.filter(q => q.status === "active").length },
    { key: "weekly", label: "Weekly Quest", badge: weeklyQuests.length },
    { key: "monthly", label: "Monthly Quest", badge: monthlyQuests.length },
  ];

  const getQuestsByTab = () => {
    switch (activeTab) {
      case "daily": return dailyQuests;
      case "weekly": return weeklyQuests;
      case "monthly": return monthlyQuests;
      default: return dailyQuests;
    }
  };

  const handleClaimReward = () => {
    setClaimingReward(true);
    setTimeout(() => {
      setClaimingReward(false);
      setSelectedQuest(null);
      addToast({
        title: "Reward Claimed!",
        description: `Kamu mendapat ${selectedQuest.reward.xp} XP dan ${selectedQuest.reward.points} Points!`,
        variant: "success",
      });
    }, 1000);
  };

  const formatProgress = (progress, target) => {
    if (progress >= 1000000) {
      return `Rp ${(progress / 1000000).toFixed(1)}JT / Rp ${(target / 1000000).toFixed(0)}JT`;
    }
    return `${progress} / ${target}`;
  };

  return (
    <div className="p-6 bg-[#f8f9fb] min-h-screen">
      <PageHeader title="Quest & Rewards" breadcrumb={["Dashboard", "Quest"]}>
        <Button icon={<FaTrophy />}>Leaderboard</Button>
      </PageHeader>

      {/* USER STATS */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <Card
          title="Level"
          value={userStats.level}
          icon={<FaTrophy />}
          iconColor="cyan"
          footer={
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>XP Progress</span>
                <span>{userStats.xp} / {userStats.xpToNext}</span>
              </div>
              <ProgressBar value={(userStats.xp / userStats.xpToNext) * 100} color="cyan" size="sm" />
            </div>
          }
        />

        <Card
          title="Total Points"
          value={userStats.points.toLocaleString()}
          trend="+320"
          icon={<FaStar />}
          iconColor="pink"
        />

        <Card
          title="Completed Today"
          value={`${userStats.completedToday} / 4`}
          icon={<FaCheck />}
          iconColor="green"
        />

        <Card
          title="Total Quests"
          value={userStats.totalQuests}
          trend="+12%"
          icon={<FaGift />}
          iconColor="orange"
        />
      </div>

      {/* FEATURED QUEST BANNER */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-8 mb-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[size:30px_30px]"></div>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1">
            <Badge variant="white" className="mb-3">🔥 Featured Quest</Badge>
            <h2 className="text-3xl font-bold mb-2">Boutique Champion Challenge</h2>
            <p className="text-white/90 mb-4 max-w-2xl">
              Selesaikan semua daily quest selama 7 hari berturut-turut untuk mendapatkan 
              <span className="font-bold"> bonus 1000 XP + Badge Eksklusif!</span>
            </p>
            <div className="flex gap-4 items-center">
              <ProgressBar value={42} color="white" size="md" className="flex-1 max-w-md" />
              <span className="font-bold">3/7 Hari</span>
            </div>
          </div>
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
            <FaTrophy className="text-6xl" />
          </div>
        </div>
      </div>

      {/* QUESTS TABS */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-6" />

        {/* QUEST LIST */}
        <div className="space-y-4">
          {getQuestsByTab().map((quest) => {
            const progressPercent = (quest.progress / quest.target) * 100;
            const isCompleted = quest.status === "completed";
            const isLocked = quest.status === "locked";

            return (
              <div
                key={quest.id}
                className={`bg-gray-50 rounded-xl p-5 border-2 ${
                  isCompleted
                    ? "border-green-300 bg-green-50"
                    : isLocked
                    ? "border-gray-200 opacity-60"
                    : "border-transparent hover:border-cyan-200"
                } transition-all`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${
                      isCompleted
                        ? "bg-green-500"
                        : isLocked
                        ? "bg-gray-400"
                        : `bg-gradient-to-br from-${quest.color}-400 to-${quest.color}-500`
                    } text-white flex items-center justify-center text-2xl shrink-0`}
                  >
                    {quest.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{quest.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{quest.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={isCompleted ? "green" : isLocked ? "gray" : "cyan"}>
                          {isCompleted ? "Completed" : isLocked ? "Locked" : "Active"}
                        </Badge>
                        {quest.timeLeft && (
                          <p className="text-xs text-gray-400 mt-1">{quest.timeLeft}</p>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {!isLocked && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span className="font-semibold">{formatProgress(quest.progress, quest.target)}</span>
                        </div>
                        <ProgressBar
                          value={progressPercent}
                          color={isCompleted ? "green" : quest.color}
                          size="md"
                        />
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm">
                        <span className="text-cyan-600 font-semibold">
                          ⚡ {quest.reward.xp} XP
                        </span>
                        <span className="text-pink-600 font-semibold">
                          ⭐ {quest.reward.points} Points
                        </span>
                      </div>
                      {isCompleted && (
                        <Button
                          size="sm"
                          variant="success"
                          icon={<FaGift />}
                          onClick={() => setSelectedQuest(quest)}
                        >
                          Claim Reward
                        </Button>
                      )}
                      {isLocked && (
                        <Button size="sm" variant="secondary" disabled icon={<FaLock />}>
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CLAIM REWARD DIALOG */}
      <Dialog
        isOpen={!!selectedQuest}
        onClose={() => setSelectedQuest(null)}
        title="🎉 Claim Your Reward!"
        description={selectedQuest?.title}
      >
        {selectedQuest && (
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
              🏆
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Quest Completed!</h3>
            <p className="text-gray-600 mb-6">{selectedQuest.description}</p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-500 mb-3">Your Rewards:</p>
              <div className="flex gap-4 justify-center">
                <div className="bg-cyan-100 rounded-lg px-6 py-3">
                  <p className="text-2xl font-bold text-cyan-600">+{selectedQuest.reward.xp}</p>
                  <p className="text-xs text-gray-600">XP</p>
                </div>
                <div className="bg-pink-100 rounded-lg px-6 py-3">
                  <p className="text-2xl font-bold text-pink-600">+{selectedQuest.reward.points}</p>
                  <p className="text-xs text-gray-600">Points</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleClaimReward}
              loading={claimingReward}
              icon={<FaGift />}
              className="w-full"
            >
              {claimingReward ? "Claiming..." : "Claim Reward"}
            </Button>
          </div>
        )}
      </Dialog>
    </div>
  );
}
