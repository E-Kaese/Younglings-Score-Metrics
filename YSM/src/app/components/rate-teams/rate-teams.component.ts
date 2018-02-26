import { AuthenticationService } from './../../services/authentication/authentication.service';
import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-teams',
  templateUrl: './rate-teams.component.html',
  styleUrls: ['./rate-teams.component.css']
})
export class RateTeamsComponent implements OnInit {

  rated = false;
  rating: number;
  team: string;
  openSprints = true;
  teams = [];
  sprintNum: number;

  constructor(protected readonly db: DatabaseService, private auth: AuthenticationService) {

  }

  ngOnInit() {
    this.db.users.subscribe(r => {
      this.db.teams.subscribe(response => {
        this.db.sprints.subscribe(res => {
          this.teams = response.filter((team) => {
            let flag = false;
            r.map(el => {
              if (el.user === this.auth.getUID()) {
                const includesTeam = el.teamsRated.includes(team.name);
                if (includesTeam) {
                  res.map(e => {
                    if (e.id.includes(team.name) && e.open) {
                      this.sprintNum = e.id.split('-')[1];
                      flag = true;
                    }
                  });
                }
              }
            });
            return flag;
          });
        });
      });
    });
  }

  rate() {
    this.rated = true;
  }

}
