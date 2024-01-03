import { Injectable } from "@angular/core";
import { IPropertyAny, IPropertyString } from "../../interfaces/global/global.interfaces";
import { ActivatedRoute, Router } from "@angular/router";
import { IPagination } from "src/app/interfaces/shared/pagination.interface";

@Injectable()
export class UrlQueryService {
    public query: IPropertyAny = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    getCampaign(value: IPropertyString | string | undefined) {
        this.applyQuery('campaign', value, 'key');
    }
    getAgency(value: IPropertyString | string | undefined) {
        this.applyQuery('agency', value, 'key');
    }
    getClient(value: IPropertyString | string | undefined) {
        this.applyQuery('client', value, 'key');
    }
    getYear(value: IPropertyString | string | undefined) {
        this.applyQuery('year', value, 'value');
    }
    getMediaPartner(value: IPropertyString | string | undefined) {
        this.applyQuery('name', value, 'value');
    }
    getAgencyUser(value: IPropertyString | string | undefined) {
        this.applyQuery('user', value, 'value');
    }
    actionPagination(data: IPagination) {
        this.applyQuery('page', data.page.toString());
    }

    applyQuery(name: string, value: IPropertyString | string | undefined, valueKey?: string) {
        const valueString = this.getValueString(value, valueKey);
        this.query[name] = valueString;
        this.setQueryUrl();
    }

    setQueryUrl() {
        this.router.navigate([], { queryParams: this.clearQuery(this.query) });
    }

    getQueryUrl(calback: Function) {
        this.route.queryParams
            .subscribe((query: IPropertyString) => calback(query));

        return this.route.queryParams;
    }

    clearQuery(query: IPropertyAny): IPropertyAny {
        const data: IPropertyAny = {}
        Object.keys(query).forEach(key => {
            if (query[key]) {
                data[key] = query[key]
            }
        })

        return data;
    }

    private getValueString(value: IPropertyString | string | undefined, valueKey?: string) {
        if (typeof (value) === 'string') {
            return String(value);
        }

        if (value && valueKey) {
            return value[valueKey];
        }

        return '';
    }
}
