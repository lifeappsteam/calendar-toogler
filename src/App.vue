<template>
  <div>
    <CalendarToogler :year="2019" :month="1" :badged-dates="badgedDates" :active-dates="activeDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="2" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="3" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="4" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="5" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="6" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="7" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="8" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="9" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="10" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="11" :badged-dates="badgedDates"></CalendarToogler>
    <CalendarToogler :year="2019" :month="12" :badged-dates="badgedDates"></CalendarToogler>
  </div>
</template>
<script>
import CalendarToogler from './CalendarToogler'

export default {
  name: 'app',
  components: {
    CalendarToogler
  },
  data() {
    return {
      badgedDates: [
        new Date(2019, 2, 10),
        new Date(2019, 8, 7),
        new Date(2019, 0, 1),
        new Date(2019, 11, 25)
      ],
      activeDates: [
        new Date(2019, 0, 1),
        new Date(2019, 0, 2),
        new Date(2019, 0, 3),
        new Date(2019, 0, 4),
        new Date(2019, 0, 5)
      ]
    }
  }
}
</script>
<style lang="less" scoped>

</style>


