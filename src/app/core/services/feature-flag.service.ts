import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';

export type FeatureFlag = keyof typeof environment.featureFlags;

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private flags = signal<Record<string, boolean>>({ ...environment.featureFlags });

  isEnabled(flag: FeatureFlag) {
    return computed(() => this.flags()[flag]);
  }

  enable(flag: FeatureFlag) {
    this.flags.update((current) => ({ ...current, [flag]: true }));
  }

  disable(flag: FeatureFlag) {
    this.flags.update((current) => ({ ...current, [flag]: false }));
  }

  toggle(flag: FeatureFlag) {
    this.flags.update((current) => ({ ...current, [flag]: !current[flag] }));
  }
}
