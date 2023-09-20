# secondAngularApp

expandContainer(event) {
  const target = event.currentTarget;
  const planElement = target.closest('.plan');

  if (!planElement) {
    return; // Exit early if there's no plan element
  }

  // Get the lobWrapElement
  const lobWrapElement = this._elementRef.nativeElement.querySelector('.lob_wrap');

  if (!lobWrapElement) {
    return; // Exit early if there's no lobWrapElement
  }

  // Remove 'active' class from all lob and sub_lob elements
  const allLobElements = lobWrapElement.querySelectorAll('li.lob.active');
  allLobElements.forEach((lob) => {
    lob.classList.remove('active');
  });

  const allSubLobElements = lobWrapElement.querySelectorAll('li.sub_lob.active');
  allSubLobElements.forEach((subLob) => {
    subLob.classList.remove('active');
  });

  // Show/hide sub_lob elements within the clicked plan
  const subElements = planElement.querySelectorAll('.sub_lob');
  subElements.forEach((subElement) => {
    subElement.style.display = subElement.classList.contains('active') ? 'none' : 'block';
    subElement.classList.toggle('active');
  });

  // Add 'active' class to the clicked plan
  planElement.classList.add('active');
}


#onclick
onClick(event) {
  const target = event.currentTarget;
  const planElement = target.closest('.plan');

  if (planElement) {
    // Add the 'active' class to the clicked plan
    planElement.classList.add('active');
  }
}

#html
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
