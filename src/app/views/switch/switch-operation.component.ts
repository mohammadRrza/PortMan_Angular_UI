import { Component, OnInit } from '@angular/core';
import { SwitchCommandService } from '../../../services/switch-command.service';
import { SwitchService } from '../../../services/switch.service';
import { ActivatedRoute } from '@angular/router';
import { SwitchDTO } from '../../dtos/switch_dto';

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
                private route: ActivatedRoute
               ){
                  this.route.queryParams.subscribe(params => {
                  this.switch_id = params['switchId'];
                  });
                }
    switch_commands = [];
    comm_item = {};
    keyword = 'switch_command_text';
    filenames:string[];
    show_result: boolean = false;
    show_backup_files: boolean = false;
    view_backup_file:boolean = false;


    get_switch_commands(switch_type_id, limit_row){
      this.SwitchCommandSrv.get_switch_commands(switch_type_id, limit_row).then(res=>{
        this.switch_commands = res;
      });
    }
    selectEvent(item) {
      this.show_result = true;
      this.comm_item = item;
      if(item.switch_command_text == 'show run'){
        this.show_backup_files = true;
        this.get_backup_files_name(this.switch_id);
      }
      else{
        this.show_backup_files = false;
      }
  
    }
  
    get_backup_files_name(switch_id: number){
      this.SwitchSrv.get_backup_files_name(switch_id).then(res=>{
        this.filenames = res.response;
      });
    }

    onChangeSearch(search: string) {
      console.log(search);
  
    }
  
    onFocused(e) {
      console.log('onFocused');
  
    }
    switch_run_command(switch_id, command, params){
      this.show_result = false;
      this.switch_dto = new SwitchDTO();
      this.switch_dto.switch_id = switch_id;
      this.switch_dto.command = command;
      this.switch_dto.params = {};
      this.SwitchSrv.switch_run_command(this.switch_dto).then(res=>{
        this.show_result = true;
        this.commandRes = res.response.split('\n');
      });
    }
    view_backup(filename){
      this.view_backup_file = true;
    }
    ngOnInit(): void {
      this.get_switch_commands(4,10);
      }
}