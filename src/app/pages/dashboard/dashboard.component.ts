import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { SocketData } from '../../@core/data/socketdata';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  topic: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  private alive = true;

  co2Value: number;
  pm25Value: number;
  humidityValue: number;
  temperatureValue: number;

  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
    topic: 'led',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
    topic: 'roller',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
    topic: 'wireless',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
    topic: 'coffee',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.lightCard,
          type: 'warning',
        },
        {
          ...this.rollerShadesCard,
          type: 'primary',
        },
        {
          ...this.wirelessAudioCard,
          type: 'danger',
        },
        {
          ...this.coffeeMakerCard,
          type: 'secondary',
        },
      ],
    };

  constructor(private themeService: NbThemeService,
    private socketService: SocketData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.alive);
    // TODO: Connect to api server by socket
     this.socketService.getData('02:42:76:b3:91:49')
      .pipe(takeWhile(() => this.alive))
      .subscribe((result) => {
        console.log('socket push data', result.data.h);
        this.co2Value = result.data.h as number;
        // this.pm25Value = result.data.t as number;
        this.humidityValue = result.data.h as number;
        this.temperatureValue = result.data.t as number;
      });



    // this.socketService.getData('humidity')
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe((result) => {
    //     console.log('humidity data', result.data.h);
    //     // this.co2Value = result.data.h as number;
    //   });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
