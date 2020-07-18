import Vue from 'vue'

import {BDropdown, BDropdownItem, BSpinner, BProgress} from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/css/custom.css'

Vue.component('b-dropdown', BDropdown);
Vue.component('b-dropdown-item', BDropdownItem);
Vue.component('b-spinner', BSpinner);
Vue.component('b-progress', BProgress);