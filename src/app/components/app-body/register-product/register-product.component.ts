import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ReduxService } from 'src/app/services/redux.service';
import { Router } from '@angular/router';
import { Catagories } from "src/app/constants/constants";

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  seller : any ;
  primaryImageURL : String="";
  imageURL : any = [];
  formSubmit:boolean=true;
  usageInstructions:string;
  mapArr : any[] = [...Array(8).keys()].map(i => false);
  catagories:object[] = Catagories;
  constructor(private productService :ProductService,private renderer: Renderer2
    ,private reduxService : ReduxService,private router : Router) {
      this.reduxService.userInfo().subscribe(data=>{
        this.seller = data.user;
      })
    }
  ngOnInit(): void {
  }
  addMoreImages(element){
    console.log(element);
    let chieldComponent: HTMLInputElement = this.renderer.createElement("input");
    chieldComponent.type = "file";
    chieldComponent.onchange = (chieldComponent)=>{this.uploadFile(chieldComponent,1 )}
    // chieldComponent
    // this.renderer.listen(chieldComponent,"click",)
    this.renderer.appendChild(element,chieldComponent)

  }
  validateField(data,base){
    if(base==7){
      if(this.usageInstructions=="")
        this.mapArr[base] = false;
      else
        this.mapArr[base] = true;
    }
    else if(base==6){
      if(this.primaryImageURL=="")
        this.mapArr[base] = false;
      else
        this.mapArr[base] = true;
    }
    else{
      if(data=="")
        this.mapArr[base] = false;
      else
        this.mapArr[base] = true;
    }
    if(this.mapArr.every(i=>i))
      this.formSubmit = false;
    else
      this.formSubmit = true;
  }
  uploadFile(event,base){
    if(base==-1){
      this.usageInstructions = "http://localhost:9000/images/"+event.target.files[0].name;
      this.validateField(event.target.files[0].name,7);
    }
    if(base==0){
      this.primaryImageURL = "http://localhost:9000/images/"+event.target.files[0].name;
      this.validateField(event.target.files[0].name,6);
    }
    else
      this.imageURL.push("http://localhost:9000/images/"+event.target.files[0].name)
    let form = new FormData()
    form.append("file",event.target.files[0],event.target.files[0].name)
    this.productService.uploadProductImage(form).subscribe(data=>{
      window.alert("file uploaded successfully")
    },err=>{
      window.alert(err.error.text)
    })
  }
  uploadProduct(event){
    let formData = {
      sellerId:this.seller.sellerId,
      sellerProductId : event.sellerProductId.value,
      name:event.name.value,
      shortDescription:event.shortDescription.value,
      longDescription:event.longDescription.value,
      catagories:event.catagories.value,
      mrp:Number(event.mrp.value),
      ssp:Number(event.ssp.value),
      ymp:Number(event.ymp.value),
      primaryUrl:this.primaryImageURL,
      galeryUrl:this.imageURL,
      height:Number(event.height.value),
      width:Number(event.width.value),
      length:Number(event.length.value),
      usageInstructions:this.usageInstructions
    }
    this.productService.uploadProductDetails(formData).subscribe(data=>{
      window.alert("product uploaded successfully");
      this.router.navigate(['products']);
    },err=>{
      this.router.navigate(['products'])
    })
  }
}
