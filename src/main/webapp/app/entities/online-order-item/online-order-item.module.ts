import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrezaSharedModule } from 'app/shared';
import {
    OnlineOrderItemComponent,
    OnlineOrderItemDetailComponent,
    OnlineOrderItemUpdateComponent,
    OnlineOrderItemDeletePopupComponent,
    OnlineOrderItemDeleteDialogComponent,
    onlineOrderItemRoute,
    onlineOrderItemPopupRoute
} from './';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const ENTITY_STATES = [...onlineOrderItemRoute, ...onlineOrderItemPopupRoute];

@NgModule({
    imports: [BrezaSharedModule, RouterModule.forChild(ENTITY_STATES), Ng2SmartTableModule],
    declarations: [
        OnlineOrderItemComponent,
        OnlineOrderItemDetailComponent,
        OnlineOrderItemUpdateComponent,
        OnlineOrderItemDeleteDialogComponent,
        OnlineOrderItemDeletePopupComponent
    ],
    entryComponents: [
        OnlineOrderItemComponent,
        OnlineOrderItemUpdateComponent,
        OnlineOrderItemDeleteDialogComponent,
        OnlineOrderItemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrezaOnlineOrderItemModule {}
