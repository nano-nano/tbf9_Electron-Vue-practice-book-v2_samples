<template>
  <div id="App">
    <b-container>
      <b-row class="mt-2">
        <b-col>
          <h1 class="textCentering">{{displayedSecond}} 秒</h1>
        </b-col>
      </b-row>

      <b-row align-h="between" class="mt-3">
        <b-col>
          <h2>雷まで</h2>
        </b-col>
        <b-col cols="8">
          <h2 class="textEnd">{{displayedMeter}} m</h2>
        </b-col>
      </b-row>
      <b-row class="mt-1" align-v="end">
        <b-col cols="3">
          <h5 class="textCentering">音速</h5>
        </b-col>
        <b-col cols="5">
          <b-form-input v-model="speedOfSounds" number class="textEnd" />
        </b-col>
        <b-col cols="2">
          <h6>m/秒</h6>
        </b-col>
        <b-col>
          <b-icon icon="info" class="h4" v-on:click="showSpeedGuideDialog" />
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <b-button block variant="primary" v-on:click="toggleStartStop">スタート / ストップ</b-button>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col>
          <b-button block variant="danger" v-bind:disabled="isRunningWatch" v-on:click="reset">リセット</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      ds: 0,                 // 計測時間（1/10秒: デシ秒）
      speedOfSounds: 340.29, // 音速（m/秒）
      isRunningWatch: false, // 計測中フラグ
      runningTimer: null,    // 計測タイマーオブジェクト
    }
  },
  computed: {
    displayedSecond: function () {
      return (this.ds / 10).toFixed(1)
    },
    displayedMeter: function () {
      return ((this.ds / 10) * this.speedOfSounds).toFixed()
    }
  },
  methods: {
    toggleStartStop: function () {
      this.isRunningWatch = !this.isRunningWatch
      if (this.runningTimer == null) {
        this.runningTimer = setInterval(() => {
          this.ds++
        }, 100)
      } else {
        clearInterval(this.runningTimer)
        this.runningTimer = null
      }
    },
    reset: function () {
      this.ds = 0
    },
    showSpeedGuideDialog: function () {
      // ダイアログを表示するにはメインプロセスのdialogモジュールが必要
      // しかし、レンダラープロセス上でのremoteモジュールの使用が非推奨になっているので、
      // IRC（プロセス間通信）を利用してダイアログ表示をメインプロセスに委譲する
      // https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31
      ipcRenderer.invoke('showSpeedGuideDialog', null)
    }
  }
}
</script>

<style>
.textCentering {
  text-align: center;
}
.textEnd {
  text-align: end;
}
.textAlignInput {
  vertical-align: baseline;
}
</style>
