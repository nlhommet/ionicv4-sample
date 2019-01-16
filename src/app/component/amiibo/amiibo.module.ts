import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AmiiboComponent} from './amiibo.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [AmiiboComponent],
    exports: [AmiiboComponent],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class AmiiboModule {
}
