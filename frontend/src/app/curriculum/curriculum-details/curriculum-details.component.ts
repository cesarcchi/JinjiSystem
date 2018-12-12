import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadcastService } from 'src/app/broadcast.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { Subscription, Observable } from 'rxjs';
import { Employee, Curriculum } from 'src/app/interfaces/employee';
import { CurriculumService } from '../curriculum.service';

@Component({
  selector: 'app-curriculum-details',
  templateUrl: './curriculum-details.component.html',
  styleUrls: ['./curriculum-details.component.css']
})
export class CurriculumDetailsComponent implements OnInit {

  //global vars
  sub: Subscription //just for unsub after leaving the screen...
  loggedUser$: Observable<Employee>
  profileSelected$: Observable<Employee>
  admin$: boolean
  shainid: string
  user: Employee

  constructor(private _profileService: ProfileService,
              private _broadcastService: BroadcastService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _curriculumService: CurriculumService) { }

  ngOnInit() {
    this.sub = this._route.parent.parent.url.subscribe( url => {
      if (url[0].path === 'admin'){ //if you're navigating from /admin/ path        
        this.shainid = this._route.snapshot.paramMap.get('id')
        this.admin$ = true        
        this.profileSelected$ = this._profileService.getUserProfile(this.shainid)
        this.profileSelected$.subscribe(data =>{
          this.user = data
        })
      } else { //any another route that casts /profile/
        this.admin$ = false
        this.profileSelected$ = this._profileService.cachedUser$
        }
      }) 
  }

  sumOf(cv: Curriculum[]): string{
    let total: number = 0
    for(let c of cv){
      total += c.experienceTime
    }
    let years = (total/12).toFixed(0)
    let month = (total % 12).toFixed(0)
    return years + '年 ' + month + 'ヶ月'
  }

  editSR(id: number){
    console.log(id)
  }
  addNewSR(){
    console.log('add new sr')
  }

}
