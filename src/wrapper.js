import CalendarToogler from './CalendarToogler.vue'

CalendarToogler.install = Vue => Vue.component(CalendarToogler.name, CalendarToogler)
CalendarToogler.version = '1.0.0'

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(CalendarToogler)
}

export default CalendarToogler