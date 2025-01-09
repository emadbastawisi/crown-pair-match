import { Component, ViewChild, TemplateRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

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
  imports: [
    CommonModule, // Import explicitly if needed in other modules
    RouterOutlet,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'crown-pair-match';
  selectedId!: number;
  selectedMode: string = '1';

  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  dialogRef!: MatDialogRef<any>;
  dialog = inject(MatDialog);

  constructor() {
    this.loadBoardList();
  }
  boardItems: itemType[] = [];
  boardItems1: itemType[] = [
    { name: 'default1', image: 'default1.png' },
    { name: 'common', image: 'common.png' },
    { name: 'tsukuyomi', image: 'tsukuyomi.png' },
    { name: 'catnips', image: 'catnips.png' },
    { name: 'king', image: 'king.png' },
    { name: 'wesson', image: 'wesson.png' },
    { name: 'panda', image: 'panda.png' },
    { name: 'metallia', image: 'metallia.png' },
    { name: 'dog', image: 'dog.png' },
    { name: 'dragon', image: 'dragon.png' },
    { name: 'zombie-astronaut', image: 'zombie-astronaut.png' },
    { name: 'zombie-boss', image: 'zombie-boss.png' },
    { name: 'plus-one', image: 'plus-one.png' },
    { name: 'plus-two', image: 'plus-two.png' },
    { name: 'fruit1', image: 'fruit1.png' },
    { name: 'fruit2', image: 'fruit2.png' },
    { name: 'fruit3', image: 'fruit3.png' },
    { name: 'fruit4', image: 'fruit4.png' },
    { name: 'fruit5', image: 'fruit5.png' },
  ];
  boardItems2: itemType[] = [
    { name: 'default2', image: 'default2.png' },
    { name: 'common', image: 'common.png' },
    { name: 'tsukuyomi', image: 'tsukuyomi.png' },
    { name: 'catnips', image: 'catnips.png' },
    { name: 'king', image: 'king.png' },
    { name: 'wesson', image: 'wesson.png' },
    { name: 'panda', image: 'panda.png' },
    { name: 'metallia', image: 'metallia.png' },
    { name: 'dog', image: 'dog.png' },
    { name: 'dragon', image: 'dragon.png' },
    { name: 'zombie-astronaut', image: 'zombie-astronaut.png' },
    { name: 'zombie-boss', image: 'zombie-boss.png' },
    { name: 'plus-one', image: 'plus-one.png' },
    { name: 'plus-two', image: 'plus-two.png' },
    { name: 'fruit1', image: 'fruit1.png' },
    { name: 'fruit2', image: 'fruit2.png' },
    { name: 'fruit3', image: 'fruit3.png' },
    { name: 'fruit4', image: 'fruit4.png' },
    { name: 'fruit5', image: 'fruit5.png' },
  ];
  boardList: boardItem[] = [];
  boardList1: boardItem[] = [];
  boardList2: boardItem[] = [];

  loadBoardList() {
    this.onLoadFromLocalStorage();
    if (this.boardList.length == 0 || this.boardList == null) {
      this.generateBoardList();
    }
  }
  generateBoardList(): void {
    if (this.selectedMode === '1') {
      for (let i = 0; i < 25; i++) {
        this.boardList1.push({
          id: i,
          type: { name: 'default1', image: 'default1.png' },
        });
      }
      this.boardList = this.boardList1;
      this.boardItems = this.boardItems1;
    } else {
      for (let i = 0; i < 25; i++) {
        this.boardList2.push({
          id: i,
          type: { name: 'default2', image: 'default2.png' },
        });
      }
      this.boardList = this.boardList2;
      this.boardItems = this.boardItems2;
    }
  }
  onCardClicked(item: boardItem) {
    this.selectedId = item.id;
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  onCardSelected(item: itemType) {
    if (this.selectedMode == '1') {
      this.boardList1[this.selectedId].type = item;
      this.boardList = this.boardList1;
    } else {
      this.boardList2[this.selectedId].type = item;
      this.boardList = this.boardList2;
    }
    this.dialogRef.close();
    this.SaveToLocalStorage();
  }

  onResetBoard() {
    if (this.selectedMode == '1') {
      this.boardList1.forEach((item) => {
        item.type = { name: 'default1', image: 'default1.png' };
      });
      this.boardList = this.boardList1;
    } else {
      this.boardList2.forEach((item) => {
        item.type = { name: 'default2', image: 'default2.png' };
      });
      this.boardList = this.boardList2;
    }
    this.SaveToLocalStorage();
  }

  onSelectNoramlMode() {
    this.selectedMode = '1';
    this.loadBoardList();
  }
  onSelectFruitMode() {
    this.selectedMode = '2';
    this.loadBoardList();
  }

  SaveToLocalStorage() {
    if (this.selectedMode == '1') {
      localStorage.setItem('boardList1', JSON.stringify(this.boardList1));
    } else {
      localStorage.setItem('boardList2', JSON.stringify(this.boardList2));
    }
  }
  onLoadFromLocalStorage() {
    if (this.selectedMode === '1') {
      const storedBoardList1 = localStorage.getItem('boardList1');
      this.boardList1 = storedBoardList1 ? JSON.parse(storedBoardList1) : []; // Use an empty array as default
      this.boardList = this.boardList1;
      this.boardItems = this.boardItems1 || []; // Ensure boardItems1 has a default value
    } else {
      const storedBoardList2 = localStorage.getItem('boardList2');
      this.boardList2 = storedBoardList2 ? JSON.parse(storedBoardList2) : []; // Use an empty array as default
      this.boardList = this.boardList2;
      this.boardItems = this.boardItems2 || []; // Ensure boardItems2 has a default value
    }
  }
}
