import{ Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import RulesObject from "../Interfaces/RulesObject";
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
  rules: RulesObject = {
    gender: '',
    address: '',
    department: ''
  };
  resultArray: object[] = [];
  // counters = {
  //   female: 0,
  //   male: 0,
  //   Moscow: 0,
  //   'New-York': 0,
  //   Voronezh: 0,
  //   Spb: 0,
  //   Backend: 0,
  //   Hr: 0,
  //   Fronted: 0,
  // };

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
    let self = this;

    switch (type){
      case 'genders':
        for(let item of this.genders){
          item.visibility = true;
          if(item.gender != pivot){
            item.visibility = false;
          }else{
            this.rules.gender = item.gender;
            if(item.checked == true){
              this.genders.map(item => item.visibility = true);
              this.rules.gender = "";
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
            this.rules.address = item.address;
            if(item.checked == true){
              this.cities.map(item => item.visibility = true);
              this.rules.address = "";
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
            this.rules.department = item.department;
            if(item.checked == true){
              this.department.map(item => item.visibility = true);
              this.rules.department = "";
              break;
            }
          }
        }
        break;
      default:
        alert("Ошибка");
        break;
    }
    //Изменение массива

    // self.rules.forEach((i: any) =>{
    //   this.resultArray = this.usersArray.filter((item:any) =>  item.department == i.department);
    // });
    // if(!this.resultArray[0]){
    //   this.resultArray = this.usersArray;
    // }


    let key: any;
    let count: number = 0;
    this.resultArray = [];
    for( key in this.rules){
      if(this.rules[key]){
        if(!this.resultArray[0]){
          this.resultArray = this.usersArray.filter((item: any) => item[key] == this.rules[key] || item[key].city == this.rules[key]);
        }else{
          this.resultArray = this.resultArray.filter((item: any) => item[key] == this.rules[key] || item[key].city == this.rules[key]);
        }
      }else{
        count++;
      }
    }
    if(count >= 3){
      // Отдаём наверх изначальный массив
    }

    // this.resultArray = this.usersArray.filter((a: any) => this.rules.some((b: any) => b.gender = a.gender));
  }

  ngOnInit(): void {

  }

}
