import type { LucideIcon } from 'lucide-react';
import { Shield, Star, Swords, Target, Trophy, Zap, HeartPulse, Gauge } from 'lucide-react';

export interface Mission {
  id: string;
  title: string;
  category: 'Fitness' | 'Intel' | 'Community' | 'Endurance';
  difficulty: 'Recruit' | 'Veteran' | 'Elite';
  description: string;
  brief: string;
  reward: string;
  deadline: string;
  sponsor: string;
  proof: 'photo' | 'video';
  image: string;
}

export const missions: Mission[] = [
  {
    id: 'operation-sentinel',
    title: 'Operation Sentinel',
    category: 'Fitness',
    difficulty: 'Veteran',
    description: 'Complete a 5-mile run with a 20lb pack. Document your start and end points via photo.',
    brief: 'This mission tests your endurance and commitment. The 5-mile run must be completed in one session. The pack must be weighed before and after if requested by moderators. Upload a screenshot of your running app showing the route and time, plus a selfie at the finish line.',
    reward: 'Sentinel Badge + 250 XP',
    deadline: '2024-12-31T23:59:59Z',
    sponsor: 'Tactical Fitness Co.',
    proof: 'photo',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 'urban-recon',
    title: 'Urban Recon',
    category: 'Intel',
    difficulty: 'Recruit',
    description: 'Identify and photograph 5 specific architectural details in your city center.',
    brief: 'Your objective is to find 5 pieces of unique architecture based on provided clues. This tests your observation skills and ability to navigate urban environments. Submissions will be a collage of the 5 photos.',
    reward: 'Recon Badge + 100 XP',
    deadline: '2024-11-30T23:59:59Z',
    sponsor: 'City Explorers Guild',
    proof: 'photo',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 'community-shield',
    title: 'Community Shield',
    category: 'Community',
    difficulty: 'Recruit',
    description: 'Volunteer for 2 hours at a local charity or non-profit organization.',
    brief: 'Give back to the community. Document your volunteering activity with a photo (get permission!) and a short write-up of your experience and the organization you helped.',
    reward: 'Shield Badge + 150 XP',
    deadline: '2024-12-15T23:59:59Z',
    sponsor: 'Unity Foundation',
    proof: 'photo',
    image: 'https://placehold.co/600x400.png',
  },
  {
    id: 'the-forge',
    title: 'The Forge',
    category: 'Endurance',
    difficulty: 'Elite',
    description: 'Complete a 24-hour fitness challenge stream, hitting specific milestones every 4 hours.',
    brief: 'The ultimate test of will. This mission must be live-streamed. A list of 6 fitness milestones will be provided. You must complete one every 4 hours. Failure to complete a milestone results in mission failure.',
    reward: 'Forged Badge + 1000 XP',
    deadline: '2025-01-01T00:00:00Z',
    sponsor: 'Goliath Labs',
    proof: 'video',
    image: 'https://placehold.co/600x400.png',
  },
];


export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  wins: number;
  badges: number;
  points: number;
  org: string;
}

export const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, username: 'Ghost', avatar: '/avatars/01.png', wins: 98, badges: 22, points: 12500, org: 'Task Force 141' },
    { rank: 2, username: 'Viper', avatar: '/avatars/02.png', wins: 92, badges: 18, points: 11800, org: 'Delta Unit' },
    { rank: 3, username: 'Wolverine', avatar: '/avatars/03.png', wins: 85, badges: 25, points: 11500, org: 'The Rangers' },
    { rank: 4, username: 'Spectre', avatar: '/avatars/04.png', wins: 80, badges: 15, points: 10200, org: 'Delta Unit' },
    { rank: 5, username: 'Phoenix', avatar: '/avatars/05.png', wins: 76, badges: 20, points: 9800, org: 'Task Force 141' },
    { rank: 6, username: 'Raptor', avatar: '/avatars/06.png', wins: 70, badges: 14, points: 9100, org: 'The Rangers' },
];

export interface Badge {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
}

export const userBadges: Badge[] = [
    { id: 'b1', name: 'First Blood', description: 'Won your first 1v1 Battle.', Icon: Swords },
    { id: 'b2', name: 'Sentinel', description: 'Completed Operation Sentinel.', Icon: Shield },
    { id: 'b3', name: 'Top Gun', description: 'Finished #1 in a weekly leaderboard.', Icon: Trophy },
    { id: 'b4', name: 'Streak King', description: 'Achieved a 10-win streak.', Icon: Zap },
    { id: 'b5', name: 'Mission Specialist', description: 'Completed 25 missions.', Icon: Target },
    { id: 'b6', name: 'Elite Operator', description: 'Won a battle against an Elite-ranked player.', Icon: Star },
    { id: 'b7', name: 'Community Pillar', description: 'Completed 5 community missions.', Icon: HeartPulse },
    { id: 'b8', name: 'Max Effort', description: 'Completed an endurance mission.', Icon: Gauge },
];

export interface UserProfile {
  username: string;
  avatar: string;
  tagline: string;
  followers: number;
  following: number;
  stats: {
    wins: number;
    losses: number;
    winrate: string;
    currentStreak: number;
  };
  badges: Badge[];
  missionHistory: Mission[];
}

export const userProfileData: UserProfile = {
    username: 'Ghost',
    avatar: '/avatars/01.png',
    tagline: 'Tier 1 Operator | Fear the shadows.',
    followers: 12500,
    following: 5,
    stats: {
        wins: 98,
        losses: 12,
        winrate: '89%',
        currentStreak: 15,
    },
    badges: userBadges,
    missionHistory: missions.slice(0, 2),
}
