import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../../services/router.service';
import { RouterCommandService } from '../../../services/router-command.service';
import { ActivatedRoute } from '@angular/router';
import { RouterDTO } from '../../dtos/router_dto';

@Component({
  selector: 'app-router',
  templateUrl: './router-operation.component.html',
  styleUrls: ['./router-operation.component.css']
})
export class RoutersOperationComponent implements OnInit {
    constructor(private routerCommandSrv: RouterCommandService,
                private routerSrv: RouterService,
                private route: ActivatedRoute,
          ){
      this.route.queryParams.subscribe(params => {
        this.router_id = params['routerId'];
        });
    }
    router_dto: RouterDTO;
    router_commands = [];
    keyword = 'router_command_text';
    comm_item = {};
    commandRes;
    router_id:string;
    show_backup_files = false;
    filenames = [];
    filenames_obj = [];
    obj_data = {} as dataObj;
    view_backup_file :boolean = false;
    bakup_text: string;
    get_router_commands(switch_type_id, limit_row){
      this.routerCommandSrv.get_router_commands(switch_type_id, limit_row).then(res=>{
        this.router_commands = res;
      });
    }
    
    onChangeSearch(search: string) {
      console.log(search);
  
    }

    view_backup(filename){
      this.view_backup_file = true;
      this.routerSrv.download_backup_file(filename).then(res=>{
         this.bakup_text = res.response;
      });
    }

    selectEvent(item) {
      this.comm_item = item;
      if(item.router_command_text == 'get Backup'){
        this.show_backup_files = true;
        this.get_backup_files_name(this.router_id);
      }
      else{
        this.show_backup_files = false;
      }
    }

    get_backup_files_name(router_id){
      this.routerSrv.get_backup_files_name2(router_id).then(res=>{
        let obj = JSON.parse(res.response);
        console.log(obj[0])
        this.filenames = obj[0];
      });
    }

    router_run_command(router_id, command, params){
      this.router_dto = new RouterDTO();
      this.router_dto.router_id = router_id;
      this.router_dto.command = command;
      this.router_dto.params = {};
      this.routerCommandSrv.router_run_command(this.router_dto).then(res=>{
        if(res.response.includes('Unable to connect to port')){
          this.commandRes = res.response
        }
        else{
          this.commandRes = res.response.split('\n');
        }
        if(command=='get Backup'){
          this.get_backup_files_name(this.router_id);
        }

      });
    }
    
    onFocused(e) {
      console.log('onFocused');
  
    }

    ngOnInit(): void {
      this.get_router_commands(30,10);
      }
}

export interface dataObj {
  name: string;
  date: Date;
}