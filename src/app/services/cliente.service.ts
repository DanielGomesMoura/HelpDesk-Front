import { Cliente } from '../models/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${API_CONFIG.baseurl}/cliente/${id}`);
  }

  findAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${API_CONFIG.baseurl}/cliente`);
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${API_CONFIG.baseurl}/cliente`,cliente)
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${API_CONFIG.baseurl}/cliente/${cliente.id}`,cliente);
  }

  delete(id: any): Observable<Cliente>{
    return this.http.delete<Cliente>(`${API_CONFIG.baseurl}/cliente/${id}`);
  }
}
