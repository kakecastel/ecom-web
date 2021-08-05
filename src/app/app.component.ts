import { Component,OnInit } from '@angular/core';
import { CatelogueService } from './services/catelogue.service';
import { AuthenticationService } from './services/authentication.service';
import { CadyService } from './services/cady.service';
import { Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private categories;
  private currentCategorie;
  constructor(
  private catelogueService:CatelogueService,
  private router:Router,
  private authService:AuthenticationService,
  public caddyService:CadyService) { }

  ngOnInit() {
	this.getCategories();
	this.authService.loadUserAuthenticadedUserFromLocalStorage();
  }

private getCategories(){
	this.catelogueService.getResource("/categories").
	subscribe(data=>{
		this.categories=data;
	},err=>{
	console.log(err);
	})
}
getProductByCat(c){
	this.currentCategorie=c;
	this.router.navigateByUrl('/products/2/'+c.id)
}
onSelectedProducts(c){
	this.currentCategorie=c;
	this.router.navigateByUrl('/products/1/0')
}
onProductsPromo(){
	this.currentCategorie=undefined;
	this.router.navigateByUrl('/products/3/0')
}
onProductsDisponibles(){
	this.currentCategorie=undefined;
	this.router.navigateByUrl('/products/4/0')
}
onProductsSelect(){
	this.currentCategorie=undefined;
	this.router.navigateByUrl('/products/5/0')
}

onLogout(){
    this.authService.removeTokenFromLocalStorage();
	this.router.navigateByUrl('/login');
}
}
