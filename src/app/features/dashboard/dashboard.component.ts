import { Component, ChangeDetectionStrategy } from '@angular/core';

interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}
interface ActivityItem {
  user: string;
  action: string;
  time: string;
}
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  stats: StatCard[] = [
    { label: 'Total Users', value: '2,340', change: '+12% this month', positive: true, icon: '👥' },
    { label: 'Active Sessions', value: '128', change: '+4% today', positive: true, icon: '🟢' },
    {
      label: 'Revenue',
      value: '₹4,28,000',
      change: '-3% vs last month',
      positive: false,
      icon: '💰',
    },
    {
      label: 'Open Tickets',
      value: '23',
      change: '+8 since yesterday',
      positive: false,
      icon: '🎫',
    },
  ];

  recentActivity: ActivityItem[] = [
    { user: 'Priya Sharma', action: 'Created a new user account', time: '2 min ago' },
    { user: 'Rahul Mehta', action: 'Exported analytics report', time: '15 min ago' },
    { user: 'Admin', action: 'Updated role permissions', time: '1 hr ago' },
    { user: 'Sneha Iyer', action: 'Closed 3 support tickets', time: '2 hr ago' },
    { user: 'Vikram Das', action: 'Logged in from new device', time: '3 hr ago' },
  ];
}
