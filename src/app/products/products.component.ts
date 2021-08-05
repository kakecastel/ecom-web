import { Component, OnInit } from '@angular/core';
import { CatelogueService } from '../services/catelogue.service';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import {HttpEventType,HttpResponse} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { CadyService } from '../services/cady.service';
import { Product } from '../model/Product.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
private products;
private editPhoto:boolean;
private finChargemenFoto:boolean=false;
private currentProduct: any;
private currentFileUpload: any;
private selectedFiles;
private progress:number ;
private timestamp:number=0 ;
private title:string ;
 singleProduct;
  constructor(private catService:CatelogueService,private route:ActivatedRoute,private router:Router,private authService:AuthenticationService,
  public caddyService:CadyService) { 

  }

    ngOnInit() {
    const p1=this.route.snapshot.params.p1;
    //console.log("la valeur du parametre P1 recuperee  "+this.route.snapshot.params.p1);
    if(p1==1 )
	this.getProducts("/products/search/selectedProducts");
    this.router.events.subscribe((val)=>{
	  if(val instanceof NavigationEnd){ 
	  let url=val.url;
	  console.log("cest Url "+url);
	  const p1=this.route.snapshot.params.p1;
    if(p1==1 )
	this.getProducts("/products/search/selectedProducts");
	else if(p1==2){
    let idCat=this.route.snapshot.params.p2;
    this.title="Produits de la categories "+idCat;
    console.log("cest id "+idCat);
    this.getProducts('/categories/'+idCat+'/products');
	}
	else if(p1==3){
	this.title="Produits en promotion ";
    this.getProducts('products/search/promoProducts');
	}
	else if(p1==4){
	this.title="Produits disponnibles ";
    this.getProducts('products/search/dispoProducts');
	}
	else if(p1==5){
	this.title="Produits produits selectionnees ";
    this.getProducts('products/search/selectedProducts');
	}
  //console.log("cest moi les parametres "+this.activatedRoute.snapshot.data['asdf']);
  }
  
  });
  console.log("la valeur de changement est  "+this.finChargemenFoto);

  }

private getProducts(url){
	this.catService.getResource(url).
	subscribe(data=>{
		this.products=data;
	},err=>{
	console.log(err);
	})
}
onEditPhoto(p){
    this.currentProduct=p;
	this.editPhoto=true;

}

onSelectedFile(event){
	this.selectedFiles=event.target.files;
	this.finChargemenFoto=true;
	console.log("la valeur de changement est  "+this.finChargemenFoto);
}
uploadPhoto(){
this.progress=0;
this.currentFileUpload=this.selectedFiles.item(0)
this.catService.uploaddocu(this.currentFileUpload,this.currentProduct.id).subscribe(
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
onProductDetails(p:Product){
	let url=btoa(p._links.product.href);
	this.router.navigateByUrl("product-detail/"+url);
}
onAfficheproduitdetail(p:Product){
	//console.log("la valeur du lien envoyer  "+p._links.product.href);
	let url=btoa(p._links.product.href);

	this.router.navigateByUrl("product-detail/"+url);
}


onAddProductToCaddy(p:Product){
	this.caddyService.addProductToCaddy(p);

}

}


