import { Modal } from 'obsidian';
import { setIcon } from 'obsidian';
import { Clippings } from './modal_clippings';
import { CSV } from './modal_csv';

const fs = require('fs');
const readline = require('readline');

export class Reader extends Modal {
  constructor(app: App, settings) {
    super(app)
    this.settings = settings
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.createEl('h2',
                       { text: 'Kindle CSV to Obsidian',
                         cls: 'h2-modal' });

    const container = contentEl.createDiv({ cls: 'container-modal' });

    const csv = container.createDiv();
    const csvIcon = csv.createDiv({ cls: 'icon-modal' });
    setIcon(csvIcon, 'upload');
    csvIcon.createEl('div',
                     { text: 'Select my CSV file',
                       cls: 'text-modal' });
    csvIcon.onclick = _this => {
      this.createFileCSV();
    }

    const clippings = container.createDiv();
    const clippingsIcon = clippings.createDiv({ cls: 'icon-modal' });
    setIcon(clippingsIcon, 'paperclip');
    clippingsIcon.createEl('div',
                           { text: 'Select My Clippings file',
                             cls: 'text-modal' });
    clippingsIcon.onclick = _this => {
      this.createFileClippings();
    }
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }

  createFileCSV() {
    let input = activeDocument.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = _this => {
      const stream = fs.createReadStream(input.files[0]['path']);
      const reader = readline.createInterface({ input: stream });

      let data = [];

      reader.on('line', (row) => {
        let line = row.split(',');
        let result = line.splice(0, 3);

        result.push(line.join(','));
        data.push(result);
      })

      reader.on('close', () => {
        new CSV(this.app, this.settings, data).open();
      })
    }
    input.click();
    this.close();
  }

  createFileClippings() {
    let input = activeDocument.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = _this => {
      const stream = fs.createReadStream(input.files[0]['path']);
      const reader = readline.createInterface({ input: stream });

      let data = [];
      let booksTitles = [];
      let beforeRow = '1';
      let before2Row = '';
      let before3Row = '';
      let index = 0;

      reader.on('line', (row) => {
        row = row.replace(/\uFEFF/gm, '');

        if (row.slice(-1) == ')' &&
            (beforeRow == '==========' || beforeRow == '1')) {
          if (booksTitles.indexOf(row) == -1) {
            booksTitles.push(row);
          }
        }

        let loct = before2Row.split(" | ")
        loct.length == 3 ? loct = loct[1] : loct = loct[0].split(' on ')[1]

        if (before2Row.includes('Highlight') ||
            before2Row.includes('Markierung')) {
          data.push([before3Row, 'Your Highlight ', loct, row, index])
        }

        if (before2Row.includes('Note') ||
          before2Row.includes('Notiz')) {
          data.push([before3Row, 'Your Note ', '', row, index])
        }

        before3Row = before2Row;
        before2Row = beforeRow;
        beforeRow = row;
        index++;
      })

      reader.on('close', () => {
        new Clippings(this.app, this.settings, booksTitles, data).open();
      })
    }

    input.click();
    this.close();
  }
}

