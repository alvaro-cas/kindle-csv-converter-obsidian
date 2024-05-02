import { App } from 'obsidian';
import { Plugin } from 'obsidian';

import { DEFAULT_SETTINGS } from './src/settings';
import { KindleSettings } from './src/settings';
import { Reader } from './src/modal_read';

export default class KindleCsvPlugin extends Plugin {
    async onload() {
	await this.loadSettings();

	this.addRibbonIcon("library", "Kindle CSV Converter", () => {
	    new Reader(this.app, this.settings).open();
	});

	this.addCommand({
	    id: 'choose-file',
	    name: 'Choose File',
	    checkCallback: (checking: boolean) => {
		if (!checking) {
		    new Reader(this.app, this.settings).open();
		}
		return true;
	    }
	})

	this.addSettingTab(new KindleSettings(this.app, this));

    }

    onunload() {
	console.log('Unloading plugin');
    }

    async loadSettings() {
	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
	await this.saveData(this.settings);
    }
}
