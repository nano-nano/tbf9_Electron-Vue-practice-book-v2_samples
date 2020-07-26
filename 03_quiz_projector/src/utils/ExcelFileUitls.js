'use strict'

import XlsxPopulate from 'xlsx-populate'

export default class ExcelFileUtils {

    /**
     * クイズデータをインポートする
     * 
     * @param {string} path インポートするExcelファイルの完全パス
     * @returns クイズデータ（question: 問題文, answer: 解答）の配列
     */
    static async importQuizData(path) {
        let quizDatas = []
        const workbook = await XlsxPopulate.fromFileAsync(path)
        // 1枚目のシートを参照する
        const sheet = workbook.sheet(0)
        let questionCell = sheet.cell('A2')
        while (questionCell.value() || questionCell.value() === 0) {
            // 問題文列に空セル(undefined)が現れるまでループ
            // undefinedはfalseを返すことを利用している（ただし、0もfalseを返してしまうので例外処理を追加）
            quizDatas.push({
                question: this._formatImportedText(questionCell.value()),
                answer: this._formatImportedText(questionCell.relativeCell(0, 1).value())
            })
            questionCell = questionCell.relativeCell(1, 0)
        }
        return quizDatas
    }

    static _formatImportedText (target) {
        if (Array.isArray(target)) {
          // セル内の文字の一部に書式が設定されているような場合、こちらのフローに入る
          return target.filter(prop => prop.name === 'r').map(r => r.children.filter(prop => prop.name === 't')[0].children[0]).join('')
        } else {
          return target
        }
      }
}