import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it(`should have as title 'currency-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('currency-app');
  });
  it('should initialize fromCurrency and toCurrency to empty strings', () => {
    expect(component.fromCurrency).toEqual('');
    expect(component.toCurrency).toEqual('');
  });
  it('should reset conversionResult to null when fromCurrency or toCurrency is empty', () => {
    component.fromCurrency = '';
    component.toCurrency = 'EUR';
    component.convertCurrencies();

    expect(component.conversionResult).toBeNull();
  });

  it('should set conversionResult when API call is successful', () => {
    const mockResponse = { rates: { EUR: 1.23 } };
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';

    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    component.convertCurrencies();

    expect(component.conversionResult).toEqual(1.23);
  });

  it('should set conversionResult to null when API call fails', () => {
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';

    spyOn(httpClient, 'get').and.returnValue(of({}));

    component.convertCurrencies();

    expect(component.conversionResult).toBeNull();
  });
});
