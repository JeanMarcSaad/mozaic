<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3" id="mozaic-settings">
        <div class="row">
          <div class="col-12">
            <div v-for="(range, key) in value_ranges" :key="key" class="input-group mb-2">
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
        <div class="row">
          <div class="col-12">
            <button class="btn shadow-none mozaic-button" @click="randomizeParameters">Randomize</button>
          </div>
        </div>
        <br>
        <div class="row align-items-center">
          <div class="col-6">
            <button class="btn shadow-none mozaic-button" @click="saveCanvasAsPng">PNG</button>
          </div>
          <div class="col-6">
            <button class="btn shadow-none mozaic-button" @click="saveCanvasAsGif">Gif</button>
          </div>
        </div>
        <br>
      </div>
      <div class="col-md-9">
        <div id="canvas-div" @click="refreshMozaicColors" oncontextmenu="return false;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const P5 = require('p5');
const mozaic = require('@/p5.js/Mozaic.js')
export default {
  data: function() {
    return {
      value_ranges: {
        circles_per_row: {
          name: "Circles Per Row",
          min: 70,
          max: 90,
          curr: 80
        },
        draw_percentage: {
          name: "Draw Percentage",
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
          curr: 125
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
      mozaic.setCircleRow(val); 
      mozaic.drawCircles(false)
    },
    'value_ranges.draw_percentage.curr': function(val) {
      mozaic.setDrawPercentage(100-val); 
      mozaic.drawCircles(false)
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
      mozaic.saveCanvasAsPng()
    },
    saveCanvasAsGif() {
      mozaic.saveCanvasAsGif()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
  user-select: none;
}

.mozaic-button {
  background-color: rgba(150,34,66, 0.6);
  outline: none;
  overflow: visible;
  border-style: none;
  width: 6em;
  text-align: center;
  color: whitesmoke;
}

.mozaic-button:active {
  background-color: rgba(150,34,66, 0.4);
  outline: none;
  border-style: none;
  border-width: 0;
}

.mozaic-button:focus {
  outline: none;
  border-style: none;
  border-width: 0;
}

.form-control-range {
  background: linear-gradient(to right, rgba(150,34,66, 0.6) 0%, rgb(100,34,66, 0.9) 100%);
  border-radius: 8px;
  height: 7px;
  width: 356px;
  outline: none;
  transition: background 450ms ease-in;
  -webkit-appearance: none;
}

.form-control-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background: linear-gradient(to right, darkgrey 0%, whitesmoke 100%);
  cursor: pointer;
}

#mozaic-settings {
  background: rgba(255, 255, 255, 0.075);
}

#canvas-div {
  overflow: hidden;
  cursor: pointer;
  user-select: none;


  width: 100%;
  max-height: 40em;

  border-style: solid;
  border-width: 3px;
  border-color: grey;
}

#canvas-ui {
  display: inline-block;
  align-self: right;
}
</style>