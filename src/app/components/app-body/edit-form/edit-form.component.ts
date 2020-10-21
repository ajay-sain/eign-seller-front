import { Component, OnInit , Input, Output,EventEmitter } from '@angular/core';
import { Catagories } from "src/app/constants/constants"
import { ProductService } from 'src/app/services/product.service';
import { Router, NavigationEnd } from '@angular/router';
import { ReduxService } from 'src/app/services/redux.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  @Input() product;
  @Input() selerId;
  @Output() formEvent = new EventEmitter();
  @Output() refresh = new EventEmitter();
  displayImage:string="";
  catagories:object[] = Catagories;
  mapArr : any[] = [...Array(6).keys()].map(i => true);
  formModel : boolean = false;
  navigationSubscription;
  constructor(private productService:ProductService,
              private router:Router) {}

  ngOnInit(): void {
    this.displayImage = this.product.primaryUrl;
  }
  uploadProduct(event){
    let formData = {
      productId:this.product.productId,
      sellerId:this.selerId,
      sellerProductId : event.sellerProductId.value,
      name:event.name.value,
      shortDescription:event.shortDescription.value,
      longDescription:event.longDescription.value,
      catagories:event.catagories.value,
      mrp:Number(event.mrp.value),
      ssp:Number(event.ssp.value),
      ymp:Number(event.ymp.value),
      height:Number(event.height.value),
      width:Number(event.width.value),
      length:Number(event.length.value),
      primaryUrl:this.product.primaryUrl,
      galeryUrl:this.product.galeryUrl,
      usageInstructions:this.product.usageInstructions
    }
    console.log(formData);
    this.productService.uploadProductDetails(formData).subscribe(data=>{
      window.alert("product uploaded successfully");
      console.log("working");
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['products']);
      }); 
    },err=>{
      window.alert(err.error);
      this.refresh.emit()
    })
  }
  validateField(data,position){
      if(data=="")
        this.mapArr[position] = false;
      else
        this.mapArr[position] = true;
      if(this.mapArr.every(i=>i))
        this.formModel = false;
      else
        this.formModel = true;
  }
  dissableForm(){
    this.formEvent.emit();
  }
  showImage(url){
    this.displayImage = url;
  }
}
