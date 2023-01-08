import { Modal, Notice, setIcon } from 'obsidian';

const fs = require('fs');
const readline = require('readline');

export class reader extends Modal {
  constructor(app: App, settings) {
    super(app)
    this.settings = settings
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.createEl('h2', { text: 'Kindle CSV to Obsidian', cls: 'h-modal' });

    const divMain = contentEl.createDiv({ cls: 'main-div' });
    const divIcon = divMain.createDiv({ cls: 'file-up-div' });
    setIcon(divIcon, 'file-up');
    divIcon.createEl('div', { text: 'Choose your file', cls: 'div-modal' });
    divIcon.onclick = _this => {
      this.createFile();
    }
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }

  createFile() {
    let input = document.createElement('input');
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
        let name = data[1][0].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        name = name.replace(/ /g, this.settings.separator);

        let markdown;

        if (this.settings.iframe == true) {
          markdown = `\n<iframe
          \ height=600px
          \ width=100%
          \ src=${data[4][0]}></iframe> \n`
        } else {
          markdown = `${data[0][0].replace(/"/g, '')} `
                  +  `${data[1][0].replace(/"/g, '')} `
                  +  `${data[2][0].replace(/"/g, '')} \n`
        }

        for(let i=8; i < data.length; i++) {
          if (data[i][0] == '"Note"') {
            let note = this.settings.note.replace('note', data[i][3].replace(/"/g, ''));
            note = note.replace(/\\n/g, '\n');
            markdown += note;
          } else {
            let highlight = this.settings.highlight.replace('highlight', data[i][3]);
            highlight = highlight.replace(/\\n/g, '\n');
            highlight = highlight.replace('location', data[i][1].replace(/"/g, ''));
            markdown += highlight;
          }
        }

        this.app.vault.create(`${this.settings.path}/${name}.md`, markdown)
        .then(() => {
          new Notice(`Your notes were succesfully created. \
                     Path: ${this.settings.path}`);
        })
        .catch((err) => {
          console.log(err);
          new Notice('File already exists. Please delete and try again.');
        })
      })
    }
    input.click();
    this.close();
  }
}

