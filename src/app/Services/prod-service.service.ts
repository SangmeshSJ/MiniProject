import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../Model/product";

@Injectable({
  providedIn: "root"
})
export class ProdService {
  baseurl: string = "http://localhost:3000/products";
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.baseurl);
  }

  addProduct(product: Product) {
    return this.http.post(this.baseurl, product);
  }

  getProductById(id: number) {
    return this.http.get<Product>(this.baseurl + "/" + id);
  }
  updateProduct(product: Product) {
    return this.http.put(this.baseurl + "/" + product.id,product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseurl + "/" + id);
  }
}
