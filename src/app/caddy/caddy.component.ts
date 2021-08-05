import { Component, OnInit } from '@angular/core';
import { CadyService } from '../services/cady.service';
import { Caddy } from '../model/caddy.model';
@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {
 caddy:Caddy;
  constructor(public caddyService:CadyService) { 


  }

  ngOnInit() {
  //this.caddy=this.caddyService.getCurrentCaddy();
  }
  getTotal():number{

  return 800;
  }
}
