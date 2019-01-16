import {Component, Input, OnInit} from '@angular/core';
import {Amiibo} from '../../models/amiibo';

@Component({
    selector: 'app-amiibo',
    templateUrl: './amiibo.component.html',
    styleUrls: ['./amiibo.component.scss']
})
export class AmiiboComponent implements OnInit {

    @Input() amiboo: Amiibo = new Amiibo();

    constructor() {
    }

    ngOnInit() {
    }

}
