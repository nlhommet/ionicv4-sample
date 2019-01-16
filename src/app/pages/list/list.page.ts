import {Component, OnInit} from '@angular/core';
import {AmiiboSeries} from '../../models/amiiboSeries';
import {HttpClient} from '@angular/common/http';
import {LoadingController} from '@ionic/angular';
import {AmiiboSeriesResponse} from '../../interfaces/amiiboSeriesResponse';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

    public amiiboSeries: AmiiboSeries[] = [];
    private _loading: HTMLIonLoadingElement;

    constructor(
        private _http: HttpClient,
        private _loadingController: LoadingController) {
    }

    async ngOnInit(): Promise<void> {
        this._loading = await this._loadingController.create({
            message: 'Chargement en cours'
        });
        await this._loading.present();
        this._http.get<AmiiboSeriesResponse>(environment.apiEndpoint + '/amiiboseries').subscribe(
            async (data: AmiiboSeriesResponse) => {
                this.amiiboSeries = data.amiibo;
                await this._loading.dismiss();
            },
            async (error) => {
                console.error(error);
                await this._loading.dismiss();
            }
        );
    }
}
