import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// Services
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    workspace_id:string;
    api_token:string;
    tags_list:string;

    constructor( public _storage:LocalstorageService ) {
        this._storage.GetConfig();
        this.workspace_id = this._storage.workspace_id;
        this.api_token = this._storage.api_token;
        this.tags_list = this._storage.tags_list;
    }

    saveData( form:NgForm ) {
        this._storage.workspace_id = this.workspace_id;
        this._storage.api_token = this.api_token;
        this._storage.tags_list = this.tags_list;
        this._storage.SaveConfig();
    }
    ngOnInit() {
        
    }

}
