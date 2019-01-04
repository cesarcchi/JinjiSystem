import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee';
import { API_URL, PUBLIC_URL, ADMIN_URL } from '../../url-settings'
import { catchError, map } from 'rxjs/operators';
import { TokenInterceptorService } from 'src/app/guards/token-interceptor.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class EmployeeMasterService {

  constructor(private _http: HttpClient,
              private interceptor: TokenInterceptorService,
              private _router: Router) { }

  //resultado da busca na tela de pesquisa => retorna um Array com os usuarios que batem com os params.
  searchSource: ReplaySubject<Employee[]> = new ReplaySubject<Employee[]>(1)
  searchResults$ = this.searchSource.asObservable()

  //resultado da busca por ID, retorna o user em um Observavel que pode ser lido por qualquer tela.
  usrSource: ReplaySubject<Employee> = new ReplaySubject<Employee>(1)
  employee$ = this.usrSource.asObservable()

  
  getShainData(id: string, cv?: boolean, rs?:boolean, edu?: boolean){
    if(cv == undefined || cv == null) cv = false
    if(rs == undefined || rs == null) rs = false
    if(edu == undefined || edu == null) edu = false    
    return this._http.get<Employee>(API_URL + '/se/data/' + id
    +'?cv='+cv
    +'&rs='+rs
    +'&cv='+edu, {observe: 'response'}).pipe(
      map(res => {
        if (!res.body || res.body == null){
          return
        } else {
          this.usrSource.next(res.body)
        }
      })
    ).subscribe()
  }
  
  checkIfShainExists(id: string): Observable<boolean>{
  let d: Subject<boolean> = new Subject<boolean>()
    this._http.get<Employee>(API_URL +'/se/data/'+id, {observe: 'response'}).pipe(
      map(res =>{
        if (!res.body || res.body == null){
          d.next(false)
        } else {
          this.usrSource.next(res.body)
          d.next(true)
        }
      })
    ).subscribe()   
    d.pipe(map(r => console.log(r))).subscribe()
    return d
  }

  //carrega os dados do banco pra criar a view da pagina
  getViewRendering(): Observable<any>{
      return this._http.get<any>(PUBLIC_URL+'/employee-params')
  }

  insertShainAttempt(employee: Employee){
    return this._http.post<Employee>(ADMIN_URL+'/add-employee', employee, {
      observe: 'response'})
      .subscribe(
    resp => {},
    err => {
      alert("Something bad happened ! You gonna be disconnected for security purposes.")
      throw err
    }
  )}

  getAllShains(){
    return this._http.get<Employee[]>(ADMIN_URL+'/employee-list', {observe: 'response'}).subscribe(
      res => {
        this.searchSource.next(res.body)
      }
    )
  }  

  searchShain(id: string, name: string, kana: string, aff: number[]){
    let affs = ''
    if (aff.length > 0) {
     affs = aff.map(s => s).join(',')
    console.log(affs)
    }
    return this._http.get<Employee[]>(ADMIN_URL+
    '/search-employee?id='+id
    +'&name='+name
    +'&kana='+kana
    +'&affiliation='+affs,
    {observe: 'response'}).subscribe(res =>{
      this._router.navigate(['/admin/employee-list'])
      this.searchSource.next(res.body)
    })
  }


}
