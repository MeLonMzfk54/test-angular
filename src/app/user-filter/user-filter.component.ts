import{ Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit{
  @Input() usersArray: any;
  @Input() titlesArray: string[] = [];
  genders: any[] = [];
  cities: any[] = [];
  department: any[] = [];
  genderCheck: boolean = false;


  constructor(){

  }

  ngOnChanges() {
    this.usersArray.forEach((element: any) => {
      for(let key in element){
        let pivot = key;
        if(key.toLowerCase().trim() == "gender"){
          this.genders.push({[pivot] : element[key], checked: false});
        }
        if(key.toLowerCase().trim() == "department"){
          this.department.push({[pivot] : element[key], checked: false});
        }
        if(key.toLowerCase().trim() == "address"){
          this.cities.push({[pivot] : element[key].city, checked: false});
        }
      }
    });


    this.genders = this.genders.filter((item, index, array) => {
      return array.map((mapItem) => mapItem['gender']).indexOf(item['gender']) === index
    })

    this.cities = this.cities.filter((item, index, array) => {
      return array.map((mapItem) => mapItem['address']).indexOf(item['address']) === index
    })

    this.department = this.department.filter((item, index, array) => {
      return array.map((mapItem) => mapItem['department']).indexOf(item['department']) === index
    })
  }

  ngOnInit(): void {

  }

}
