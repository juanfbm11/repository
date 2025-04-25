import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UtilityService } from './services/utility.service';
import { toasterModel } from './models/core/toaster.model';
import { Toast } from 'bootstrap';

@Component({
  selector:'app-root',
  templateUrl:'./app.component.html',
  standalone: false,
  styleUrl:'./app.component.css',
})
export class AppComponent  implements OnInit {
  
  @ViewChild ("toaster") toaster : ElementRef | undefined

  toasterData: toasterModel | undefined;

  constructor (private router:Router, private util:UtilityService){

  }

  ngOnInit(): void {
    this.util.toaster$
    .subscribe((data) =>{
      this.toasterData = data;
      let autohide = (data.delay>0);
      const toast = Toast.getOrCreateInstance(this.toaster?.nativeElement, {animation:true, autohide, delay: data.delay});
      toast.show();
      
    })
  }
  isloginRoute():boolean{
    return this.router.url ==='/login';
  }
  title = 'PerritosCallejeros';
}
