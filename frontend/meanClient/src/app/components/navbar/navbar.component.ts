import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../shared/country.service';
import { Country } from '../../country';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private countryService: CountryService) { }

  ngOnInit() {
  }

  newCountry(event: any) {
    event.preventDefault();
    //     this.router.navigate(['/createUpdate'], { state: { country: new Country() } });
    this.countryService.setter(new Country());
    this.router.navigate(['/createUpdate']);
  }
}
