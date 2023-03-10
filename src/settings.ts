import { PluginSettingTab } from 'obsidian';
import { Setting } from 'obsidian';
import { TFolder } from 'obsidian';
import _ from 'lodash';
import { Reader } from './modal_read';

let ribbonKindle = null;

interface KindleCsvPluginSettings {
  path: string
  separator: string
  iframe: boolean
  highlight: string
  note: string
}

export const DEFAULT_SETTINGS: KindleCsvPluginSettings = {
  path: '/',
  separator: '_',
  iframe: true,
  highlight: '*** \\n \\n > [!quote] location \\n *highlight* \\n \\n',
  note: '**Note** \\n > note \\n \\n',
}

export class KindleSettings extends PluginSettingTab {
  constructor(app: App, plugin: KindleCsvPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h3', { text: 'Settings: Kindle CSV Converter' });

    new Setting(containerEl)
      .setName('Path for saving')
      .setDesc('This is the path were your notes will be saved.')
      .addDropdown((dropdown) => {
        let folders = []
        for (let file of this.app.vault.getAllLoadedFiles()) {
          if (file instanceof TFolder) {
            folders.push(file);
          }
        }

        folders.forEach(function (value) {
          dropdown.addOption(value['path'], value['path']);
        })

        dropdown
        .setValue(this.plugin.settings.path)
        .onChange(async value => {
          this.plugin.settings.path = value;
          await this.plugin.saveSettings();
        })
      })

    new Setting(containerEl)
      .setName('Separator')
      .setDesc('This is how the file name will be formatted. Example: "Title of my book" is going to be "Title_of_my_book".')
      .addText(text =>
        text
          .setPlaceholder('Default is "_"')
          .setValue(this.plugin.settings.separator)
          .onChange(async value => {
            this.plugin.settings.separator = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Show iframe')
      .setDesc('Shows additional information of your Kindle book.')
      .addToggle(text =>
        text
          .setValue(this.plugin.settings.iframe)
          .onChange(async value => {
            this.plugin.settings.iframe = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Highlight')
      .setDesc(`This represents how the highlight will be formatted. Default: ${DEFAULT_SETTINGS['highlight']}`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.highlight)
          .onChange(async value => {
            this.plugin.settings.highlight = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName('Note')
      .setDesc(`This represents how the note will be formatted. Default: ${DEFAULT_SETTINGS['note']}`)
      .addText(text =>
        text
          .setValue(this.plugin.settings.note)
          .onChange(async value => {
            this.plugin.settings.note = value;
            await this.plugin.saveSettings();
      }))

    containerEl.createEl('h3', { text: 'Support me!' });

    const div = this.containerEl.createDiv("coffee");
    div.createEl("a", {
      href: "https://www.buymeacoffee.com/alvaro.cas"
    }).createEl("img", {
      attr: {
        src: "https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=???&slug=alvaro.cas&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"
      }
    })
  }
}
