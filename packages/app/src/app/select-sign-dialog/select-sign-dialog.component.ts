import { Component, OnInit, inject, output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sign, signCategories } from '@zskarte/types';
import capitalizeFirstLetter from '../helper/capitalizeFirstLetter';
import { DrawStyle } from '../map-renderer/draw-style';
import { Signs } from '../map-renderer/signs';
import { SessionService } from '../session/session.service';
import { I18NService } from '../state/i18n.service';
import { RecentlyUsedSignsComponent } from '../recently-used-signs/recently-used-signs.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-select-sign-dialog',
  templateUrl: './select-sign-dialog.component.html',
  styleUrls: ['./select-sign-dialog.component.scss'],
  imports: [
    RecentlyUsedSignsComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    CommonModule,
    MatIconModule,
  ],
})
export class SelectSignDialog implements OnInit {
  dialogRef = inject<MatDialogRef<SelectSignDialog>>(MatDialogRef);
  i18n = inject(I18NService);
  dialog = inject(MatDialog);
  private _session = inject(SessionService);

  filter = '';
  allSigns: Sign[] = [];
  filteredSigns: Sign[] = [];
  selected = '';
  hiddenTypes = ['incident'];
  signCategories = Array.from(signCategories.values()).filter((c) => !this.hiddenTypes.includes(c.name));

  capitalizeFirstLetter = capitalizeFirstLetter;
  readonly signSelected = output<Sign>();

  loadSigns() {
    this.allSigns = Signs.SIGNS.sort((a, b) => {
      let aValue = a[this._session.getLocale()];
      let bValue = b[this._session.getLocale()];
      aValue = aValue ? aValue.toLowerCase() : '';
      bValue = bValue ? bValue.toLowerCase() : '';
      return aValue.localeCompare(bValue);
    });
    this.updateAvailableSigns();
  }

  updateAvailableSigns() {
    this.filteredSigns = this.allSigns.filter(
      (s) =>
        (!this.filter || this.i18n.getLabelForSign(s).toLowerCase().includes(this.filter.toLowerCase())) &&
        (!this.selected || this.selected === s.kat) &&
        !this.hiddenTypes.includes(s.kat ?? ''),
    );
  }

  // skipcq: JS-0105
  getImageUrl(file: string) {
    if (file) {
      return DrawStyle.getImageUrl(file);
    }
    return null;
  }

  ngOnInit(): void {
    this.loadSigns();
  }

  select(sign: Sign) {
    // We need to pass a deep copy of the object
    const toEmit = JSON.parse(JSON.stringify(sign));
    // If this was directly called as a dialog, close it
    // Else emit an event
    if (this.dialogRef.componentInstance?.constructor?.name === 'SelectSignDialog') {
      this.dialogRef.close(toEmit);
    } else {
      this.signSelected.emit(toEmit);
    }
  }

  // skipcq: JS-0105
  getIconFromType(type: string) {
    switch (type) {
      case 'Polygon':
        return 'widgets';
      case 'LineString':
        return 'show_chart';
      case 'Point':
        return 'stars';
      default:
        return 'block';
    }
  }
}
