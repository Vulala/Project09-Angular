import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
/** Show the application's pages, see @router-outlet */
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
