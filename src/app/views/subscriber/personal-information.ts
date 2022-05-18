import {Component,OnInit} from '@angular/core';
import { SubscriberService } from '../../../services/subscriber.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './personalinformation.component.html',
})
export class PersonalInformatin implements OnInit {
    personalInformation: any;
    submitted: boolean = false;
    constructor(
        private SubsSrv : SubscriberService,
        private router: Router
    ){
    
    }
    ngOnInit(): void {
        
    }
    nextPage() {
            this.router.navigate(['active_port_detail']);
            this.submitted = true;
            return;

        }
    }