import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service'
import { ReduxService } from 'src/app/services/redux.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data = [];
  pageStart :number = 0;
  pageSize :number =  20;
  dataValue : number = 0;
  prevDissabled : boolean = true;
  nextDissabled : boolean = false;
  totalRecords : number = 0;
  searchParam : string = "";
  pageStartvalue : number = 0;
  seller : string = JSON.parse(localStorage.getItem("id"));
  sortType:string ="";
  desc:boolean=false;
  editForm:any=false;
  productData:object={};
  // productList:ProductsComponent;
  // tableHeaders : any;
  // tableData : any;
  constructor(private productService :ProductService
            ,private router : Router
            ,private renderer: Renderer2
            ,private reduxService : ReduxService){
              this.getData();
            }

  ngOnInit() {
    // this.tableHeaders = [
    //   {name:"Preview",value:"primaryUrl",class:"column-header mini-column",type:"image"},
    //   {name:"Seller Product code",value:"sellerProductId",class:"column-header mini-column",type:"text"},
    //   {name:"Name",value:"name",class:"column-header mini-column",type:"text"},
    //   {name:"Categories",value:"categories",class:"column-header mini-column",type:"text"},
    //   {name:"MRP",value:"mrp",class:"column-header mini-column",type:"text"},
    //   {name:"SSP",value:"ssp",class:"column-header mini-column",type:"text"},
    //   {name:"YMP",value:"ymp",class:"column-header mini-column",type:"text"},
    //   {name:"Status",value:"status",class:"column-header mini-column",type:"text"},
    //   {name:"Actions",value:"action",class:"column-header mini-column",type:"text"},
    // ]
    this.reduxService.userInfo().subscribe(data=>{
      if(data.user)
        this.seller = data.user.sellerId;
    })
    
  }
  searchProduct(param){
    // searchParam
    this.searchParam = param.value;
    this.getData();
  }
  getData(){
    this.productService.getProductList(this.seller,this.pageStart,this.pageSize,this.searchParam,this.sortType,this.desc).subscribe((data:any)=>{
      this.data = data.productList;
      this.dataValue = data.productList.length;
      this.totalRecords = data.totalRows;
      this.pageStartvalue = 0;
      if(data.productList.length>0){
        this.pageStartvalue = this.pageStart + 1;
      }
      if(!(this.totalRecords > this.pageStart + this.pageSize)){
        this.nextDissabled = true;
      }
    });
  }
  delete(data){
    console.log("deleting ", data)
    this.productService.deleteProduct(data).subscribe(err=>{
      window.alert("try again")
    },data=>{
      window.alert("deleted successgully")
      location.reload();
    });
  }
  changePageSize(newPageSize){
    this.pageStart = 0;
    this.prevDissabled = true;
    this.pageSize = Number(newPageSize.value);  
    this.getData()
  }
  changePage(buttonId){
    if(buttonId=="next" &&  (this.totalRecords > this.pageStart +  this.pageSize)){
      console.log(this.totalRecords ,this.pageStart + 2*this.pageSize)
      this.pageStart = this.pageStart + this.pageSize;
      this.prevDissabled = false;
      this.getData();
    }
    if(buttonId=="prev" && this.pageStart!=0){
      this.pageStart = this.pageStart - this.pageSize;
      if(this.pageStart<=0){
        this.pageStart=0;
        this.prevDissabled = true;
      }
      this.nextDissabled = false;
      this.getData();
    }
    if(buttonId=="first"){
      this.pageStart = 0;
      this.prevDissabled = true;
      this.nextDissabled = false;
      this.getData();
    }
    if(buttonId=="last" && (this.totalRecords > this.pageStart + this.pageSize)){
      this.pageStart = Math.floor(this.totalRecords/this.pageSize)*this.pageSize;
      if(this.pageStart==this.totalRecords)
        this.pageStart = (Math.floor(this.totalRecords/this.pageSize)-1)*this.pageSize;
      this.prevDissabled = false;
      this.getData();
    }
  }
  sortTable(type){
    console.log(type)
    if(this.sortType==type){
      this.desc = !this.desc;
    }else{
      this.sortType=type;
      this.desc = false;
    }
    this.getData();
  }
  editClose(){
    this.editForm = false;
  }
  edit(data){
    this.editForm = true;
    this.productData = data;
  }
  closeForm(){
    this.editForm = false;
    this.productData = {};
  }
  updatePage(){
    this.editForm = false;
    this.productData = {};
    this.getData();
  }
}
