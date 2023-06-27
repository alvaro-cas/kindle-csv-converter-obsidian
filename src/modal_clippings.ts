import { Modal } from 'obsidian';
import { Setting } from 'obsidian';
import { Notice } from 'obsidian';

let defaultName = true;
let selectedBook;
let noteName;
let enhance = true;

export class Clippings extends Modal {
  constructor(app: App, settings, booksTitle, data) {
    super(app)
    this.settings = settings
    this.booksTitle = booksTitle
    this.data = data
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.createEl('h2',
                       { text: 'Clippings Details',
                         cls: 'h2-modal' });

    new Setting(contentEl)
      .setName('Select book to import')
      .addDropdown((dropdown) => {
        this.booksTitle.forEach(function (value) {
          dropdown.addOption(value, value);
        })

        dropdown
        .setValue(selectedBook)
        .onChange(async value => {
          selectedBook = value;
        })
      })

    new Setting(contentEl)
      .setName('Use book name for note')
      .setDesc('The format is specified in settings')
      .addToggle(text =>
        text
          .setValue(defaultName)
          .onChange(async value => {
            defaultName = value;
            contentEl.empty();
            this.onOpen();
          }))

    if (!defaultName) {
      new Setting(contentEl)
        .setName('Specify name')
        .addText((text) =>
          text.onChange(async value => {
            noteName = value;
          }))
    }

    new Setting(contentEl)
      .setName('Enhance')
      .setDesc('This will remove repeated notes. My Clippings file does not remove any highlight that was deleted; this plugin tries to but may accidentally remove some highlights.')
      .addToggle(text =>
        text
          .setValue(enhance)
          .onChange(async value => {
            enhance = value;
          }))

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText('Generate!')
          .setCta()
          .onClick(() => {
            if (selectedBook != null && selectedBook != '') {
              this.createFileClippings();
              this.close();
            } else {
              new Notice('Please select a book!');
              throw new Error();
            }
          }))
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
    defaultName = true;
    selectedBook = null;
    noteName = null;
    enhance = true;
  }

  createFileClippings() {
    let name;
    if (defaultName) {
      name = selectedBook.replace(/[\[\]\/\\#:"^|]/g, '');
      name = name.replace(/ /g, this.settings.separator);
    } else {
      if (noteName != null && noteName != '') {
        name = noteName.replace(/[\[\]\/\\#:"^|]/g, '');
      } else {
        new Notice('Invalid Name!');
        throw new Error();
      }
    }

    let markdown = '';

    let title = selectedBook.split(' (')[0];
    let author = selectedBook.split('(').pop().slice(0, -1);

    let header = this.settings.header.replace('title', title);
    header = header.replace(/\\n/g, '\n');
    header = header.replace('author', author);

    markdown += header;

    for(let i=0; i < this.data.length; i++) {
      if (selectedBook == this.data[i][0]) {
        if (this.data[i][1] == 'Your Note ') {
          let note = this.settings.note.replace('note', this.data[i][3]);
          note = note.replace(/\\n/g, '\n');
          markdown += note;
        } else {
          let loctN = this.data[i][2].split('-')
          let a = i;

          if (enhance) {
            try {
              let loctA = this.data[i+1][2].split('-')
              if (loctN[0].split(' ').pop() == loctA[0].split(' ').pop() ||
                  loctN.pop() == loctA.pop()) {
                a = i+1
                i++
              }
            } catch {
              continue;
            }
          }

          let highlight = this.settings.highlight.replace('highlight', this.data[a][3]);
          highlight = highlight.replace(/\\n/g, '\n');
          highlight = highlight.replace('location', this.data[a][2].replace(/"/g, ''));

          markdown += highlight;
        }
      }
    }

    this.app.vault.create(`${this.settings.path}/${name}.md`, markdown)
    .then(() => {
      new Notice(`Your notes were succesfully created. Path: ${this.settings.path}`);
    })
    .catch((err) => {
      console.log(err);
      new Notice('File already exists. Please delete and try again.');
    })
  }
}

