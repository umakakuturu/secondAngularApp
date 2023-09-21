<!-- Updated HTML with unique IDs for medical links -->
<nav *ngIf="requiredDataLoaded">
    <ul id="planChoice" class="lob_wrap col-xs-12 col-sm-3 hidd_sm nill">
        <div class="plan" *ngFor="let plan of sidebarPlans; let planIndex = index">   
            <li class="lob ellipsis" *ngIf="sidebarPlans?.length > 1">
                <b class="arrowInd hide">&gt;&nbsp;</b>
                <a class="nav-link-plan-name"
                    [routerLink]="['/MyCoverage', plan?.attributes?.id]"
                    [innerHtml]="plan?.groupName"
                    (click)="togglePlan(planIndex)"></a>
            </li> 
            <li class="sub_lob" *ngFor="let membership of plan?.memberships; let membershipIndex = index">
                <ng-container *ngIf="!membership?.isSpendingAccount">
                    <b class="arrowInd hide">&gt;&nbsp;</b>
                    <!-- Update the ID attribute for the medical link -->
                    <a id="{{planIndex}}-{{membershipIndex}}-medical"
                        [attr.aria-label]="membership?.attributes?.coverageTypeDescription === i18nCoverage.messages.text_bcc_coverage ? i18nCoverage.messages.link_bcc_coverage_arialabel : null"
                        [attr.data-analytics]="membership?.attributes?.coverageTypeDescription === i18nCoverage.messages.text_bcc_coverage ? i18nCoverage.messages.link_bcc_coverage_dataanalytics : null"
                        [routerLink]="['/MyCoverage', plan?.attributes?.id, membership?.attributes?.id, 'medical']"
                        (click)="toggleTab(planIndex, membershipIndex, 'medical')">Medical</a>
                </ng-container>
                <ng-container *ngIf="membership?.isSpendingAccount">
                    <b class="arrowInd hide">&gt;&nbsp;</b>
                    <!-- Update the ID attribute for the spending accounts link -->
                    <a id="{{planIndex}}-{{membershipIndex}}-spending-accounts"
                        [routerLink]="['/MyCoverage', plan?.attributes?.id, membership?.attributes?.id, 'spendingaccounts']"
                        (click)="toggleTab(planIndex, membershipIndex, 'spendingaccounts')">Spending Accounts</a>
                </ng-container>
            </li>
        </div>
    </ul>
</nav>
