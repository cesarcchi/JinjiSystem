import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee';
import { API_URL } from '../../url-settings'
import { catchError } from 'rxjs/operators';
import { TokenInterceptorService } from 'src/app/guards/token-interceptor.service';

const url = API_URL
@Injectable({
  providedIn: 'root'
})
export class EmployeeMasterService {

  constructor(private _http: HttpClient,
              private interceptor: TokenInterceptorService) { }

  getEmployeeList(): Observable<Employee[]>{
    return this._http.get<Employee[]>(url+'/api/admin/employee-list')
  }  
  
  emParam(): Observable<any>{
      return this._http.get<any>(url+'/api/employee-dependencies',{
        headers: new HttpHeaders(
          { 'Content-Type': 'application/json; charset=utf-8','Authorization':localStorage.getItem('currentUser')})
    })
  }

  public insertShainAttempt(employee: Employee){
    console.log (localStorage.getItem('currentUser'))
    console.log('object sended to spring:')
    console.log(employee)
    return this._http.post<any>(url+'/api/add-employee', employee, {
      observe: 'response'})
      .subscribe(resp => {
        if (resp.status === 201)
        alert("Employee Inserted")
    },
    err => {
      alert("Something bad happened !")
      throw err
    },
    () => alert('THis has been completed even with errors...'))
  }
}
