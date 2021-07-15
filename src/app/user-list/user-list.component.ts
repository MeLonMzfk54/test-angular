import { Component, OnInit } from '@angular/core';
import {UserListService} from "../services/userList.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserListService]
})
export class UserListComponent implements OnInit{
  users: any[] = [];
  url: string = '../../assets/test_users.json';
  titleSet = new Set();
  titles: any[] = [];

  constructor(private userService: UserListService){ }

  ngOnInit(){
    let keys: string[];
    this.userService.get(this.url).subscribe(value =>{
      this.users = value;

      keys = Object.keys(value[0]);
      keys.forEach(k =>{
        this.titleSet.add(k);
      });

      this.titleSet.forEach( item =>{
        this.titles.push(item);
      });
      this.titles = this.titles.filter(item => item != 'id');
    },
      error =>{
          console.log(error);
      }
      );
  }
  sortByUp(arr: any, event: any): void{
   let field: string = event.id.trim().toLowerCase();
   if(field != "address"){
     arr.sort((a: any,b: any) => a[field] > b[field] ? 1 : -1);
   }else{
     arr.sort((a: any,b: any) => a[field].city > b[field].city ? 1 : -1);
   }
  }
  sortByDown(arr: any, event: any): void{
    let field: string = event.id.trim().toLowerCase();
    if(field != "address"){
      arr.sort((a: any,b: any) => a[field] < b[field] ? 1 : -1);
    }else{
      arr.sort((a: any,b: any) => a[field].city < b[field].city ? 1 : -1);
    }
  }

}
