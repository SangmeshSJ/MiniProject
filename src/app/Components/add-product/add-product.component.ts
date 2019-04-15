import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ProdService } from "../../Services/prod-service.service";
import { Product } from "../../Model/product";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  addForm: FormGroup;
  product: Product[];
  submitted: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private productservice: ProdService
  ) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      id: new FormControl(),
      pid: new FormControl("", [Validators.required, Validators.pattern("[0-9]{1,4}")]),
      name: new FormControl("", [Validators.required, Validators.pattern("[A-Z][a-z]+")]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required])
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.productservice.addProduct(this.addForm.value).subscribe(data => {
      alert("Product Added");
    });
    this.productservice.getProducts().subscribe(data => {
      this.product = data;
    });
    this.router.navigate(["list-product"]);
  }
}
