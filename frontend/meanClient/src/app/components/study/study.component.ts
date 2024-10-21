import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../country';
import { CountryService } from '../../shared/country.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrl: './study.component.css'
})
export class StudyComponent implements OnInit {
  public country: Country = { _id: '', name: '', capital: '', wikipediaUrl: '' }; // Initialize the country object
  public questions: string[] = ['What is the capital?', 'In what continent can you find this country in?', 'What is the population?', 'What is the primary language?', 'What currency is used there?', 'What are the major religions?', 'Describe the culture', 'What is the life expectancy?', 'What is the GDP per capita?', 'Are there any famous landmarks?', 'What are some famous traditional dishes to this country?'];
  public answers: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get country information from the route
    const countryData = this.countryService.getter();
    if (countryData) {
      this.country = countryData;

      // Check if there's an existing study template for the country
      this.countryService.getStudyTemplate(this.country._id).subscribe(
        data => {
          // If study template exists, load answers
          if (data.msg) {
            this.answers = data.msg.answers;
          }
        },
        error => {
          console.log('No existing study template found, creating a new one.');
        }
      );
    } else {
      this.router.navigate(['/']);
    }
  }

  submitAnswers() {
    const studyData = {
      countryId: this.country._id,
      answers: this.answers
    };

    // Try to get existing study template
    this.countryService.getStudyTemplate(this.country._id).subscribe(
      existingTemplateResponse => {
        if (existingTemplateResponse.msg) {
          // Existing template found so update
          const templateId = existingTemplateResponse.msg._id;
          this.countryService.updateStudyTemplate(templateId, studyData).subscribe(
            updatedData => {
              console.log('Study data updated:', updatedData);
              this.router.navigate(['/']);
            },
            error => {
              console.error('Error updating study data:', error);
            }
          );
        }
      },
      error => {
        console.log('No existing study template found, creating a new one.');
        this.countryService.saveStudyTemplate(studyData).subscribe(
          createdData => {
            console.log('Study data saved:', createdData);
            this.router.navigate(['/']);
          },
          error => {
            console.error('Error saving study data:', error);
          }
        );
      }
    );
  }
}
