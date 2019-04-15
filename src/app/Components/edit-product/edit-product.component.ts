import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from "src/app/Model/product";
import { ProdService } from "src/app/Services/prod-service.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  product: Product[];
  submitted: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private productservice: ProdService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("username") != null) {
      let productId = localStorage.getItem("editProductId");
      if (!productId) {
        alert("Invalid Action");
        this.router.navigate(["edit-product"]);
        return;
      }
      this.editForm = this.formbuilder.group({
        id: [],
        pid: ["", Validators.required],
        name: ["", Validators.required],
        description: ["", Validators.required],
        price: ["", Validators.required]
      });
      this.productservice.getProductById(+productId).subscribe(data => {
        this.editForm.setValue(data);
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.productservice
      .updateProduct(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["list-product"]);
        },
        error => {
          alert(error);
        }
      );
  }
}
