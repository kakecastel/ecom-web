import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { Product } from '../model/product.model';
import { ProductItem } from '../model/product-item.model';

@Injectable({
  providedIn: 'root'
})
export class CadyService {
currentCaddyName:string="Caddy1";
public bonjour:string="bonjour";
public caddies:Map<string,Caddy> = new Map();

constructor() { 

/*
let caddies = localStorage.getItem('myCaddies');
if(caddies){
	this.caddies=JSON.parse(caddies);
}
else{
let caddy=new Caddy(this.currentCaddyName);
this.caddies.set(this.currentCaddyName,caddy);
}*/
let caddy=new Caddy(this.currentCaddyName);
this.caddies.set(this.currentCaddyName,caddy);

}

public addProductToCaddy(product:Product):void{
	//----ici je recupere le caddy courant dans la liste des caddies
	let caddy=this.caddies.get(this.currentCaddyName);
	//------ici je recupre le productItem dans le caddy
	let productItem:ProductItem=caddy.items.get(product.id);
    if(productItem){
      productItem.quantity+=product.quantity;
      //this.saveCaddies();
      
    }
    else{
    productItem=new ProductItem();
    productItem.price=product.currentprice;
    productItem.quantity=product.quantity;
    productItem.product=product;
    caddy.items.set(product.id,productItem);
    this.caddies.set(this.currentCaddyName,caddy);
    
    //localStorage.setItem('myCaddies', JSON.stringify(caddy));
    //this.caddies.set(this.currentCaddyName,caddy);
    //this.saveCaddies();
    localStorage.setItem('bonjour',this.bonjour);
    //localStorage.setItem('myCaddies', JSON.stringify(,this.caddies));
   // localStorage.setItem('myCaddies',JSON.stringify(this.caddies));
    console.log(this.caddies);
    }

    

     //console.log(this.caddies);
     //localStorage.setItem('myCaddies', JSON.stringify(caddies));
}

 getCurrentCaddy():Caddy{
	return this.caddies.get(this.currentCaddyName);
}

public getTotalCurrentCaddy(){
	let caddy=this.caddies[this.currentCaddyName];
	let total=0;
	for(let key in caddy.items){
	total+=caddy.items[key].price*caddy.items[key].quantity;
	}
	//let items:IterableIterator<ProductItem>=this.getCurrentCaddy().items.values();
	//for(let pi of items){
	//total+=pi.price*pi.quantity;
	//}
	return total;
}


public saveCaddies(){
localStorage.setItem('myCaddies', JSON.stringify(this.caddies));
//localStorage.setItem('mytest', JSON.stringify(bonjour));
	
}

}
