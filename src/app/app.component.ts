import { Component, ViewChild, TemplateRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface boardItem {
  id: number;
  type: itemType;
}
interface itemType {
  name: string;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatGridListModule, MatDialogModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crown-pair-match';
  selectedId!: number;

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  dialogRef!: MatDialogRef<any>;
  dialog = inject(MatDialog);

  constructor() {
    this.generateBoardList();
  }

  boardItems: itemType[] = [
    { name: 'default', image: 'default.jpg' },
    { name: 'catnips', image: 'catnips.jpg' },
    { name: 'panda', image: 'panda.jpg' },
    { name: 'common', image: 'common.jpg' },
    { name: 'metallia', image: 'metallia.jpg' },
    { name: 'wesson', image: 'wesson.jpg' },
    { name: 'tsukuyomi', image: 'tsukuyomi.jpg' },
    { name: 'king', image: 'king.jpg' },
    { name: 'dog', image: 'dog.jpg' },
    { name: 'dragon', image: 'dragon.jpg' },
    { name: 'zombie-astronaut', image: 'zombie-astronaut.jpg' },
    { name: 'zombie-boss', image: 'zombie-boss.jpg' },
    { name: 'plus-one', image: 'plus-one.jpg' },
    { name: 'crown1', image: 'crown1.jpg' },
    { name: 'crown2', image: 'crown2.jpg' },
    { name: 'crown3', image: 'crown3.jpg' },
    { name: 'crown4', image: 'crown4.jpg' },
    { name: 'crown5', image: 'crown5.jpg' },
  ];
  boardList: boardItem[] = [];

  generateBoardList(): void {
    for (let i = 0; i < 25; i++) {
      this.boardList.push({
        id: i,
        type: { name: 'default', image: 'default.jpg' },
      });
    }
  }
  onCardClicked(item: boardItem) {
    this.selectedId = item.id;
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  onCardSelected(item: itemType) {
    this.boardList[this.selectedId].type = item;
    this.dialogRef.close();
  }

  onResetBoard() {
    this.boardList.forEach((item) => {
      item.type = { name: 'default', image: 'default.jpg' };
    });
  }
}
