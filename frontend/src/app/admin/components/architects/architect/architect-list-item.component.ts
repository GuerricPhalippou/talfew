import { Component, OnInit, Input } from '@angular/core';
import { ArchitectClass } from '../../../../core/models/ArchitectClass';

@Component({
  selector: 'app-architect-list-item',
  templateUrl: './architect-list-item.component.html',
  styleUrls: ['./architect-list-item.component.scss']
})
export class ArchitectListItemComponent implements OnInit {

  @Input() architect: ArchitectClass;

  constructor() { }

  ngOnInit() {
  }

}