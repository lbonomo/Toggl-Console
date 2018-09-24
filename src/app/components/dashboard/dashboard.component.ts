import { Component, OnInit, OnDestroy } from '@angular/core';
import { TogglService } from '../../services/toggl.service';
import { LocalstorageService } from '../../services/localstorage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

    // tag_id:any;
    tags_ids:any[];
    private count:number;
    public pieChartEnabled:boolean = false;
    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartType:string = 'pie';
    public pieChartLegend:boolean = true;
    public pieChartOptions: any = {        
        responsive: true,
        cutoutPercentage: 40,
        rotation: 1,
        legend: { 
            position: 'bottom',
            display: true,
            fullWidth: true, 
            reverse: false,
            // hidden: true,
            labels: {
                // fontColor: 'rgb(255, 99, 132)',
                fontSize: 10,
                boxWidth: 10,
            }
        }
    }

    constructor(public _toggl:TogglService, private config:LocalstorageService ) {
        config.GetConfig();
        if ( config.workspace_id != null &&  config.api_token != null ) {
            this.getTagsIDs();
        }
        
    }

    makePie() {
        for (let i in this.tags_ids) {
            this.pieChartLabels.push(this.tags_ids[i]['name'])
            this.pieChartData.push(this._toggl.milliseconds_to_float_hours(this.tags_ids[i]['time']));
        }

        console.log(this.pieChartLabels);
        console.log(this.pieChartData);
        this.pieChartEnabled = true;
    }
  
    getTagsTimes() {
        // Horas 
        for (var t in this.tags_ids ) {
            // this._toggl.getTotalTimeOfTag();
            let tag_id = this.tags_ids[t]['id']; 
            this._toggl.last_month();
            this._toggl.getTotalTimeOfTag(tag_id,null,null).subscribe(
                data => {
                    
                    for (let id in this.tags_ids) {
                        if ( this.tags_ids[id]['id'] === tag_id  ) {
                            let time = data['total_grand'];
                            if (time === null) {
                                time = 0;
                            }
                            this.tags_ids[id]['time'] = time;
                            this.count = this.count + 1;
                        }
                    }
                    // espero que esten los datos para cargar la grafica
                    if ( this.count === this.config.tags.length) {
                        this.makePie();
                    }
                }
            );
        }    
    }

    getTagsIDs() {
        let tags = this.config.tags
        this.count = 0;
        this.tags_ids = [];
        this.pieChartEnabled = false;
        this.pieChartLabels = [];
        this.pieChartData = [];
        this._toggl.getTags().subscribe(
            data => {
                // console.log(data);
                let x = [];
                for (let id in tags) {
                    let tag_name = tags[id];
                    for (let i in data) {
                        if (data[i]['name'] === tag_name) {
                            this.tags_ids.push({
                                'id': data[i]['id'],
                                'name': data[i]['name']
                            })
                        }
                    }
                }

                // subscribe
                this.getTagsTimes();
            }
        )
    }
  
  
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {    
  }
}

