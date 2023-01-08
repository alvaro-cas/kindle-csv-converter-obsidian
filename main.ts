import { App, Plugin } from 'obsidian';

import { DEFAULT_SETTINGS, kindleSettings } from './settings';
import { reader } from './modal_read';

export default class kindleCsvPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.addRibbonIcon("library", "Kindle CSV Converter", () => {
      new reader(this.app, this.settings).open();
    });

    this.addCommand({
      id: 'kindle-csv-converter',
      name: 'Choose File',
      checkCallback: (checking: boolean) => {
        let leaf = this.app.workspace.activeLeaf;
        if (leaf) {
          if (!checking) {
            new reader(this.app, this.settings).open();
          }
          return true;
        }
        return false;
      }
    })

    this.addSettingTab(new kindleSettings(this.app, this));

  }

  onunload() {
    console.log('unloading plugin');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
