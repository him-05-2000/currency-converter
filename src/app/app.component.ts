import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyConversionService } from './currency-conversion.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'currency-app';
  fromCurrency: string = '';
  toCurrency: string = '';
  conversionResult: any = null;

  constructor(private currencyService: CurrencyConversionService) {}

  convertCurrencies() {
    if (this.fromCurrency && this.toCurrency) {
      this.currencyService
        .getConversionRate(this.fromCurrency, this.toCurrency)
        .subscribe((data: any) => {
          if (data && data.rates && data.rates[this.toCurrency]) {
            this.conversionResult = data.rates[this.toCurrency];
          } else {
            this.conversionResult = null; // Conversion rate not found
          }
        });
    }
  }
}
