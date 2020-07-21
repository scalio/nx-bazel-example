import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICat, ICreateCatDto } from '@proto-interface';
import { Observable } from 'rxjs';

@Injectable()
export class CatsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Required<ICat>>> {
    return this.http.get<Array<Required<ICat>>>(`${this.apiUrl}/cats`);
  }

  getById(id: number): Observable<Required<ICat>> {
    return this.http.get<Required<ICat>>(`${this.apiUrl}/cats/${id}`);
  }

  create(createCatDto: Required<ICreateCatDto>): Observable<Required<ICat>> {
    return this.http.post<Required<ICat>>(`${this.apiUrl}/cats`, createCatDto);
  }

  delete(id: number): Observable<Required<ICat>> {
    return this.http.delete<Required<ICat>>(`${this.apiUrl}/cats/${id}`);
  }
}
