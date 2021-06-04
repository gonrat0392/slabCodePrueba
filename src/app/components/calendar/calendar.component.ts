import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  public events: Array<any> = []
  public eventsAdd: Array<any> = []
  public form!: FormGroup

  week: any = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  monthSelect!: any[];
  firstMonth: any;
  dateSelect: any;
  dateValue: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getDaysFromDate(6, 2021)
    this.eventsAdd = [
      { item: 1, value: 'Recordatorio' },
      { item: 2, value: 'Tarea' },
      { item: 3, value: 'Evento' }
    ]
    this.form = this.formBuilder.group({
      eventAdd: ['', Validators.required],
      date: ['', Validators.required],
      hourInitial: ['', Validators.required],
      minutesInitial: ['', Validators.required],
      horarioInitial: ['', Validators.required],
      hourFinal: ['', Validators.required],
      minutesFinal: ['', Validators.required],
      horarioFinal: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.events = [{
      date: '5-6',
      day:5,
      month:6,
      incident: [
        {
          event: 'Tarea',
          description: 'Evento de prueba',
          hourInitial: '12:00 am',
          hourFinal: '12:00 pm'
        },
        {
          event: 'Recordatorio',
          description: 'Evento de prueba 1',
          hourInitial: '12:00 am',
          hourFinal: '12:00 pm'
        },
        {
          event: 'Evento',
          description: 'Evento de prueba 2',
          hourInitial: '12:00 am',
          hourFinal: '12:00 pm'
        },
        {
          event: 'Evento',
          description: 'Evento de prueba 3',
          hourInitial: '12:00 am',
          hourFinal: '12:00 pm'
        }
      ]
    }]
    /*
    this.events = [
      {
        evento: 'Tarea',
        descripcion: 'Evento de prueba',
        month: 6,
        day: 5
      },
      {
        evento: 'Tarea',
        descripcion: 'Evento de prueba',
        month: 6,
        day: 5
      },
      {
        evento: 'Tarea',
        descripcion: 'Evento de prueba',
        month: 6,
        day: 5
      },
      {
        evento: 'Tarea',
        descripcion: 'Evento de prueba',
        month: 6,
        day: 5
      }
    ]
    */
  }

  getDaysFromDate(month: any, year: any) {

    const startDate = moment(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;
    this.firstMonth = startDate.format('MM')

    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  

  clickDay() {
    let objeto = {}
    let dateSelectedForm = this.form.value.date.split("-")
    let month = parseInt(dateSelectedForm[1])
    let day = parseInt(dateSelectedForm[2])
    let hourInitial = this.form.value.hourInitial + ':' + this.form.value.minutesInitial + ' ' + this.form.value.horarioInitial
    let hourFinal = this.form.value.hourFinal + ':' + this.form.value.minutesFinal + ' ' + this.form.value.horarioFinal
    let date = day + '-' + month
    let indice = -1
    
    for (const i in this.events) {
      if (this.events[i].date.includes(date)) {
        indice = parseInt(i)
      }
    }

    if (indice != -1) {
      let objeto = {
        event: this.form.value.eventAdd,
        description: this.form.value.description
      }
      this.events[indice].incident.push(objeto)
    } else {
      objeto = {
        date: date,
        day: day,
        month: month,
        incident:[{
          event: this.form.value.eventAdd,
          description: this.form.value.description,
          hourInitial: hourInitial,
          hourFinal: hourFinal
        }]
      }
      this.events.push(objeto)
    }
    this.form.reset()
  }
}
