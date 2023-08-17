import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BehavioralService {

  
  private mockFilters = [
    { id: 1, name: 'Improving Relationships'},
    { id: 2, name: 'family planning' },
    { id: 3, name: 'in-person appointments' },
    { id: 4, name: 'personal development' },
  ];

  private mockBehavioralResources = [
    { id: 1, name: 'Live and Work Well', filters: [1,2] },
    { id: 2, name: 'Find a Doctor', filters: [2,4] },
    { id: 3, name: 'Virtual Care with Teladoc', filters: [3] },
    { id: 4, name: 'Online Doctor', filters: [4,3] },
  ];


  getMockBehavioralResources() {
    return this.mockBehavioralResources;
  }

  getFilters(){
    return this.mockFilters;
  }
}
