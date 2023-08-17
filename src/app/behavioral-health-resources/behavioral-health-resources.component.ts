import { Component } from '@angular/core';
import { BehavioralService } from '../behavioral.health.resource.mock';

interface Filter {
  id: number;
  name: string;
}

interface BehavioralResource {
  id: number;
  name: string;
  filters: number[];
}

@Component({
  selector: 'app-behavioral-health-resources',
  templateUrl: './behavioral-health-resources.component.html',
  styleUrls: ['./behavioral-health-resources.component.css']
})
export class BehavioralHealthResourcesComponent {
  behavioralResource: BehavioralResource[] = [];
  filters: Filter[] = [];
  selectedFilters: number[] = [];

  constructor(private behavioralService: BehavioralService) {}

  ngOnInit(): void {
    this.behavioralResource = this.behavioralService.getMockBehavioralResources();
    this.filters = this.behavioralService.getFilters();
  }

  filterBehavioralResources(filterId: number, event: any): void {
    const isChecked = event.target.checked; // Extract the checked property from the event
    if (isChecked) {
      this.selectedFilters.push(filterId);
    } else {
      const index = this.selectedFilters.indexOf(filterId);
      if (index !== -1) {
        this.selectedFilters.splice(index, 1);
      }
    }
  }
  

  behavioralResourceMatchesSelectedFilters(behavioralResource: BehavioralResource): boolean {
    if (this.selectedFilters.length === 0) {
      return true;
    }

    return behavioralResource.filters.some(filterId => this.selectedFilters.includes(filterId));
  }
}
