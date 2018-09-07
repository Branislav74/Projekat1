import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmployee } from 'app/shared/model/employee.model';
import { Principal } from 'app/core';
import { EmployeeService } from './employee.service';
import { LocalDataSource } from '../../../../../../node_modules/ng2-smart-table';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-employee',
    templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit, OnDestroy {
    employees: IEmployee[];
    currentAccount: any;
    eventSubscriber: Subscription;
    data: LocalDataSource;
    settings = {
        add: {
            addButtonContent: 'Create a new Employee'
        },
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
            // firstName: {
            //     title: 'FirstName'
            // },
            // lastName: {
            //     title: 'LastName'
            // },
            fullName: {
                title: 'Full Name'
            },
            employeePosition: {
                title: 'Position'
            }
        }
    };

    constructor(
        private employeeService: EmployeeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.employeeService.query().subscribe(
            (res: HttpResponse<IEmployee[]>) => {
                this.employees = res.body;
                this.data = new LocalDataSource();
                for (const employee of res.body) {
                    employee.employeePosition = employee.position.name;
                    employee.fullName = employee.firstName + ' ' + employee.lastName;
                    this.data.add(employee);
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
        this.registerChangeInEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmployee) {
        return item.id;
    }

    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('employeeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    addNew() {
        this.router.navigate(['employee/new']);
    }
    onCustom(event) {
        console.log(event);
        if (event.action === 'view') {
            this.router.navigate(['employee/' + event.data.id + '/view']);
        } else if (event.action === 'edit') {
            this.router.navigate(['employee/' + event.data.id + '/edit']);
        } else {
            console.log('Kliknuli smo delete');
            this.router.navigate([{ outlets: { popup: 'employee/' + event.data.id + '/delete' } }]);
        }
    }
}
