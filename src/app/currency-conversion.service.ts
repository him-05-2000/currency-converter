import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConversionService {
  private apiUrl =
    'https://v6.exchangerate-api.com/v6/5e308ef76de903bf15c0ff30/latest/USD';

  constructor(private http: HttpClient) {}

  getConversionRate(fromCurrency: string, toCurrency: string): Observable<any> {
    const url = `${this.apiUrl}/${fromCurrency}`;
    return this.http.get(url);
  }
}
