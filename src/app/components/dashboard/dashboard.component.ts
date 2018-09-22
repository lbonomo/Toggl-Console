import { Component, OnInit, OnDestroy } from '@angular/core';
import { TogglService } from '../../services/toggl.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

    tag_id:any;
    tags_ids:any;

    constructor(public _toggl:TogglService, private config:LocalstorageService ) {
        config.GetConfig();
        if ( config.workspace_id != null &&  config.api_token != null ) {
            this.getTagsIDs();
        }
        
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
                            this.tags_ids[id]['time'] =  this._toggl.milliseconds_to_hours(time);
                        }
                    }
                }
            );
        }
        
    }

    getTagsIDs() {
        let tags = this.config.tags
        this.tags_ids = [];
        this._toggl.getTags().subscribe(
            data => {
                // console.log(data);
                let x = [];
                for (let id in tags) {
                    let tag_name = tags[id];
                    for (let i in data) {
                        if (data[i]['name'] === tag_name) {
                            // console.log(data[i]['id'],data[i]['name'])
                            x.push({
                                'id': data[i]['id'],
                                'name': data[i]['name']
                            })
                        }
                    }
                }
                // console.log(x);
                for (var i in x) {
                    this.tags_ids.push({
                        'id': x[i]['id'],
                        'name': x[i]['name']
                    })
                }
                this.getTagsTimes();
            }
        )
    }

  ngOnInit() {
  }
  
  ngOnDestroy() {    
  }
}
