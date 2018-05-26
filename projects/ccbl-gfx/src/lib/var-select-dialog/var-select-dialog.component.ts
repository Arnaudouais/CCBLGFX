import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CcblGfxService} from "../ccbl-gfx.service";

@Component({
  selector: 'lib-var-select-dialog',
  templateUrl: './var-select-dialog.component.html',
  styleUrls: ['./var-select-dialog.component.css']
})
export class VarSelectDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<VarSelectDialogComponent>,
              public ccblGfxService: CcblGfxService) {}

  vars = [];

  ngOnInit() {
    for (const k in this.ccblGfxService.environment) {
      this.vars.push(k);
    }
  }

  ok(v: string): void {
    this.dialogRef.close(v);
  }
}
