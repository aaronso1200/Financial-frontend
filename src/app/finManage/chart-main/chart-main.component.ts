import { Component, OnInit, ViewChild,AfterViewInit,OnDestroy } from '@angular/core';
import {Chart} from 'chart.js';
import {FinManageService} from '../finManage.service';
import {HttpClient} from '@angular/common/http';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {environment} from '../../../environments/environment';
import {ManageRecordEditComponent} from '../manage-Record/manage-record-edit/manage-record-edit.component';
import {ManageRecordDeleteComponent} from '../manage-Record/manage-record-delete/manage-record-delete.component';

@Component({
  selector: 'app-chart-main',
  templateUrl: './chart-main.component.html',
  styleUrls: ['./chart-main.component.css']
})
export class FinChartMainComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChild('DoughnutChart') private doughnutChart;
  @ViewChild('LineChart') private LineChart;
  doughnutChartSetUp:any;
  doughnutChartData:any;
  total_assets =0;
  recentRecordsList: any[] = [];
  noRecord = false;
  isLoading = true;
  isMobile = false;

 doughnutChartContext: CanvasRenderingContext2D;
  private unsubscribe: Subject<boolean> = new Subject();

 lineChartSetUp:any;
lineChartContext: CanvasRenderingContext2D;
  constructor(private dialog: MatDialog,private finManage: FinManageService,private http: HttpClient) {
    this.finManage.getAccountSum();


  }

  ngOnInit() {
      this.getRecentRecord();
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
      console.log(this.isMobile);

    };
  }

  getRecentRecord() {
    this.http.post(environment.backendURL + '/finManage' + '/record/recentRecord',{}).subscribe( (data:any) => {
      this.recentRecordsList = data.accounts;
      for (let i=0; i<this.recentRecordsList.length;i++) {
        let date = new Date(this.recentRecordsList[i].recordDate);
        this.recentRecordsList[i].displayDate = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
      }
      console.log(this.recentRecordsList);
    })

  }

  ngAfterViewInit(): void {
    this.finManage.getAccountSumData().pipe(takeUntil(this.unsubscribe)).subscribe( (data:any)  => {
      this.doughnutChartData = data;
      let accounts = data.accounts;
      let doughnutData = this.doughnutChartSetUp.data.datasets[0];
      for (let i=0; i<accounts.length;i++) {
        doughnutData.data[i] = accounts[i].value;
        // console.log(this.total_assets);
        this.total_assets += accounts[i].value;
        this.doughnutChartSetUp.data.labels[i] = accounts[i].accountName;
          // console.log(accounts[i]);

        }
      // this.doughnutChartSetUp.data.datasets[0].data[0]=100;
      this.doughnutChartSetUp.update();

      if (doughnutData.data.length ==0) {
        this.noRecord =true;
      }

      }
    );

    this.http.post(environment.backendURL + '/finManage' + '/record/accumulateRecord',{}).pipe(takeUntil(this.unsubscribe)).subscribe((data:any) => {
      console.log('Bar Chart: ' + data);
      this.isLoading = false;

      let lineChartData = this.lineChartSetUp.data;
      for (let i=0; i<data.records.length;i++) {
        let accountrecords = data.records[i];
        let color =this.getRandomColor();
        let newDataSet = {
          label: accountrecords._id.accountName,
          fill:false,
          backgroundColor: color,
          borderColor: color,
          lineTension: 0,
          data: []
        };

        // lineChartData.datasets[0].label = accountrecords._id.accountName;
        // lineChartData.datasets[0].data[0].t = new Date().toISOString();
        // lineChartData.datasets[0].data[0].y = "50";
        for (let j=0; j<accountrecords.amount.length;j++) {
          let newData = {
            x: new Date(accountrecords.year[j],accountrecords.month[j]),
            y: accountrecords.amount[j]
          };
          // console.log(newData);
          newDataSet.data.push(newData);
         }
        lineChartData.datasets.push(newDataSet);
        // console.log(newDataSet);
      }

      this.lineChartSetUp.update();

    });


    this.doughnutChartContext = (<HTMLCanvasElement>this.doughnutChart.nativeElement).getContext('2d');
    this.lineChartContext = (<HTMLCanvasElement>this.LineChart.nativeElement).getContext('2d');

    let gradientColors = [
      {
        start: '#ED5384',
        end: '#F6A064'
      },
      {
        start: '#F6A064',
        end: '#ED5384'
      },
      {
        start: '#ee9ca7',
        end: '#ffdde1'
      },
      {
        start: '#2980B9',
        end: '#6DD5FA'
      },
      {
        start: '#F7971E',
        end: '#FFD200'
      },
      {
        start: '#A1FFCE',
        end: '#FAFFD1'
      },
      {
        start: '#E0EAFC',
        end: '#CFDEF3'
      }
    ];

    let gradients = [];

    gradientColors.forEach( ( item ) => {
      let gradient =this.doughnutChartContext.createLinearGradient(150, 150, 400 , 400);
      gradient.addColorStop(0, item.start);
      gradient.addColorStop(1, item.end);
      gradients.push(gradient);
    });

    this.doughnutChartSetUp = new Chart(this.doughnutChartContext, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [],
          backgroundColor: gradients}],
        labels: [
        ]},

        options: {
          responsive: false,
          maintainAspectRatio: false,
          legend: {
            display: false,
            position:'top',
            align:'center'

          }
        }

    });



    this.lineChartSetUp = new Chart(this.lineChartContext, {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        bezierCurve: false,
        responsive: false,
        title: {display: true,text: 'Accounts Records',
        fontFamily: 'Arial', fontStyle: 'bold', fontSize: 15},
        scales:{
          xAxes: [{
            type: 'time',
            offset: true,
            time: {
              stepSize: 1,
              displayFormats:{'day':'MM/YYYY'},
              unit: 'month'
            }
          }]
        }
      }
    })

  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  assignColor() {
    let gradient = this.doughnutChartContext.createLinearGradient(460,350,400,400);
    gradient.addColorStop(0,'#000000');
    gradient.addColorStop(1,'#FFFFFF');
    this.doughnutChartSetUp.data.datasets[0].backgroundColor[0] = gradient;
    this.doughnutChartSetUp.update();
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  showLabel() {
    this.isLoading=false;
    console.log(this.doughnutChartSetUp.options.legend);
    this.doughnutChartSetUp.options.legend.display = this.doughnutChartSetUp.options.legend.display !== true;
    this.doughnutChartSetUp.update();
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  recordEdit(id){
    const result: any = this.recentRecordsList.find((data) => {
      return data.id === id;
    });
    const dialogRef = this.dialog.open(ManageRecordEditComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {mode: 'edit',id:id, record: result, date:result.recordDate},
      autoFocus: false,
    }).afterClosed().subscribe( result => {
      if (result) {
        this.getRecentRecord();
      }
    })
  }

  recordDelete(id) {
    const result: any = this.recentRecordsList.find((data) => {
      return data.id === id;
    });
    const dialogRef = this.dialog.open(ManageRecordDeleteComponent, {
      minWidth: '450px',
      hasBackdrop: true,
      panelClass: 'my-panel',
      data: {record: result},
      autoFocus: false,
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getRecentRecord();
      }
    })
  }


}
