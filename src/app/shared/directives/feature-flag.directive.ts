import { Directive, inject, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { FeatureFlagService, FeatureFlag } from '../../core/services/feature-flag.service';

@Directive({
  selector: '[appFeatureFlag]',
})
export class FeatureFlagDirective {
  private featureFlagService = inject(FeatureFlagService);
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<unknown>);

  private flagName!: FeatureFlag;

  constructor() {
    effect(() => {
      const isEnabled = this.featureFlagService.isEnabled(this.flagName)();
      this.viewContainer.clear();
      if (isEnabled) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  @Input() set featureFlag(flag: FeatureFlag) {
    this.flagName = flag;
  }
}
