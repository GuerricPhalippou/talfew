import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DisabledZipCodePopupComponent } from '@weflat/app/core/components/disabled-zip-code-popup/disabled-zip-code-popup.component';
import { VisitClass } from '@weflat/app/core/models/VisitClass';
import { ZipCodeClass } from '@weflat/app/core/models/ZipCodeClass';
import { GoogleService } from '@weflat/app/core/services/google.service';
import { SessionStorageService } from '@weflat/app/core/services/session-storage.service';
import { GooglePlaceKeys } from '@weflat/app/shared/common/GooglePlaceKeys';
import { VisitService } from '@weflat/app/shared/services/visit.service';

declare var google;

@Component({
  selector: 'app-address-field',
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.scss']
})
export class AddressFieldComponent implements OnInit {

  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('popup', { static: true }) popup: DisabledZipCodePopupComponent;
  visit: VisitClass = new VisitClass();
  place: any;
  isBrowser: boolean;

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private zone: NgZone,
    private visitService: VisitService,
    private googleService: GoogleService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    const options = {
      types: ['address'],
      componentRestrictions: {
        country: 'fr'
      }
    };

    this.googleService.loadGoogleMapsLibrary().subscribe(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, options);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.placeChanged(autocomplete);
      });
    });

    this.popup.OKFunction = () => {
      this.sessionStorageService.place = this.place;
      this.sessionStorageService.visit = this.visit;
      this.router.navigate(['/create-visit']);
    };

    this.popup.cancelFunction = () => (this.input.nativeElement as HTMLInputElement).value = null;
  }

  placeChanged(autocomplete) {
    this.zone.run(() => {
      this.place = autocomplete.getPlace();
      this.sessionStorageService.place = this.place;
      const keys = Object.keys(GooglePlaceKeys);

      for (const key of keys) {
        for (const component of this.place.address_components) {
          if (component.types.includes(GooglePlaceKeys[key])) {
            if (key !== 'zipCode') {
              this.visit[key] = component.long_name;
            } else {
              this.visit.zipCode = new ZipCodeClass({ number: component.long_name });
            }
          }
        }
      }

      this.visitService.post(this.visit).subscribe(res => {
        if (!res.zipCode.active) {
          this.popup.open(this.visit);
        } else {
          this.sessionStorageService.visit = res;
          this.router.navigate(['/create-visit']);
        }
      });
    });
  }
}
