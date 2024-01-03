import { Injectable } from "@angular/core";
import { ISorted, QueryService } from "./query/query.service";
import { UrlQueryService } from "./query/url-query.service";
import { IProperty } from "../interfaces/global/global.interfaces";

@Injectable()
export class TableSortingService {

    private sortedRows: IProperty<ISorted> = {};

    constructor(
        private queryService: QueryService,
        private urlQueryService: UrlQueryService,
    ) { }

    sortChange(value: string) {
        const sortKey = this.queryService.createSortKey(value);

        this.sortedRows = this.queryService.getSortItems(this.sortedRows, value);
        Object.keys(this.sortedRows).forEach(el => {
            const key = this.sortedRows[el].key;
            this.urlQueryService.query[key] = this.sortedRows[el].sort;
        })

        if (!this.sortedRows[value]) {
            delete this.urlQueryService.query[sortKey]
        }

        this.urlQueryService.setQueryUrl();
    }
}
