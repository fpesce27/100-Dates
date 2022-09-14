import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit(): void {
  }

}
