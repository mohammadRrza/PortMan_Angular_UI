import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { ResellerService } from '../../../services/reseller.service';

@Component({
  selector: 'app-reseller',
  templateUrl: './reseller.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./reseller.component.css']
})
export class ResellerComponent implements OnInit {

  constructor(private resellerSrv: ResellerService) {
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
  }
  cols: any[];
  pagination_config: any;
  listResellers = [];
  get_all_resellers(page, page_size) {
    this.resellerSrv.get_all_resellers(page, page_size).then(res => {
      this.pagination_config.totalItems = res.count;
      this.listResellers = res.results;
    });
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'VPI', header: 'VPI' },
      { field: 'VCI', header: 'VCI' },
      { field: 'Tel', header: 'Tel' },
      { field: 'Fax', header: 'Fax' },
      { field: 'City', header: 'City' },
      { field: 'Address', header: 'Address' }
    ];
    this.get_all_resellers(1, 10);
  }

}
