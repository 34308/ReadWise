import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {NavbarComunicationService} from "../../services/navbar-comunication.service";
import {filter, Subscription} from "rxjs";
@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit,OnDestroy {
   @Input() filterText: string = '';
  private subscription: Subscription;

  public items$: any;

  constructor(private service: DataService,
              private navbarCommunication:NavbarComunicationService) {
      this.subscription = this.navbarCommunication.getSearch().subscribe((value) => {
      this.filterText = value;
      this.getAll();
      });
    this.navbarCommunication.filterSearch$.subscribe(() => {
      console.log(this.filterText);

      this.getAll()
    });
  }

  ngOnInit() {
    this.navbarCommunication.ShowBar();
    this.getAll();
  }

  getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }
  ngOnDestroy() {
    this.navbarCommunication.HideBar();
  this.subscription.unsubscribe();

}
}
