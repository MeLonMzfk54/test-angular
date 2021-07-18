import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import RulesObject from "../Interfaces/RulesObject";
import {UserListService} from "../services/userList.service";
@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
  providers: [UserListService]
})
export class UserFilterComponent implements OnInit{
  @Output() bubbleArray = new EventEmitter<any>();

  genders: any[] = [];
  cities: any[] = [];
  department: any[] = [];

  url: string = '../../assets/test_users.json';

  rules: RulesObject = {
    gender: '',
    address: '',
    department: ''
  };
   resultArray: object[] = [];


  constructor(private userService: UserListService){

  }

  ngOnInit(): void {
    this.userService.get(this.url).subscribe(value =>{
      this.resultArray = value;
    });
    setInterval(() =>{
      this.resultArray.forEach((element: any) => {
        for(let key in element){
          if(key.toLowerCase().trim() == "gender"){
            this.genders.push({[key] : element[key], checked: false, visibility: true, counter: 0});
          }
          if(key.toLowerCase().trim() == "department"){
            this.department.push({[key] : element[key], checked: false, visibility: true, counter: 0});
          }
          if(key.toLowerCase().trim() == "address"){
            this.cities.push({[key] : element[key].city, checked: false, visibility: true, counter: 0});
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
    },0)

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
            this.rules.gender = item.gender;
            if(item.checked == true){
              this.genders.map(item => item.visibility = true);
              this.rules.gender = "";
              break;
            }
          }
        };
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
    let key: any;
    this.userService.get(this.url).subscribe(value =>{
      this.resultArray = value;
    });
    for( key in this.rules){
      if(this.rules[key]){
        this.resultArray = this.resultArray.filter((item: any) => item[key].city == this.rules[key] || item[key] == this.rules[key]);
      }
    }
    this.bubbleArray.emit(this.resultArray);
    this.calculateCounts(this.resultArray);
  }

  calculateCounts(array: any){
    this.genders.forEach((item: any) =>{
      item.counter = 0;
    });
    this.cities.forEach((item: any) =>{
      item.counter = 0;
    });
    this.department.forEach((item: any) =>{
      item.counter = 0;
    });
    this.resultArray.forEach((item: any) => {
      this.genders.forEach((i: any) =>{
        if(i.gender == item.gender){
          i.counter++;
        }
      });

      this.cities.forEach((i: any) =>{
        if(i.address == item.address.city){
          i.counter++;
        }
      });

      this.department.forEach((i: any) =>{
        if(i.department == item.department){
          i.counter++;
        }
      });
    });
  }

}
