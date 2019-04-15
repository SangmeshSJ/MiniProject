import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { AddProductComponent } from './Components/add-product/add-product.component';

const routes: Routes = [
  {path:'',component:ProductListComponent},
  {path:'add-product',component:AddProductComponent},
  {path:'list-product',component:ProductListComponent},
  {path:'edit-product',component:EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
