import { Tecnico } from './../models/tecnico';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Tecnico>{
    return this.http.get<Tecnico>(`${API_CONFIG.baseurl}/tecnico/${id}`);
  }

  findAll(): Observable<Tecnico[]>{
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseurl}/tecnico`);
  }

  create(tecnico: Tecnico): Observable<Tecnico>{
    return this.http.post<Tecnico>(`${API_CONFIG.baseurl}/tecnico`,tecnico)
  }

  update(tecnico: Tecnico): Observable<Tecnico>{
    return this.http.put<Tecnico>(`${API_CONFIG.baseurl}/tecnico/${tecnico.id}`,tecnico);
  }

  delete(id: any): Observable<Tecnico>{
    return this.http.delete<Tecnico>(`${API_CONFIG.baseurl}/tecnico/${id}`);
  }
}
