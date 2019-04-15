import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/Model/product";
import { ProdService } from "src/app/Services/prod-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  product: Product[];
  config: any;
  collection = [];

  constructor(
    private route: ActivatedRoute,
    private productservice: ProdService,
    private router: Router
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 5
    };
    this.route.queryParamMap
      .map(params => params.get("page"))
      .subscribe(page => (this.config.currentPage = page));

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  pageChange(newPage: number) {
    this.router.navigate(["list-product"], { queryParams: { page: newPage } });
  }

  ngOnInit() {
    this.productservice.getProducts().subscribe(data => {
      this.product = data;
    });
  }

  addProduct(): void {
    this.router.navigate(["add-product"]);
  }

  deleteProduct(product: Product): void {
    let result = confirm("Do you want to delete this Product");
    if (result) {
      this.productservice.deleteProduct(product.id).subscribe(data => {
        this.product = this.product.filter(u => u !== product);
      });
    }
  }

  getProducts() {
    if (localStorage.getItem("username") != null) {
      this.productservice.getProducts().subscribe(data => {
        this.product = data;
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }

  editProduct(product: Product): void {
    localStorage.removeItem("editProductId");
    localStorage.setItem("editProductId", product.id.toString());
    this.router.navigate(["edit-product"]);
  }

  deleteAll() {
    console.log(this.product);
    for (let i = 0; i < this.product.length; i++) {
      this.productservice.deleteProduct(this.product[i].id).subscribe(() => this.getProducts());
    }
  }
}
