import VueCharts from 'vue-chartjs';
import { Component, mixins, Prop } from 'nuxt-property-decorator';
 
@Component
export default class BarChart extends mixins(VueCharts.Bar, VueCharts.mixins.reactiveProp) {
  @Prop({ default: () => {} }) readonly chartData!: Chart.ChartData;
  @Prop({ default: () => {} }) readonly options!: Chart.ChartOptions;

  mounted() {
    this.renderChart(
      this.chartData,
      {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true
        },
        title: {
          display: false,
          text: '',
          fontSize: 24,
          fontColor: ''
        },
        tooltips: {
          backgroundColor: ''
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ]
        },
        ...this.options
      }
    )
  }
}