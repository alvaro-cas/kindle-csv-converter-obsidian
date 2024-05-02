import { Modal } from 'obsidian';
import { Setting } from 'obsidian';
import { Notice } from 'obsidian';

let defaultName = true;
let noteName;
let iframe = true;

export class CSV extends Modal {
    constructor(app: App, settings, data) {
	super(app)
	this.settings = settings
	this.data = data
    }

    onOpen() {
	let { contentEl } = this;

	contentEl.createEl('h2',
			   { text: 'CSV Details',
                             cls: 'h2-modal' });

	contentEl.createEl('div',
			   { text: `Converting: ${this.data[1][0]}`,
                             cls: 'div-modal' });

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
	    .setName('Show iframe')
	    .setDesc('Shows additional information about your Kindle book.')
	    .addToggle(text =>
		text
		    .setValue(iframe)
		    .onChange(async value => {
			iframe = value;
		    }))

	new Setting(contentEl)
	    .addButton((btn) =>
		btn
		    .setButtonText('Generate!')
		    .setCta()
		    .onClick(() => {
			this.createFileCSV();
			this.close();
		    }))
    }

    onClose() {
	let { contentEl } = this;
	contentEl.empty();
	defaultName = true;
	noteName = null;
	iframe = true;
    }

    createFileCSV() {
	let name;
	if (defaultName) {
	    name = this.data[1][0].replace(/[\[\]\/\\#:"^|]/g, '');
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

	if (iframe) {
	    markdown = `\n<iframe
\ height=600px
\ width=100%
\ src=${this.data[4][0]}></iframe> \n`
	} else {
	    let header = this.settings.header.replace('title', this.data[1][0].replace(/"/g, ''));
	    header = header.replace(/\\n/g, '\n');
	    header = header.replace('author', this.data[2][0].replace(/"/g, ''));

	    markdown += header;
	}

	for(let i=8; i < this.data.length; i++) {
	    if (this.data[i][0] == '"Note"' ||
      		this.data[i][0] == '"Notiz"' ) {
		let note = this.settings.note.replace('note', this.data[i][3].replace(/"/g, ''));
		note = note.replace(/\\n/g, '\n');
		markdown += note;
	    } else {
		let highlight = this.settings.highlight.replace('highlight', this.data[i][3]);
		highlight = highlight.replace(/\\n/g, '\n');
		highlight = highlight.replace('location', this.data[i][1].replace(/"/g, ''));
		markdown += highlight;
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

