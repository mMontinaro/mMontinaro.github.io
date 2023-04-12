import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { UtilService } from 'src/app/services/util.service';
import { BaseComponent } from 'src/app/utility/base.component';
import { ResultsDTO } from '../../dto/results-dto';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent extends BaseComponent implements OnInit {
  results!: ResultsDTO[];
  pastDays!: string[];
  @Input("id") id?: number;

  constructor(private service: TeamService, private utilService: UtilService) {
    super();
  }

  ngOnInit(): void {
    this.pastDays = this.utilService.getLast12Dates();
    this.getGameResults();
  }

  getGameResults(){
    let subscription = this.service.getResultsByDatesAndId(this.pastDays, this.id!).subscribe(resp =>{
      if(resp && resp.data){
        this.results = this.utilService.mapResults(resp.data);
        console.log(this.results);
      }
      subscription.unsubscribe();
		});
  }

}
