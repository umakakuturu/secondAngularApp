<nav *ngIf="requiredDataLoaded">
  <ul id="planChoice" class="lob_wrap col-xs-12 col-sm-3 hidd_sm nill">
    <div class="plan" *ngFor="let plan of sidebarPlans">
      <li class="lob ellipsis">
        <b class="arrowInd hide">&gt; &nbsp;</b>
        <a class="nav-link-plan-name"
           [routerLink]="['/MyCoverage', plan?.memberships[0]?.attributes?.id]"
           [innerHtml]="plan?.groupName"
           (click)="expandContainer($event)"></a>
      </li>
      <li class="sub_lob" *ngFor="let membership of plan?.memberships">
        <ng-container *ngIf="!membership?.isSpendingAccount">
          <b class="arrowInd hide">&gt; &nbsp;</b>
          <a id="{{membership?.attributes?.id}}"
             [attr.aria-label]="membership?.attributes?.coverageTypeDescription === i18nCoverage.messages.text_bcc_coverage ?
             i18nCoverage.messages.link_bcc_coverage_arialabel : null"
             [attr.data-analytics]="membership?.attributes?.coverageTypeDescription === i18nCoverage.messages.text_bcc_coverage ?
             i18nCoverage.messages.link_bcc_coverage_dataanalytics : null"
             [routerLink]="['/MyCoverage', membership?.attributes?.id, membership?.attributes?.coverageType | lowercase]"
             (click)="onClick($event)">
            {{membership?.attributes?.coverageTypeDescription}}
          </a>
        </ng-container>
        <ng-container *ngIf="membership?.isSpendingAccount">
          <b class="arrowInd hide">&gt; &nbsp;</b>
          <a id="{{membership?.attributes?.id}} {{coverageView.spendingAccounts}}"
             [routerLink]="['/MyCoverage', membership?.attributes?.id, coverageView.spendingAccounts]"
             (click)="onClick($event)">
            {{i18nCoverage.messages.text_spending_accounts}}
          </a>
        </ng-container>
      </li>
    </div>
  </ul>
</nav>
