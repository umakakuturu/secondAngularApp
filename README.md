css


ul.lob_wrap { 
  list-style-type: none; 
  margin-top: 25px;
}

.lob { 
  padding: 10px;
  margin-right: 20px;
  border: solid 1px #e7cd73;
  background: #fdffd9;
  font-weight: bold;
  float: left;
  width: 95%;
}

.lob_bott { 
  padding: 10px;
  margin-right: 20px;
  margin-top: 10px;
  border: solid 1px #e7cd73;
  background: #fdffd9;
  font-weight: bold;
  float: left; width: 95%;
}

.sub_lob {
  border-top: solid 1px #dddddd;
  font-weight: bold;
  padding: 10px 10px 10px 20px;
  float: left;
  width: 95%;
}

.sub_lob_main {
  font-weight: bold;
  float: left;
  width: 95%;
}

/*.lob_wrap li:nth-child(2) { border-top: 0; }*/

.sub_lob_bott {
  border-top: solid 1px #dddddd;
  border-bottom: solid 1px #dddddd;
  font-weight: bold;
  float: left;
  padding: 10px;
  margin-bottom: 10px;
  padding-left: 20px;
  /*width: 95%;*/
}

li.active > a {
  color: #000000;
  font-weight: bold;
}

li.active > .arrowInd {
  display: inline-block !important;
}

html
<nav *ngIf="requiredDataLoaded">
    <ul id="planChoice" class="lob_wrap col-xs-12 col-sm-3 hidd_sm nill">
      <div class="plan" *ngFor="let plan of sidebarPlans">   
        <li class="lob ellipsis" *ngIf="sidebarPlans?.length>1" >
            <b class="arrowInd hide">&gt;&nbsp;</b><a class="nav-link-plan-name" [routerLink]="['/MyCoverage', plan?.memberships[0]?.attributes?.id]" [innerHtml]="plan?.groupName" (click)="expandContainer($event)"></a>
        </li> 
        <li class="sub_lob" *ngFor="let membership of plan?.memberships">
          <ng-container *ngIf="!membership?.isSpendingAccount">
            <b class="arrowInd hide">&gt;&nbsp;</b>
            <a id="{{membership?.attributes?.id}}"
              [attr.aria-label]="membership?.attributes?.coverageTypeDescription === i18nCoverage.messages.text_bcc_coverage ? i18nCoverage.messages.link_bcc_coverage_arialabel : null"
              [attr.data-analytics]="membership?.attributes?.coverageTypeDescription === i18nCoverage.messages.text_bcc_coverage ? i18nCoverage.messages.link_bcc_coverage_dataanalytics : null"
              [routerLink]="['/MyCoverage', membership?.attributes?.id, membership?.attributes?.coverageType | lowercase]"
              (click)="onClick($event)">{{membership?.attributes?.coverageTypeDescription}}
            </a>
          </ng-container>
          <ng-container *ngIf="membership?.isSpendingAccount">
            <b class="arrowInd hide">&gt;&nbsp;</b><a id="{{membership?.attributes?.id}}{{coverageView.spendingAccounts}}" [routerLink]="['/MyCoverage', membership?.attributes?.id, coverageView.spendingAccounts]" (click)="onClick($event)">{{i18nCoverage.messages.text_spending_accounts}}</a>
          </ng-container>
        </li>
      </div>
    </ul>
</nav>
ts
import { Component, ElementRef, Input } from '@angular/core';
import { MembershipGroups } from './../../shared/data/util/membershipgroups';
import * as _ from 'lodash';

@Component({
    selector: 'leftnav',
    templateUrl: 'leftnav.html'
})
export class Leftnav {
    @Input() plans: any;
    @Input() currentId: any;
    @Input() currentView: any;
    @Input() showSpendingAccounts: any;
    @Input() coverageMemberships: any;
    @Input() i18nCoverage: any;
    private sidebarPlans: any;
    @Input() requiredDataLoaded: Boolean = false;
    private coverageView = {
        overview: "overview",
        whatsCovered: "whatscovered",
        planDocuments: "plandocments",
        visitSummary: "visitsummary",
        prescription: "prescription",
        spendingAccounts: "spendingaccounts",
    };

