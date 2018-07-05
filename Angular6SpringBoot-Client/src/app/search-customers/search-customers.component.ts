import { Component, OnInit ,Input } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {

  @Input() customer: Customer;


  age: number;
  customers: Customer[];
  name String;

  constructor(private dataService: CustomerService) { }

  ngOnInit() {
    this.age = 0;
  }

  private searchCustomers() {
    this.dataService.getCustomersByAge(this.age)
      .subscribe(customers => this.customers = customers);
  }

  private searchCustomersByName() {
    this.dataService.getCustomersByName(this.name)
      .subscribe(customers => this.customers = customers);
  }

  onSubmit() {
    if ( this.age>0) {
      this.searchCustomers();
    }else{
      this.searchCustomersByName();
    }
  }
  updateActive(mycust: Customer) {
    this.dataService.updateCustomer(mycust.id,
      { name: mycust.name, age: mycust.age, active: false })
      .subscribe(
        data => {
          console.log(data);
          this.customer = data as Customer;
        },
        error => console.log(error));
  }

}
