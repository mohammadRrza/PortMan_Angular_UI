import { Component, OnInit } from '@angular/core';
import { SwitchCommandService } from '../../../services/switch-command.service';
import { SwitchService } from '../../../services/switch.service';
import { ActivatedRoute } from '@angular/router';
import { SwitchDTO } from '../../dtos/switch_dto';
import {LoginCls} from '../../dtos/login_cls';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router',
  templateUrl: './switch-operation.component.html',
  styleUrls: ['./switch-operation.component.css']
})
export class SwitchOperationComponent implements OnInit {
    switch_id : number;
    commandRes;
    switch_dto : SwitchDTO;
    constructor(private SwitchCommandSrv:SwitchCommandService,
                private SwitchSrv:SwitchService,
                private route: ActivatedRoute,
                private jwtHelper: JwtHelperService,
                private router: Router

               ){
                  this.route.queryParams.subscribe(params => {
                  this.switch_id = params['switchId'];
                  });
                }
    switch_commands = [];
    comm_item: any = {};
    keyword = 'switch_command_text';
    filenames:string[];
    view_error_text: boolean = false;
    vb_filenames:string[];
    show_result: boolean = false;
    show_backup_files: boolean = false;
    view_backup_file:boolean = false;
    bakup_text:string;
    show_show_vlan_brief_files:boolean = false;
    view_vlan_brif_file :boolean = false;

    get_switch_commands(event, limit_row){
      this.SwitchCommandSrv.get_switch_commands(4, 10).then(res=>{
        this.switch_commands = res;
      });
    }
    selectEvent(item) {
      this.show_result = true;
      this.comm_item = item;
      console.log(item.switch_command_text);
      if(item.switch_command_text == 'Get BackUp'){
        this.show_backup_files = true;
        this.show_show_vlan_brief_files = false
        this.get_switch_backup_files_name(this.switch_id);
      }
      else if(item.switch_command_text == 'show vlan brief'){
        this.show_backup_files = true;
        this.show_show_vlan_brief_files = true
        this.show_backup_files = false;
        this.get_switch_show_vlan_brief_files_name(this.switch_id);
      }
      else{
        this.show_backup_files = false;
        this.show_show_vlan_brief_files = false;

      }
  
    }
  
    get_switch_backup_files_name(switch_id: number){
      this.SwitchSrv.get_switch_backup_files_name(switch_id).then(res=>{
        let obj = JSON.parse(res.response);
        console.log(obj[0])
        this.filenames = obj[0];
        console.log(this.filenames);
      });
    }

    get_switch_show_vlan_brief_files_name(switch_id: number){
      this.SwitchSrv.get_switch_show_vlan_brief_files_name(switch_id).then(res=>{
        let obj = JSON.parse(res.response);
        this.vb_filenames = obj[0];
      });
    }

    onChangeSearch(search: string) {
  
    }
  
    onFocused(e) {
  
    }

    view_vlan_brief(){

      this.view_vlan_brif_file = true;
    }

    switch_run_command(switch_id, command){
      this.show_result = false;
      this.switch_dto = new SwitchDTO();
      this.switch_dto.switch_id = switch_id;
      this.switch_dto.command = command;
      this.switch_dto.params = {};
      this.SwitchSrv.switch_run_command(this.switch_dto).then(res=>{
        this.show_result = true;
        this.commandRes = res.response.split('\n');
        if(command=='show run'){
          this.get_switch_backup_files_name(this.switch_id);
        }
      });

    }
    view_backup(filename){
      this.SwitchSrv.download_backup_file(filename).then(res=>{
         this.bakup_text = res.response;
      });
      this.view_backup_file = true;
    }

    view_vlan_brief_(vlan_brief_file_name){
      this.SwitchSrv.download_view_vlan_brief_file(vlan_brief_file_name).then(res=>{
         this.bakup_text = res.response;
      });
      this.view_backup_file = true;
    }

    
    ngOnInit(): void {
      var loginCls =  new LoginCls(this.jwtHelper,this.router);
      // loginCls.check_login();
      }
}