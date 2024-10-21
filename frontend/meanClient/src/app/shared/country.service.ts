import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private country!: Country;
  private baseUri: string = "http://localhost:8080";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createCountry(country: Country) {
    return this.http.post(this.baseUri + '/create', country, { headers: this.headers });
  }

  readCountries(): Observable<{ msg: Country[] }> {
    return this.http.get<{ msg: Country[] }>(this.baseUri + '/read', { headers: this.headers });
  }

  updateCountry(country: Country) {
    return this.http.put(this.baseUri + '/update', country, { headers: this.headers });
  }

  deleteCountry(id: string) {
    return this.http.delete(this.baseUri + '/delete/' + id, { headers: this.headers });
  }

  setter(country: Country) {
    this.country = country;
  }

  getter() {
    return this.country;
  }

  searchCountries(name: string): Observable<{ msg: Country[] }> {
    return this.http.get<{ msg: Country[] }>(`${this.baseUri}/search?name=${name}`, { headers: this.headers });
  }

  // Method to save the study template
  saveStudyTemplate(studyData: { countryId: string; answers: string[] }): Observable<any> {
    return this.http.post(this.baseUri + '/saveStudyTemplate', studyData, { headers: this.headers });
  }

  // Method to retrieve the study template for a specific country
  getStudyTemplate(countryId: string): Observable<{ msg: any }> {
    return this.http.get<{ msg: any }>(this.baseUri + '/getStudyTemplate/' + countryId, { headers: this.headers });
  }

  // Method to update the study template
  updateStudyTemplate(templateId: string, studyData: { countryId: string; answers: string[] }): Observable<any> {
    return this.http.put(this.baseUri + '/updateStudyTemplate/' + templateId, studyData, { headers: this.headers });
  }
}
