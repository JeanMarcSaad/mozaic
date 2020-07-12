<template>
  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-md-3" id="mozaic-settings">
        <div class="row">
          <div class="col-12">
            <div v-for="(range, key) in value_ranges" :key="key" class="input-group input-group-sm mb-3">
              <div class="mozaic-divider" v-if="range.divide"></div>
              <label for="formControlRange">{{ range.name }} : {{ range.curr }}</label>
              <input
                type="range"
                class="form-control-range"
                id="formControlRange"
                :min="range.min" :max="range.max"
                step="1"
                v-model="range.curr"
                >
            </div>
          </div>
        </div>
        <br>
        <div v-if="!saving" class="row align-items-center">
          <div class="col-6 col-lg-6 col-md-12">
            <b-dropdown class="btn shadow-none mozaic-dropdown" text="Save">
              <b-dropdown-item href="#" @click="saveCanvasAsPng">png</b-dropdown-item>
              <b-dropdown-item href="#" @click="saveCanvasAsGif">gif
                <span class="badge badge-pill badge-primary" style="vertical-align: top">beta</span></b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="col-6 col-lg-6 col-md-12">
            <button class="btn shadow-none mozaic-button" @click="randomizeParameters">Randomize</button>
          </div>
        </div>
        <div v-else class="row align-items-center">
          <div class="col-12">
            <b-spinner variant="light" label="Spinning"></b-spinner>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div id="canvas-div" @click="refreshMozaicColors" oncontextmenu="return false;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const P5 = require('p5/lib/p5.min');
const mozaic = require('@/p5.js/Mozaic.js');
const gifApi = require('@/plugins/gif.api.js');

export default {
  data: function() {
    return {
      saving: false,
      value_ranges: {
        circles_per_row: {
          name: "Size",
          min: 50,
          max: 100,
          curr: 75
        },
        draw_percentage: {
          name: "Percentage",
          min: 1,
          max: 100,
          curr: 50
        },
        speed: {
          name: "Speed",
          min: 1,
          max: 7,
          curr: 4
        },
        red_factor: {
          name: "Red",
          min: 0,
          max: 255,
          curr: 125,
          divide: true
        },
        blue_factor: {
          name: "Blue",
          min: 0,
          max: 255,
          curr: 125
        },
        green_factor: {
          name: "Green",
          min: 0,
          max: 255,
          curr: 125
        }
      }
    }
  },
  watch: {
    'value_ranges.circles_per_row.curr': function(val) {
      mozaic.setCircleRow(150-val);
      mozaic.drawCircles(false);
    },
    'value_ranges.draw_percentage.curr': function(val) {
      mozaic.setDrawPercentage(100-val);
      mozaic.drawCircles(false);
    },
    'value_ranges.speed.curr': function(val) {
      mozaic.setSpeed(val);
      mozaic.updateCircleSpeed();
    },
    'value_ranges.red_factor.curr': function(val) {
      mozaic.setRedFactor(val);
    },
    'value_ranges.blue_factor.curr': function(val) {
      mozaic.setBlueFactor(val);
    },
    'value_ranges.green_factor.curr': function(val) {
      mozaic.setGreenFactor(val);
    }
  },
  created() {
    new P5(mozaic.main, "canvas-div")
  },
  methods: {
    refreshMozaicColors() {
      this.value_ranges.red_factor.curr = this.getRandomInteger(40, 255);
      this.value_ranges.blue_factor.curr = this.getRandomInteger(40, 255);
      this.value_ranges.green_factor.curr = this.getRandomInteger(40, 255);
    },
    randomizeParameters() {
      for(var param in this.value_ranges) {
        this.value_ranges[param].curr = this.getRandomInteger(this.value_ranges[param].min, this.value_ranges[param].max);
      }
    },
    getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    saveCanvasAsPng() {
      this.saving = true;
      mozaic.saveCanvasAsPng()
      .then(() =>  { this.saving=false; })
    },
    saveCanvasAsGif() {
      this.saving = true;
      let canvas = document.getElementsByClassName('p5Canvas')[0];
      gifApi.renderGif({canvas: canvas})
      .then(() =>  { this.saving=false; })
    }
  }
}
</script>

<style scoped lang="scss">
div {
  user-select: none;
}
</style>
