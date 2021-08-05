import { Component, OnInit } from '@angular/core';
import { CatelogueService } from '../services/catelogue.service';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import {HttpEventType,HttpResponse} from '@angular/common/http';
import { Product } from '../model/Product.model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { CadyService } from '../services/cady.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
private finChargemenFoto:boolean=false;
private currentFileUpload: any;
private selectedFiles;
private progress:number ;
currentProduct:Product;
private editPhoto:boolean;
private mode:number=0;
//private currentProduct:any;
private timestamp:number=0 ;
 singleProduct;
  constructor(private catService:CatelogueService,private route:ActivatedRoute,private router:Router,private authService:AuthenticationService,public caddyService:CadyService) { }

  ngOnInit() {
   let url=atob(this.route.snapshot.params.url);
   //let id=this.route.snapshot.params.url;
   console.log("le nom de id recuperee  "+url);
  
   //this.getProductOne('/products/'+id+'');
   this.getProductOne(url);

   
  }


private getProductOne(url){
  
	this.catService.getProduct(url).
	subscribe(data=>{
		this.currentProduct=data;
		console.log("voici le nom du produit courant "+this.currentProduct.name);
	},err=>{
	console.log("voici le maitre des erreurs de la terre"+err);
	})
}
onAddProductToCaddy(p:Product){
	this.caddyService.addProductToCaddy(p);

}
onEditProduct(){
	
	this.mode=1;
}


onEditPhoto(p){
this.currentProduct=p;
this.editPhoto=true;
	
}
RetourneHome(){
	this.router.navigateByUrl("products/1/0");
}
onSelectedFile(event){
	this.selectedFiles=event.target.files;
	//this.finChargemenFoto=true;
	console.log("la valeur de changement est  "+this.finChargemenFoto);
}
uploadPhoto(){
this.progress=0;
this.currentFileUpload=this.selectedFiles.item(0)
this.catService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id).subscribe(
event=>{
	if(event.type===HttpEventType.UploadProgress){
	this.progress=Math.round(100*event.loaded / event.total);
	console.log(this.progress);
	}
	else if( event instanceof HttpResponse){
      this.finChargemenFoto=false;
	  this.timestamp=Date.now();
	  console.log("la valeur de changement est dans le upload   "+this.finChargemenFoto);
		
	}


},
err=>{
	alert(" Probleme de chargement "+JSON.parse(err.error).message);
})

this.selectedFiles=undefined
	
}

getTS(){
	
	return this.timestamp;
}
onUpdateProduct(data){
	


}

}
