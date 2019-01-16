import {Component, OnDestroy, OnInit} from '@angular/core';
import {Amiibo} from '../../models/amiibo';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoadingController, MenuController} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {AmiiboResponse} from '../../interfaces/amiiboResponse';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    public amiibos: Amiibo[] = [];
    public amiibosToDisplay: Amiibo[] = [];
    public titlePage = 'Accueil';
    private _loading: HTMLIonLoadingElement;

    constructor(private _http: HttpClient,
                private _loadingController: LoadingController,
                private _activatedRoute: ActivatedRoute,
                private _menuController: MenuController
    ) {
    }

    ngOnInit(): void {
        this._activatedRoute.queryParams.subscribe(async (params) => {
            let queryParams = {};
            let showMenu = true;
            if (params.hasOwnProperty('key')) {
                const httpParams = new HttpParams().set('amiiboSeries', params.key);
                queryParams = {params: httpParams};
                if (params.hasOwnProperty('name')) {
                    this.titlePage = params.name;
                }
                showMenu = false;
            }
            await this._menuController.enable(showMenu);
            this._loading = await this._loadingController.create({
                message: 'Chargement en cours'
            });
            await this._loading.present();
            this._http.get<AmiiboResponse>(
                environment.apiEndpoint + '/amiibo',
                queryParams
            ).subscribe(
                async (data: AmiiboResponse) => {
                    this.amiibos = data.amiibo;
                    this.amiibosToDisplay.push(...this.amiibos.splice(0, 10));
                    await this._loading.dismiss();
                },
                async (error) => {
                    console.error(error);
                    await this._loading.dismiss();
                }
            );
        });
    }

    loadMoreData(event) {
        const length = this.amiibos.length;
        if (length > 0) {
            this.amiibosToDisplay.push(...this.amiibos.splice(0, Math.min(10, length)));
            event.target.complete();
        } else {
            event.target.disabled = true;
        }
    }

    async ngOnDestroy() {
        await this._menuController.enable(true);
    }

}
