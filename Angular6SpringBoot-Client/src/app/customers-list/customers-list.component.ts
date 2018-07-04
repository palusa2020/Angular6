import { Component, OnInit ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  @Input() pagenum: number;
  @Input() npagenum: number;
  @Input() ppagenum: number;
  //pagenum=12;

//id:number;

  customers: Observable<Customer[]>;

  
constructor(private customerService: CustomerService,private router: ActivatedRoute) { 
}

  ngOnInit() {
  this.router.params.subscribe(params => {
    if (params['pagenum']) {
    this.pagenum = params['pagenum'];
    }
  });
    this.reloadData();
  }

  deleteCustomers() {
    this.customerService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  reloadData(  ) {
    this.npagenum=+this.pagenum+1;
    if( this.ppagenum>1 ) {
      this.ppagenum=+this.pagenum;
    } 
   else {
      this.ppagenum=1;
   }
    this.customers = this.customerService.getCustomersList(this.pagenum);
  }
}
