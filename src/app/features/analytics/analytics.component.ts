import { Component, ChangeDetectionStrategy } from '@angular/core';

interface MonthlyRevenue {
  month: string;
  value: number;
}

interface RoleDistribution {
  role: string;
  count: number;
  percentage: number;
  color: string;
}

interface WeeklyActive {
  day: string;
  value: number;
}

@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent {
  readonly maxRevenue = 520000;

  monthlyRevenue: MonthlyRevenue[] = [
    { month: 'Jan', value: 320000 },
    { month: 'Feb', value: 410000 },
    { month: 'Mar', value: 380000 },
    { month: 'Apr', value: 490000 },
    { month: 'May', value: 430000 },
    { month: 'Jun', value: 520000 },
    { month: 'Jul', value: 460000 },
    { month: 'Aug', value: 395000 },
  ];

  roleDistribution: RoleDistribution[] = [
    { role: 'Admin', count: 3, percentage: 15, color: '#6366f1' },
    { role: 'Manager', count: 5, percentage: 25, color: '#f59e0b' },
    { role: 'Viewer', count: 12, percentage: 60, color: '#64748b' },
  ];

  weeklyActive: WeeklyActive[] = [
    { day: 'Mon', value: 40 },
    { day: 'Tue', value: 65 },
    { day: 'Wed', value: 55 },
    { day: 'Thu', value: 80 },
    { day: 'Fri', value: 72 },
    { day: 'Sat', value: 30 },
    { day: 'Sun', value: 20 },
  ];

  readonly maxWeekly = 80;

  getBarHeight(value: number): string {
    return `${(value / this.maxRevenue) * 100}%`;
  }

  getLinePoints(): string {
    const width = 540;
    const height = 120;
    const points = this.weeklyActive.map((d, i) => {
      const x = (i / (this.weeklyActive.length - 1)) * width;
      const y = height - (d.value / this.maxWeekly) * height;
      return `${x},${y}`;
    });
    return points.join(' ');
  }

  formatRevenue(value: number): string {
    return `₹${(value / 1000).toFixed(0)}k`;
  }
}
