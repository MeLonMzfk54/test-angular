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
  rules: string[] =[];

  constructor(){

  }

  ngOnChanges() {
    this.usersArray.forEach((element: any) => {
      for(let key in element){
        if(key.toLowerCase().trim() == "gender"){
          this.genders.push({[key] : element[key], checked: false, visibility: true});
        }
        if(key.toLowerCase().trim() == "department"){
          this.department.push({[key] : element[key], checked: false, visibility: true});
        }
        if(key.toLowerCase().trim() == "address"){
          this.cities.push({[key] : element[key].city, checked: false, visibility: true});
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

  changeCheck(event: any, type: string): void{
    let pivot = event.value;


    switch (type){
      case 'genders':
        for(let item of this.genders){
          item.visibility = true;
          if(item.gender != pivot){
            item.visibility = false;
          }else{
            if(item.checked == true){
              this.genders.map(item => item.visibility = true);
              break;
            }
          }
        };
        // this.genders.map(item =>{
        //   item.visibility = true;
        //   if(item.gender != pivot){
        //     item.visibility = false;
        //   }else{
        //     if(item.checked == true){
        //     this.genders.map(item => item.visibility = true);
        //     break;
        //     }
        //   }
        // });
        break;
      case 'cities':
        for(let item of this.cities){
          item.visibility = true;
          if(item.address != pivot){
            item.visibility = false;
          }else{
            if(item.checked == true){
              this.cities.map(item => item.visibility = true);
              break;
            }
          }
        };
        break;
      case 'departments':
        for(let item of this.department){
          item.visibility = true;
          if(item.department != pivot){
            item.visibility = false;
          }else{
            if(item.checked == true){
              this.department.map(item => item.visibility = true);
              break;
            }
          }
        }
        break;
      default:
        alert("Ошибка");
        break;
    }

  }

  ngOnInit(): void {

  }

}
