import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../shared/country.service';
import { Country } from '../../country';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.css'
})
export class CreateUpdateComponent {
  public country: Country = { _id: '', name: '', capital: '', wikipediaUrl: '' }; // Add wikipediaUrl
  constructor(private countryService: CountryService, private router: Router) { }

  ngOnInit() {
    const retrievedCountry = this.countryService.getter();
    this.country = retrievedCountry ? retrievedCountry : { _id: '', name: '', capital: '', wikipediaUrl: '' }; // Add wikipediaUrl here too
  }

  createOrUpdate() {
    if (!this.country._id) {  // If there is no _id, create a new country
      this.countryService.createCountry(this.country).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
    } else {  // If _id exists, update the existing country
      this.countryService.updateCountry(this.country).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
