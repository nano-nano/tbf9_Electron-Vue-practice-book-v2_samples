'use strict'

import fsExtra from 'fs-extra'

const SETTING_FILE_NAME = 'settings.json'

export default class SettingsFileUitls {

  /**
   * 指定したデータを設定ファイル（json）として保存します
   * 
   * @param {string} basePath 
   * @param {object} data 
   */
  static saveSettingsFile(basePath, data) {
    const filePath = basePath + '/json/' + SETTING_FILE_NAME
    return fsExtra.outputJson(filePath, data)
  }

  /**
   * 設定ファイル（json）を読み込みます
   * 
   * @param {string} basePath 
   */
  static loadSettingsFile(basePath) {
    const filePath = basePath + '/json/' + SETTING_FILE_NAME
    return fsExtra.readJson(filePath, { throws: false })
  }
}