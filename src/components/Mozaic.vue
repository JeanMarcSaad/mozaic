<template>
  <div class="container container-table">
    <div class="row vertical-center-row">
      <div class="col-md-3" id="mozaic-settings">
        <div class="row align-items-center">
          <div class="col-12">
            <div
              v-for="(range, key) in value_ranges"
              :key="key"
              class="input-group input-group-sm mb-3"
            >
              <div class="mozaic-divider" v-if="range.divide" />
              <label for="formControlRange">{{ range.name }}<span v-if="range.showCurr"> : {{ range.curr }}</span></label>
              <input
                type="range"
                class="form-control-range"
                id="formControlRange"
                :min="range.min"
                :max="range.max"
                step="1"
                v-model="range.curr"
              />
            </div>
            <br>
          </div>
          <div v-if="!saving" class="col-6 col-lg-6 col-md-12">
            <b-dropdown class="btn shadow-none mozaic-dropdown" text="Save">
              <b-dropdown-item href="#" @click="saveCanvasAsPng">png</b-dropdown-item>
              <b-dropdown-item href="#" @click="saveCanvasAsGif">gif</b-dropdown-item>
            </b-dropdown>
          </div>
          <div v-if="!saving" class="col-6 col-lg-6 col-md-12">
            <button class="btn shadow-none mozaic-button" @click="randomizeParameters">Randomize</button>
          </div>
          <div v-else class="col-12">
            <b-progress v-if="showGifProgressBar" :value="progress" :max="max" variant="dark" show-progress animated></b-progress> 
            <b-spinner v-else variant="light" label="Spinning" />
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div id="canvas-div" @click="refreshMozaicColors" oncontextmenu="return false;" />
      </div>
    </div>
  </div>
</template>

<script>
import P5 from "p5/lib/p5.min";
import * as mozaic from "@/p5.js/Mozaic.js";
import gifApi from "@/plugins/gif.api.js";

export default {
  data: () => {
    return {
      saving: false,
      progress: 0,
      max: 100,
      value_ranges: {
        circles_per_row: {
          name: "Size",
          min: 90,
          max: 120,
          curr: 100,
          showCurr: false
        },
        draw_percentage: {
          name: "Percentage",
          min: 1,
          max: 100,
          curr: 50,
          showCurr: false
        },
        speed: {
          name: "Speed",
          min: 1,
          max: 7,
          curr: 4,
          showCurr: false
        },
        red_factor: {
          name: "Red",
          min: 0,
          max: 255,
          curr: 125,
          showCurr: true,
          divide: true
        },
        blue_factor: {
          name: "Blue",
          min: 0,
          max: 255,
          curr: 125,
          showCurr: true
        },
        green_factor: {
          name: "Green",
          min: 0,
          max: 255,
          curr: 125,
          showCurr: true
        }
      }
    };
  },
  computed: {
    showGifProgressBar() {
      return this.progress != 0;
    }
  },
  watch: {
    "value_ranges.circles_per_row.curr": (val) => {
      mozaic.setCircleRow(200 - val);
      mozaic.drawCircles(false);
    },
    "value_ranges.draw_percentage.curr": (val) => {
      mozaic.setDrawPercentage(100 - val);
      mozaic.drawCircles(false);
    },
    "value_ranges.speed.curr": (val) => {
      mozaic.setSpeed(val);
      mozaic.updateCircleSpeed();
    },
    "value_ranges.red_factor.curr": (val) => {
      mozaic.setRedFactor(val);
    },
    "value_ranges.blue_factor.curr": (val) => {
      mozaic.setBlueFactor(val);
    },
    "value_ranges.green_factor.curr": (val) => {
      mozaic.setGreenFactor(val);
    }
  },
  created() {
    new P5(mozaic.main, "canvas-div");
  },
  methods: {
    refreshMozaicColors() {
      this.value_ranges.red_factor.curr = this.getRandomInteger(40, 255);
      this.value_ranges.blue_factor.curr = this.getRandomInteger(40, 255);
      this.value_ranges.green_factor.curr = this.getRandomInteger(40, 255);
    },
    randomizeParameters() {
      for (var param in this.value_ranges) {
        this.value_ranges[param].curr = this.getRandomInteger(
          this.value_ranges[param].min,
          this.value_ranges[param].max
        );
      }
    },
    getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    saveCanvasAsPng() {
      this.saving = true;
      setTimeout(() => {
        mozaic.saveCanvasAsPng()
        .then(() => { this.saving = false });
      }, 500);
    },
    saveCanvasAsGif() {
      this.saving = true;
      let canvas = document.getElementsByClassName("p5Canvas")[0];
      let updateProgress = (progress) => {
        this.progress = Math.floor(progress*100);
      };
      gifApi.renderGif({ canvas: canvas, progressMethod: updateProgress })
      .then(() => {
        this.progress = 0;
        this.saving = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
div {
  user-select: none;
}
</style>
