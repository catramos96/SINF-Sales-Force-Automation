import { NavController } from 'ionic-angular';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Input, Output, EventEmitter } from '@angular/core';
import { getDateString } from "../calendar-resources";
import { window } from "rxjs/operator/window";


@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamPage {

  private teamChefe = { name: "Lydia Sun" };
  private teamMembers = [];

  constructor() {

  }

  ionViewDidLoad() {
    this.teamMembers = [
      [
        { name: "John Valley" },
        { name: "Lydia Sun" },
        { name: "John Valley" },
        { name: "Lydia Sun" },
        { name: "John Valley" }
      ],
      [
        { name: "John Valley" },
        { name: "Lydia Sun" },
        { name: "John Valley" },
        { name: "Lydia Sun" },
        { name: "John Valley" }
      ],
    ];

  }

}

