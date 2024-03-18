import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminServiceService } from '../../../core/services/admin-service/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-chart',
  standalone: true,
  imports: [],
  templateUrl: './blog-chart.component.html',
  styleUrl: './blog-chart.component.css'
})
export class BlogChartComponent implements OnInit {
  constructor( private route: ActivatedRoute ) {}
  ngOnInit(): void {
    this.getChartData()
  }
  public chart: any;
  chartDetails: any;

  getChartData() {
    // this.adminService.getChartDetails().subscribe({
    //   next:(data:any) => {
    //     this.chartDetails = data
    //     this.createChart(data)
    //   },
    //   error:(error) => {
    //     alert(error.message)
    //   }
    // })
    this.chartDetails = this.route.snapshot.data['chartDetails']
    this.createChart(this.chartDetails)
  }

  createChart(data:any) {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: data?.days?.slicedDate,
        datasets: [
          {
            label: "Blogs",
            data: data?.blogs,
            backgroundColor: 'blue'
          },
          {
            label: "Users",
            data: data?.users,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }

}
