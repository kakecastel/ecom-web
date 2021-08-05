import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CaddyComponent } from './caddy/caddy.component';
import { CategorieComponent } from './categorie/categorie.component';
import { StudentComponent } from './student/student.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
const routes: Routes = [ 
{path: 'products/:p1/:p2', component : ProductsComponent},
{path: 'create', component: StudentCreateComponent },
{path: 'edit/:id', component: StudentEditComponent},
{path: 'list', component: StudentComponent },
{path: 'login', component : LoginComponent},
{path: 'categorie', component : CategorieComponent},
{path: 'product-detail/:url', component : ProductDetailComponent},
{path: 'caddies', component : CaddyComponent},
{path: '', redirectTo: 'products/1/0', pathMatch: 'full'}, 
{path: '**', redirectTo: 'products/1/0'}  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
