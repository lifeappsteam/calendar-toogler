<template>
  <div class="root">
    <div class="title">{{title}}</div>
    <div class="month">
      <div class="row">
        <div class="day header">D</div>
        <div class="day header">S</div>
        <div class="day header">T</div>
        <div class="day header">Q</div>
        <div class="day header">Q</div>
        <div class="day header">S</div>
        <div class="day header">S</div>
      </div>
      <div class="row" v-for="(week, i) in weekSet" :key="i">
          <div :class="{
            'appended': true,
            'day': true,
            'actionable': true,
            'tooltip-target': true,
            'active': dayInSet(day, activeDates),
            'other-month': day.monthIndex + 1 !== month }"
            v-for="day in week"
            v-tooltip
            :key="day.id">
            <div class="badge" v-show="dayInSet(day, badgedDates)"></div>
            {{day.day}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as JsonCalendar from 'json-calendar'
import Vue from 'vue'
import { VTooltip, VOpenOpover, VPopover, VClosePopover } from 'v-tooltip'

export default {
  name: 'calendar-toogler',
  props: {
    year: Number,
    month: Number,
    badgedDates: Array,
    activeDates: Array
  },
  directives: {
    'close-popover': VClosePopover,
    'tooltip': VTooltip
  },
  components: {
    'v-popover': VPopover
  },
  data () {
    return {
      calendar: new JsonCalendar({ today: new Date(this.year, this.month - 1, 1) }),
      monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ]
    }
  },
  created() {
    console.log(this.calendar)
  },
  methods: {
    getMonthName() {
      return this.monthNames[this.month - 1]
    },
    dayInSet(day, set) {
      let simpleDate = new Date(day.year, day.monthIndex, day.day)
      return (set || []).map(d => d.getTime()).indexOf(simpleDate.getTime()) >= 0
    }
  },
  computed: {
    title() {
      return `${this.getMonthName()} ${this.year} `
    },
    weekSet() {
      return this.calendar.weeks
    }
  }
}
</script>

<style lang="less" scoped>
  @daySize: 1.5rem;
  @dayPadding: 0.1rem;
  @dayMarging: 0.3rem;
  @fontFamily: "Open Sans", Helvetica, Arial, sans-serif;

  @monthPadding: 0.4rem;

  .root {
    font-family: @fontFamily;
    font-size: 16px;
    display: inline-block;
    margin: 10px;
  }
  .month {
    border: 0px solid blue;
    width: calc((@daySize + @dayPadding + @dayMarging) * 7 + 1rem);
    padding: @monthPadding;
  }
  .row {
    display: flex;
  }
  .title {
    font-weight: Bold;
    padding-left: 1rem;
  }
  .day {
    flex: 1;
    &.actionable {
      cursor: pointer;
    }
    &.active {
      border-color: green;
    }
    &.header {
      color: #adadad;
      border: 0px;
    }
    &.other-month {
      visibility: hidden;
    }
    font-size: calc(@daySize * 0.5);
    line-height: 1.1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
    justify-self: start;
    text-align: center;
    border-radius: @daySize;
    border-width: 2px;
    border-color: lightcoral;
    border-style: solid;
    padding: @dayPadding;
    margin: @dayMarging;
    width: @daySize;
    height: @daySize;
    display: inline-block;
    .badge {
      width: 8px;
      height: 8px;
      background: gold;
      margin-bottom: 1em;
      float: right;
      margin-right: -3px;
      border-radius: 1em;
      margin-left: -8px;
      margin-top: -3px;
    }
  }
</style>
