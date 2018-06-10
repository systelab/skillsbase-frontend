import { Component, EventEmitter, Output } from '@angular/core';
import { ChangePasswordDialog, ChangePasswordDialogParameters } from 'systelab-login/widgets/change-password-dialog.component';
import { Observable, of as observableOf } from 'rxjs';
import { MessagePopupService } from 'systelab-components/widgets/modal/message-popup/message-popup.service';
import { DialogService } from 'systelab-components/widgets/modal/dialog/dialog.service';

import { I18nService } from 'systelab-translate/lib/i18n.service';

@Component({
  selector:    'header',
  templateUrl: 'header.component.html',
  styleUrls:   ['header.component.scss']
})
export class HeaderComponent {

  @Output() public clickMenu= new EventEmitter();

  constructor(protected messagePopupService: MessagePopupService,
              protected dialogService: DialogService, protected i18nService: I18nService) {
  }


  public doChangePassword() {
    const parameters: ChangePasswordDialogParameters = ChangePasswordDialog.getParameters();
    parameters.minPasswordStrengthValue = 1;
    parameters.action = (a, b) => this.changePassword(a, b);
    this.dialogService.showDialog(ChangePasswordDialog, parameters)
      .subscribe();
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    if (oldPassword === newPassword) {
      this.i18nService.get(['ERR_ERROR', 'ERR_IMPOSSIBLE_CHANGE_PASSWORD'])
        .subscribe((res) => {
          this.messagePopupService.showErrorPopup(res.COMMON_ERROR, res.COMMON_IMPOSSIBLE_CHANGE_PASSWORD);
          return observableOf(false);
        });

    }
    return observableOf(true);
  }
  public doLogout() {
    window.location.reload();
  }

  public doClickSideBar() {
    this.clickMenu.emit();
  }

}