import { NavController } from 'ionic-angular';
import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {Input,Output, EventEmitter } from '@angular/core';
import {getDateString} from "../calendar-resources";
import {window} from "rxjs/operator/window";


@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamPage {

  constructor(){
    this.loadTeamMembers();
  }

  ngAfterViewInit() {
  }

  loadTeamMembers(){  //param

    //EXEMPLO
    var team_members = [
      {name: "Lydia Sun",type: "Sales Representative"},
      {name: "John Valley",type: "Sales Representative"},
      {name: "Lydia Sun",type: "Sales Representative"},
      {name: "John Valley",type: "Sales Representative"},
      {name: "Lydia Sun",type: "Sales Representative"},
      {name: "John Valley",type: "Sales Representative"}
    ];

    var html:string;

    for(var i=0 ; i < team_members.length; i++){
      html = "<ion-col class=\"team-member\">\n" +
        "        <ion-row justify-content-center>\n" +
        "          <ion-img src=\"../../assets/imgs/user.png\" class=\"team-member-img\"></ion-img>\n" +
        "        </ion-row>\n" +
        "        <label class=\"team-label\">" + team_members[i].name + "</label>\n" +
        "        <label class=\"team-label\">" + team_members[i].type + "</label>\n" +
        "        <ion-row justify-content-center>\n" +
        "          <button ion-button icon-only outline class=\"other-button\" style=\"height:3vh; width:3vh\">\n" +
        "            <ion-icon name=\"remove\"></ion-icon></button>\n" +
        "        </ion-row>\n" +
        "      </ion-col>";


      //insertAdjacentHTML("beforeend",html);
    }
  }
}
