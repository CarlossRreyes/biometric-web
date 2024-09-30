import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '../gestion-usuario/interfaces/urlActivatedRoute.interface';
import Chart from 'chart.js/auto';
import { GeneralService } from '@app/services/general.service';
import { DatosList } from './interfaces/dashboard.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';

import * as Highcharts from 'highcharts';

import * as JSC from 'jscharting';

declare const JSCc: any;




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formRegresionLineal!: FormGroup;
  listaUrl: IntUrlActivate[] = [];

  listaCount: DatosList[] = [];

  listaTipoAsistencia: any[] = [];

  listaTemporalidad: any[] = [
    {
      id_temp: 1,
      temporalidad: 'Día'
    },
    {
      id_temp: 2,
      temporalidad: 'Mes',
    },
    {
      id_temp: 3,
      temporalidad: 'Año',
    }
  ]

  //
  currentConfig: any;
  chart: any;
  labels: any[] = [];


  chart1: any;

  bandRegresionLinealAsistencia : boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private _gs: GeneralService,
    private fb: FormBuilder,
    private dash_service: DashboardService
  ) {}

  ngOnInit(): void {
    this.listaUrl = this.activedRoute.snapshot.url;
    this.initFormEvento();
    this.chartBar();
    this.donutArcHorasExtras();
    this.chartDoughnut();
    this.getAllCount();
    this.cargarTipoAsistencia();
  }


  initFormEvento() {
    this.formRegresionLineal = this.fb.group({

      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      id: ['', [Validators.required]],
      id_temp: ['', [Validators.required]],
    });
  }


  cargarTipoAsistencia() {

    this.dash_service.cargarTipoAsistencia().subscribe({
      next: (response) => {
        this.listaTipoAsistencia = response.data;
      },
      error: (error) => {
        console.log("Error tipo de asistencia: ", error)
      }
    });

  }

  fieldsValidate(campo: string) {
    return this.formRegresionLineal.get(campo)?.invalid && this.formRegresionLineal.get(campo)?.touched;
  }


  getAllCount() {
    this._gs.getCountList().subscribe((resp) => {
      this.listaCount = resp.data;
    });
  }


  chartBar() {
    this._gs.cargartendenciaAsistenciaGlobales().subscribe({
      next: (resp) => {
        if (resp.data) {
          const ctx = document.getElementById('myChart') as HTMLCanvasElement;

          if (ctx !== null) {
            // El elemento existe, así que podemos pasarlo como argumento
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: resp.data.labels,
                datasets: [{
                  label: '# de asistencias',
                  data: resp.data.asistencia,
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });

          } else {
            console.error("El elemento no existe en la página");
          }

        }
      },
      error: (err) => {

      }
    })



  }

  donutArcHorasExtras() {
    let fi = '2023-01-01';
    let ff = '2023-12-31';

    this.dash_service.horasExtras(fi, ff).subscribe({
      next: (resp) => {
        //console.log(resp);

        const chart = JSC.chart('chartDiv', { 
          debug: false, 
          type: 'pie donut', 
          title: { 
            position: 'center', 
            label_text: ' '
          }, 
          legend_position: 'inside right top', 
          defaultSeries: { 
            angle: { orientation: 90, sweep: 20 }, 
            shape: { innerSize: '70%' }, 
            defaultPoint_label_text: '<b>%name</b>'
          }, 
          series: resp.series,
          toolbar_visible: false
        }); 

        // const ctx = document.getElementById('totalHorasExtrasKpi') as HTMLCanvasElement;

        // if (ctx !== null) {
        //   // const labels = Array.from({ length: 7 }, (_, index) => {
        //   //   const date = new Date();
        //   //   date.setMonth(date.getMonth() - index);
        //   //   return date.toLocaleString('default', { month: 'long' });
        //   // });

        //   const data = {
        //     labels: resp.labels,
        //     datasets: [{
        //       axis: 'y',
        //       label: 'My First Dataset',
        //       data: resp.data,
        //       fill: false,
        //       backgroundColor: [
        //         'rgba(255, 99, 132, 0.2)',
        //         'rgba(255, 159, 64, 0.2)',
        //         'rgba(255, 205, 86, 0.2)',
        //         'rgba(75, 192, 192, 0.2)',
        //         'rgba(54, 162, 235, 0.2)',
        //         'rgba(153, 102, 255, 0.2)',
        //         'rgba(201, 203, 207, 0.2)'
        //       ],
        //       borderColor: [
        //         'rgb(255, 99, 132)',
        //         'rgb(255, 159, 64)',
        //         'rgb(255, 205, 86)',
        //         'rgb(75, 192, 192)',
        //         'rgb(54, 162, 235)',
        //         'rgb(153, 102, 255)',
        //         'rgb(201, 203, 207)'
        //       ],
        //       borderWidth: 1
        //     }]
        //   };

        //   new Chart(ctx, {
        //     type: 'bar',
        //     data,
        //     options: {
        //       indexAxis: 'y',
        //       responsive: true, // Hace que el gráfico sea sensible al tamaño del contenedor
        //       maintainAspectRatio: false, // Permite que el gráfico cambie su relación de aspecto

        //     }
        //   });
        // } else {
        //   console.error("El elemento no existe en la página");
        // }

      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  chartDoughnut() {
    const ctx = document.getElementById('myChart3') as HTMLCanvasElement;

    if (ctx !== null) {
      const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

      new Chart(ctx, {
        type: 'doughnut',
        data: data,
      });
    } else {
      console.error("El elemento no existe en la página");
    }

  }

  regresionLineal() {
    const form = this.formRegresionLineal.value;
    let temporalidad_id = parseInt(form.id_temp);
    let tipo_asistencia_id = parseInt(form.id);
    let fechaInicio = form.fechaInicio
    let fechaFin = form.fechaFin;

    this.dash_service.regresionLinealAsistencia(temporalidad_id, tipo_asistencia_id, fechaInicio, fechaFin).subscribe({
      next: (resp) => {
        //console.log(resp);

        if (resp.status) {

          let puntos = resp.data.puntos;
          let textTemporalidad = '';

          if (temporalidad_id == 1) textTemporalidad = 'día';
          else if (temporalidad_id == 2) textTemporalidad = 'mes';
          else if (temporalidad_id == 3) textTemporalidad = 'año';

          let proyeccion = puntos.proyeccion.y;
          let proF = proyeccion.toFixed(3);

          Highcharts.chart('container', {
            title: {
              text: 'Gráfica de regresión lineal de Asistencias'
            },
            xAxis: {
              min: -0.5,
              max: 5.5
            },
            yAxis: {
              min: 0
            },
            series: [{
              type: 'line',
              name: 'Regresión lineal',
              data: [puntos.inicio.x, puntos.inicio.y],
              marker: {
                enabled: false
              },
              states: {
                hover: {
                  lineWidth: 0
                }
              },
              enableMouseTracking: false
            }, {
              type: 'scatter',
              name: 'Observations',
              data: [resp.data.datos],
              marker: {
                radius: 4
              }
            }]
          });

        } else {

          console.log("No hay proyecciones de asistencias");

        }
      },
      error: (err) => {
        console.log(err);

      }
    })


  }

}