    constructor(private membershipGroups: MembershipGroups, private _elementRef : ElementRef) {

    }

    ngOnInit() {
        let self = this;
        this.sidebarPlans = _.cloneDeep(this.plans);
        this.sidebarPlans = _.filter(this.sidebarPlans, function (plan: any) {
            if (plan.memberships) {
                if (plan.memberships.length > 1) {
                    plan.memberships = _.filter(plan.memberships, function (membership: any) {
                        if (membership 
                            && (membership.coverageType || membership.has("coverageType"))
                            && self.isRxCarveOutAndDisplayable(membership)) {
                            return true;
                        }
                        return false;
                    });
                    return true;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        });
        this.futureActivePlansCheck();
        this.updatePlans();
        this.requiredDataLoaded = true;
    }

    private isRxCarveOutAndDisplayable(membership: any) {
        return membership
                && (_.isEmpty(membership.attributes.rxCarveOutGroupName) 
                    || (!_.isEmpty(membership.attributes.rxCarveOutGroupName) && membership.attributes.displayRxCarveOutPage));
    }

    public futureActivePlansCheck() {
        let hasActivePlans: boolean = this.membershipGroups.activePlansCheck(this.sidebarPlans);
        _.each(!hasActivePlans && this.sidebarPlans, (plan) => {
            let futureActiveMem = this.membershipGroups.isFutureActivePlan(plan.memberships);
            if (futureActiveMem) {
                futureActiveMem['attributes']["coverageTypeDescription"] = this.i18nCoverage.messages.text_future_active_plan;
                plan.memberships = [futureActiveMem];
            }
        });
    }

    private updatePlans() {
        let self = this;
        _.each(self.sidebarPlans, function (plan) {
            plan.memberships = self.membershipGroups.removeMembershipsWithoutCoverageType(plan.memberships);
            plan.memberships = self.detectBCC(plan.memberships);
        });
    }

    private detectBCC(memplans) {
        const self = this;
        var bccMem = _.find(memplans, function (mem: any) {
            return mem.isBCC();
        });
        if (bccMem) {
            bccMem.set({ "coverageTypeDescription": this.i18nCoverage.messages.text_bcc_coverage });
        }
        return _.filter(memplans, function (mem: any) {
            return !mem.isBCC() || (mem.isBCC() && mem.get("coverageTypeDescription") === self.i18nCoverage.messages.text_bcc_coverage);
        });
    }

    ngAfterViewInit() {
        if (this.sidebarPlans.length > 1) {
            if(this._elementRef.nativeElement.getElementsByClassName('sub_lob')){
                this._elementRef.nativeElement.getElementsByClassName('sub_lob')[0].style.display='none';
            }
        }
        let planElements = document.querySelectorAll('.plan');
        if(planElements && planElements.length > 0) {
            let lastElement = planElements[0].children[planElements[0].children.length - 1];
            lastElement?.classList.add('sub_lob_bott');
        }
        this.renderLeftNav();
        let navLink = document.querySelectorAll('.nav-link-plan-name');
        if(navLink && navLink.length > 0) {
            navLink.forEach((e)=>{
                e.setAttribute("title", e.textContent);
            });
        }
    }

    ngOnChanges() {
        this.renderLeftNav();
        this.requiredDataLoaded = true;
    }

    renderLeftNav() {
        var self = this;

        let lobWrapElement = this._elementRef.nativeElement.querySelector('.lob_wrap');
        if (lobWrapElement) {
            let lowWrapSubChildren = lobWrapElement.querySelectorAll('li.sub_lob.active');
            for (let i = 0; i < lowWrapSubChildren.length; i++) {
                lowWrapSubChildren[i].classList.remove('active');
            }
            let lowWrapChildren = lobWrapElement.querySelectorAll('li.lob.active');
            for (let i = 0; i < lowWrapChildren.length; i++) {
                let siblings =  lowWrapChildren[i].children;
                if (siblings) {
                    siblings.forEach((sibling) => {
                        if (sibling !== lobWrapElement) {
                            let sElement = sibling.querySelector('.sub_lob');
                            if (sElement) {
                                sElement.style.display = 'none';
                            }
                        }
                    })
                }
                lowWrapChildren[i].classList.remove('active');
            }
            let lobWrapLiSubElements = lobWrapElement.querySelectorAll('li.sub_lob a');
            if (lobWrapLiSubElements) {
                lobWrapLiSubElements.forEach((element) => {
                    if (!self.showSpendingAccounts) {
                        if (element.getAttribute('id') == self.currentId) {
                            element.parentNode.classList.add('active');
                            element.parentNode.style.display = "block";
                            for (let child of element.parentNode.children) {
                                let elementSub = child.querySelectorAll('.sub_lob');
                                if (elementSub && elementSub.length > 0) {
                                    elementSub.forEach((e) => {
                                        e.style.display = "block";
                                    });
                                }
                                let elementLi = child.querySelectorAll('li.lob');
                                if (elementLi && elementLi.length > 0) {
                                    elementLi.forEach((e) => {
                                        e.style.display = "block";
                                    });
                                }
                            }
                            return false;
                        }
                    } else {
                        if (element.getAttribute('id') == self.currentId + self.currentView) {
                            element.parentNode.classList.add('active');
                            element.parentNode.style.display = "block";
                            for (let child of element.parentNode.children) {
                                let elementSub = child.querySelectorAll('.sub_lob');
                                if (elementSub && elementSub.length > 0) {
                                    elementSub.forEach((e) => {
                                        e.style.display = "block";
                                    });
                                }
                                let elementLi = child.querySelectorAll('li.lob');
                                if (elementLi && elementLi.length > 0) {
                                    elementLi.forEach((e) => {
                                        e.style.display = "block";
                                    });
                                }
                            }
                            return false;
                        }
                    }
                });
            }
        }
        this.requiredDataLoaded = true;
    }

    expandContainer(event) {
        var target = event.currentTarget;

        let lobWrapElement = this._elementRef.nativeElement.querySelector('.lob_wrap');
        if (lobWrapElement) {
            let lowWrapChildren = lobWrapElement.querySelectorAll('li.lob.active');
            for (let i = 0; i < lowWrapChildren.length; i++) {
                lowWrapChildren[i].classList.remove('active');
            }
            let lowWrapSubChildren = lobWrapElement.querySelectorAll('li.sub_lob.active');
            for (let i = 0; i < lowWrapSubChildren.length; i++) {
                lowWrapSubChildren[i].classList.remove('active');
            }
        }

        let targetElement = this._elementRef.nativeElement.querySelector(target);
        if (targetElement) {
            let planElement = targetElement.closest('.plan');
            let children = planElement.parentNode.children;
            children.forEach((sibling) => {
                if (sibling !== planElement) {
                    let sElement = sibling.querySelector('.sub_lob');
                    if (sElement) {
                        sElement.style.display = 'none';
                    }
                }
            })
            let targetElementChildren = targetElement.parentNode.children;
            targetElementChildren.forEach((c) => {
                if (c !== targetElement && c.classList.contains('sub_lob')) {
                    c.style.display = 'none';
                    c.style.maxHeight = 'none';
                    c.style.transition = 'max-height 0.5s ease-out';
                    c.style.overflow = 'hidden';
                    c.style.display = 'block';
                    c.style.maxHeight = c.scrollHeight + 'px';
                }
            });
            targetElement.parentNode.classList.add('active');
        }
    }

    onClick(event) {
        var target = event.currentTarget;
        let lobWrapElement = document.querySelector('.lob_wrap');
        if (lobWrapElement) {
            let lowWrapChildren = lobWrapElement.querySelectorAll('li.sub_lob.active');
            for (let i = 0; i < lowWrapChildren.length; i++) {
                lowWrapChildren[i].classList.remove('active');
            }
        }
        if (target) {
            target.parentNode.classList.add('active');
        }
    }
}
