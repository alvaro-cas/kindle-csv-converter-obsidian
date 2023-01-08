# Kindle CSV Converter Obsidian
***
**Create useful Kindle notes in [Obsidian.md](https://obsidian.md/) vault.** 

![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss.jpg?raw=true)

> Sample image using Iframe(left) and no Iframe(right), with default configuration.

***

## Introduction

This obsidian plugin is for converting your notes in .csv format to an Obsidian file. For exporting your notes in csv format refer to [this site/Import from kindle device](https://medium.com/@keisuke_w/how-to-export-kindle-notes-and-highlights-ebce5812bbfc), you will receive your file .csv file in your mail. 
The reason I created this plugin is because I did not wanted to leave my Amazon account in Obsidian, on the other hand clipplings.txt file disapears when you constantly delete books. If this is not your case please use this awesome [plugin](https://github.com/hadynz/obsidian-kindle-plugin).

***

## Installation
You can install the plugin manually:

#### 1. Go to releases section on github
![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_003.jpg?raw=true)
Click on the latest version.

#### 2. Donwload files
Download `main.js`, `manifest.json` and `style.css`
![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_004.jpg?raw=true)

#### 3. Move files to vault
Copy over `main.js`, `manifest.json` and `style.css` to this location inside your vault: `VaulName/.obsidian/plugins/kindle-csv-converter`. (create kindle-csv-converter folder)

***

## Usage
You open Kindle CSV Converter in two different ways: 

#### 1.Command Palette
Press Ctrl+P or selected hotkey to open the command palette. Search for "Kindle CSV Converter" or "Choose File".
![](https://raw.githubusercontent.com/alvaro-cas/kindle-csv-converter-obsidian/main/assets/ss_001.jpg)

#### 2. Ribbon Icon
Navigate to the left sidebar, select the ribbon with a library icon.
![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_000.jpg?raw=true)

### Import your file
After following either option 1 or 2, a modal will appear.
![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_002.jpg?raw=true)
Click on the box, File Explorer will open, choose your .csv file. Finally open your selected file. Now your file is converted!

> Note: Location and formatting of your file will vary depending on the settings you choose.

***

## Settings

| Name | Description | Default |
|--|--|--|
| Path | The path inside your vault where your converted notes will be saved. | / |
| Separator | Separator of your file name. Example: "Title of my book" is going to be "Title_of_my_book". | _ |
| Iframe | This shows additional information of your book inside an iframe. | true |
| Highlight | How the highlights of your book will be formatted. (markdown syntax) (use '\n' for "Enter") | *** \n \n > [!quote] location \n \*highlight\* \n \n |
| Note | How the notes of your book will be formatted. (markdown syntax) (use '\n' for "Enter") | \*\*Note\*\* \n > note \n \n |

---

## Do you find this plugin useful?

Support further development of the plugin. Buy me a coffee!  

<a href="https://www.buymeacoffee.com/alvaro.cas"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=alvaro.cas&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff"></a>

Hey, thank you for your support!

***

## MIT LICENSE
Review the [LICENSE](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/LICENSE)
