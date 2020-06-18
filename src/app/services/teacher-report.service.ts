import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
// import {ReportModel} from '../components/report-list-case/report-list-case.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '../components/login/user.model';
import {ReportModel} from '../components/report/report.model';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TeacherReportService {

  currentReport: ReportModel;

  constructor(private http: HttpClient) { }

  getReports(userId: number, flag: string, resolved: boolean): Observable<ReportModel[]> {
    const url = `http://localhost:8080/restApi/reports?id=${userId}&flag=${flag}&resolved=${resolved}`;
    return this.http.get<ReportModel[]>(url);
  }

  getTeachers() {
    const url = `http://localhost:8080/restApi/users/getAllTeachers`;
    return this.http.get<UserModel[]>(url);
  }

  setCurrentReport(report: ReportModel) {
    this.currentReport = report;
  }

  getCurrentReport() {
    return this.currentReport;
  }

  updateRatings(updates: {}): Observable<any> {
    const id = this.currentReport.id;
    const url = `http://localhost:8080/restApi/reports/${id}`;
    return this.http.patch(url, updates, httpOptions).pipe(
        tap(_ => console.log(`patched report id=${id}`)),
        catchError(this.handleError<any>('updateRatings'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

