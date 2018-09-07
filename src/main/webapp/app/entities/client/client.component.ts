import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClient } from 'app/shared/model/client.model';
import { Principal } from 'app/core';
import { ClientService } from './client.service';
import { LocalDataSource } from '../../../../../../node_modules/ng2-smart-table';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-client',
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, OnDestroy {
    clients: IClient[];
    currentAccount: any;
    eventSubscriber: Subscription;
    data: LocalDataSource;
    settings = {
        add: { addButtonContent: 'Create a new Client' },
        actions: {
            edit: false,
            delete: false,
            custom: [
                {
                    name: 'view',
                    title: 'View '
                },
                {
                    name: 'edit',
                    title: 'Edit '
                },
                {
                    name: 'delete',
                    title: 'Delete '
                }
            ]
        },
        mode: 'external',
        columns: {
            id: {
                title: 'ID'
            },
            name: {
                title: 'Name'
            },
            address: {
                title: 'Address'
            },
            phone: {
                title: 'Phone'
            },
            email: {
                title: 'Email'
            },
            clientCity: {
                title: 'City'
            }
        }
    };

    constructor(
        private clientService: ClientService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.clientService.query().subscribe(
            (res: HttpResponse<IClient[]>) => {
                this.clients = res.body;
                this.data = new LocalDataSource();
                for (const client of res.body) {
                    client.clientCity = client.city.name;
                    this.data.add(client);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClient) {
        return item.id;
    }

    registerChangeInClients() {
        this.eventSubscriber = this.eventManager.subscribe('clientListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    addNew() {
        this.router.navigate(['client/new']);
    }
    onCustom(event) {
        console.log(event);
        if (event.action === 'view') {
            this.router.navigate(['client/' + event.data.id + '/view']);
        } else if (event.action === 'edit') {
            this.router.navigate(['client/' + event.data.id + '/edit']);
        } else {
            console.log('Kliknuli smo delete');
            this.router.navigate([{ outlets: { popup: 'client/' + event.data.id + '/delete' } }]);
        }
    }
}
