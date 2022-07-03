import { ErrorHandlerService } from './error-handler.service';
import { NotificationService } from './notification.service';

export class StatusHandelerService{
    constructor(
        private errorHandler: ErrorHandlerService,
        private notifySrv : NotificationService,){}
        show_errors(error){
            console.log(error.status);
            console.log(error.message);
            switch (error.status) {
            case (error.status === 401):
                this.notifySrv.showError(error.message,'Error')
                break;
            case (this.errorHandler.errorMessage.includes('Unknown Error')):
                this.notifySrv.showError('connect to server has been failed','Error')
                break;
                case (error.status === 404):
                    this.notifySrv.showError('Not found','Error')
                break;
                case (error.status === 500):
                    this.notifySrv.showError('Server exeption error','Error');
                break;
                case (error.status === 400):
                    alert(error.message);
                    this.notifySrv.showError(error.message,'Error')
                break;
            default:
                this.notifySrv.showError(error.message,'Error')
                break;
            };
}
show_succsess(res){
    console.log(res.status)
    switch (res) {
        case (res.status === 200):
            this.notifySrv.showSuccess(res.message,'OK')
            break;
        case (res.status === 201):
                this.notifySrv.showSuccess(res.message,'Created')
            break;
        case (res.status === 202):
                this.notifySrv.showSuccess(res.message,'Accepted');
            break;
        default:
            this.notifySrv.showSuccess(res.message,'OK')
            break;
    }
}
}
