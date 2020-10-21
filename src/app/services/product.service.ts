import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getProductList(user,start,size,string,orderBy,desc){
    return this.http.get('/api/products/'+user+"/"+start+"/"+size,{
      params:{
        string,
        orderBy,
        desc
      }
    });
  }
  showProduct(itemId){
    console.log(itemId)
  }
  deleteProduct(data){
    return this.http.delete("/api/products",data);
  }
  updateProductsStatus(productList){
    return this.http.post("/api/status",productList,{
      observe: "response"
    });
    
  }
  uploadProductImage(file){
    return this.http.post("/api/uploads",file);
  }
  uploadProductDetails(data){
    return this.http.post("/api/products",data);
  }
}
