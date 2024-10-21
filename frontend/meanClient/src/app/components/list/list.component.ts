import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../shared/country.service';
import { Country } from '../../country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public countries!: Country[];
  public searchTerm: string = ''; // Add a search term property

  constructor(private _countryService: CountryService, private router: Router) { }

  ngOnInit() {
    this.readCountries();
  }

  readCountries() {
    this._countryService.readCountries().subscribe(
      data => {
        this.countries = data['msg'];
      },
      error => {
        console.log(error);
      }
    );
  }

  searchCountries() {
    if (this.searchTerm.trim()) {
      this._countryService.searchCountries(this.searchTerm).subscribe(
        data => {
          this.countries = data['msg'];
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.readCountries(); // Reset the list if search term is empty
    }
  }

  doUpdate(country: Country) {
    this._countryService.setter(country);
    this.router.navigate(['/createUpdate']);
  }

  doDelete(country: Country) {
    this._countryService.deleteCountry(country._id).subscribe(
      data => {
        this.countries.splice(this.countries.indexOf(country), 1);
      },
      error => {
        console.log(error);
      }
    );
  }

  doStudy(country: Country) {
    this._countryService.setter(country);
    this.router.navigate(['/study']);
  }
}
