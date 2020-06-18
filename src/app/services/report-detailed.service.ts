import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
// import {ReportModel} from "../components/report-list-case/report-list-case.model";
import {HttpClient} from "@angular/common/http";
import {ReportModel} from '../components/report/report.model';
import {MessageModel} from '../components/report-detailed/message.model';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailedService {

  report: ReportModel;

  constructor(private http: HttpClient) { }

  public getReport = (id: string): Observable<ReportModel> => {
    const url = `http://localhost:8080/restApi/reports/${id}`;
    return this.http.get<ReportModel>(url);
  }

  public markStatus(id: string, status: string) {
    const url = `http://localhost:8080/restApi/reports/${id}`;
    this.http.patch(url, {"status": status});
  }

  public getMessages(reportid: number) {
    const url = `http://localhost:8080/restApi/messages?reportid=${reportid}`;
    return this.http.get<MessageModel[]>(url);
  }
}
