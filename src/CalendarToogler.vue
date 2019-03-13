<template>
  <div class="calendar-toogler-root">
    <div class="calendar-toogler-title">{{title}}</div>
    <div class="calendar-toogler-month">
      <div class="calendar-toogler-week-line">
        <div class="calendar-toogler-day calendar-toogler-header">D</div>
        <div class="calendar-toogler-day calendar-toogler-header">S</div>
        <div class="calendar-toogler-day calendar-toogler-header">T</div>
        <div class="calendar-toogler-day calendar-toogler-header">Q</div>
        <div class="calendar-toogler-day calendar-toogler-header">Q</div>
        <div class="calendar-toogler-day calendar-toogler-header">S</div>
        <div class="calendar-toogler-day calendar-toogler-header">S</div>
      </div>
      <div class="calendar-toogler-week-line" v-for="(week, i) in weekSet" :key="i">
          <div :class="{
            'calendar-toogler-appended': true,
            'calendar-toogler-day': true,
            'calendar-toogler-actionable': true,
            'calendar-toogler-active': dayInSet(day, activeDates),
            'calendar-toogler-other-month': day.monthIndex + 1 !== month }"
            v-for="day in week"
            :key="day.id"
            @click='(e) => clicked(e, day)'
            @mouseenter="(e) => hovered(e, 'enter', day)"
            @mouseleave="(e) => hovered(e, 'leave', day)"
            >
            <div class="calendar-toogler-badge" v-show="dayInSet(day, badgedDates)"></div>
            {{day.day}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as JsonCalendar from 'json-calendar'
import Vue from 'vue'

export default {
  name: 'calendar-toogler',
  props: {
    year: Number,
    month: Number,
    badgedDates: Array,
    activeDates: Array
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
    this.$emit('calendar-start', this.calendar)
  },
  methods: {
    getMonthName() {
      return this.monthNames[this.month - 1]
    },
    dayInSet(day, set) {
      let simpleDate = new Date(day.year, day.monthIndex, day.day)
      return (set || []).map(d => d.getTime()).indexOf(simpleDate.getTime()) >= 0
    },
    clicked (e, payload) {
      this.$emit('click-day', {
        target: e.currentTarget,
        payload
      })
    },
    hovered (e, hoverType, payload) {
      this.$emit('hover-day', {
        target: e.currentTarget,
        payload,
        hoverType
      })
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
  @daySize: 20px;
  @dayPadding: 4px;
  @dayMarging: 3px;
  @fontFamily: "Open Sans", Helvetica, Arial, sans-serif;
  @monthPadding: 10px;

  .calendar-toogler-root {
    font-family: @fontFamily;
    font-size: 16px;
    display: inline-block;
    margin: 10px;
  }
  .calendar-toogler-month {
    border: 0px solid blue;
    width: calc((@daySize + @dayPadding + @dayMarging) * 7 + 10px);
    padding: @monthPadding;
  }
  .calendar-toogler-week-line {
    display: flex;
  }
  .calendar-toogler-title {
    font-weight: Bold;
    padding-left: 16px;
  }
  .calendar-toogler-day {
    flex: 1;
    &.calendar-toogler-actionable {
      cursor: pointer;
    }
    &.calendar-toogler-active {
      border-color: green;
    }
    &.calendar-toogler-header {
      color: #adadad;
      border: 0px;
    }
    &.calendar-toogler-other-month {
      visibility: hidden;
    }
    font-size: calc(@daySize * 0.5);
    line-height: 11px;
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
    height: calc(@daySize + 2px);
    display: inline-block;
    .calendar-toogler-badge {
      width: 8px;
      height: 8px;
      background: gold;
      margin-bottom: 1em;
      float: right;
      margin-right: -6px;
      border-radius: 16px;
      margin-left: -8px;
      margin-top: -6px;
    }
  }
</style>
