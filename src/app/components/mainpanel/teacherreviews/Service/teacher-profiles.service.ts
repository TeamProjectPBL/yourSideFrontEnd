import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TeacherProfileModel} from '../teacherprofile/teacherprofile.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class TeacherProfilesService {

    private teachersProfilesUrl = 'http://localhost:8080/restApi/users/getTeachersProfiles';

    constructor(private http: HttpClient) {
    }

    getEvents(): Observable<TeacherProfileModel[]> {
        return this.http.get<TeacherProfileModel[]>(this.teachersProfilesUrl);
    }

}

