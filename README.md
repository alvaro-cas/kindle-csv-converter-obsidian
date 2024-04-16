# Kindle CSV Converter Obsidian
**Create useful Kindle notes in [Obsidian.md](https://obsidian.md/) vault.** 

![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss.png?raw=true)

> Sample image using Iframe (left) and no Iframe (right) with custom note name, with default configuration.


## Introduction

This obsidian plugin is for converting your notes in CSV  format to an Obsidian file, as well it now supports "My Clipplings.txt". If you have no idea how to get your notes, [go here](https://medium.com/@keisuke_w/how-to-export-kindle-notes-and-highlights-ebce5812bbfc#55d8), the article explains how to obtain both formats.

The existence of this plugin is only for converting CSV and My Clippings with desired format easily, while not having any Amazon Account linked to Obsidian. If you want to keep your highlights synced, use this [awesome plugin](https://obsidian.md/plugins?search=Kindle%20Highlights).


## Considerations & Limitations

"My Clippings.txt" is a sensitive file, it doesn't remove the highlights, just appends them, which means if you remove a highlight, it will still be available in the file. This plugin helps to clean up the duplicates, but may accidentally delete some. Again, it's limited, you may experience *You have reached the clipping limit for this item*, but this can be fixed by removing the [DRM](https://www.makeuseof.com/tag/remove-drm-every-ebook-own/) is a perfectly legal approach when used __ONLY__ for personal use.

> While you can, use the CSV formatting.


***


## Installation
You can install the plugin via the [Community Plugins](https://obsidian.md/plugins?search=Kindle%20CSV%20Converter) tab within Obsidian by searching for "Kindle CSV Converter".

### Manual
You can install the plugin manually:
- Go to [latest release](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/releases/latest) on GitHub.
- Download `main.js`, `manifest.json` and `style.css`
- Copy over `main.js`, `manifest.json` and `style.css` to this location inside your vault: `VaulName/.obsidian/plugins/kindle-csv-converter`. (create kindle-csv-converter folder)


***


## Usage
You open Kindle CSV Converter in two different ways: 

#### 1.Command Palette
Press Ctrl+P or selected hotkey to open the command palette. Search for "Kindle CSV Converter" or "Choose File".  

![](https://raw.githubusercontent.com/alvaro-cas/kindle-csv-converter-obsidian/main/assets/ss_command.jpg)

#### 2. Ribbon Icon
Navigate to the left sidebar, select the ribbon with a library icon.  

![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_ribbon.jpg?raw=true)

### Import your file
After following either option 1 or 2, a modal will appear.  

![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_modal.png?raw=true)  

Depending on your needs, you will select either CSV or "My Clippings.txt". Click on desired box, File Explorer will open, choose your file and open. Then you can select specific options for your conversion:

***

#### ~ CSV

![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_csv.png?raw=true)

##### Options

| Name | Description | Default |
|--|--|--|
| Use book name for note | This will use the title of book with separator specified in the settings. | true |
| Name | This will show if the above setting is false. | None |
| Iframe | This shows additional information of your book inside an iframe. | true |

#### ~ My Clippings

![](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/assets/ss_clippings.png?raw=true)

##### Options

| Name | Description | Default |
|--|--|--|
| Select book to import | This shows all books available in "My Clippings.txt", you must select desired. | None |
| Use book name for note | This will use the title of book with separator specified in the settings. | true |
| Name | This will show if the above setting is false. | None |
| Enhance | Improve notes by removing repeated. | true |

Click Generate! Now your file is converted!

> Note: Location and formatting of your file will vary depending on the settings you choose.

***

## Settings

| Name | Description | Default |
|--|--|--|
| Path | The path inside your vault where your converted notes will be saved. | / |
| Separator | Separator of your file name. Example: "Title of my book" is going to be "Title_of_my_book". | _ |
| Header | How the header of your note will be formatted. (Markdown syntax) (use '\n' for "Enter") (title and author are variables and will be replaced) | \n==Your Kindle Notes For:== title __by author__ \n \n |
| Highlight | How the highlights of your book will be formatted. (Markdown syntax) (use '\n' for "Enter")  (highlight is a variable and will be replaced)| *** \n \n > [!quote] location \n \*highlight\* \n \n |
| Note | How the notes of your book will be formatted. (Markdown syntax) (use '\n' for "Enter")  (note is a variable and will be replaced)| \*\*Note\*\* \n > note \n \n |


## Future implementations
- Clean "My Clippings.txt" file automatically
- Import in bundles

## Language Support
If your notes are in another language you can open an issue, so I can add it.

### Supported
- English
- German

## MIT LICENSE
Review the [LICENSE](https://github.com/alvaro-cas/kindle-csv-converter-obsidian/blob/main/LICENSE)


## The End
I hope you enjoy! You can *support* my work [here](https://liberapay.com/Cuatroy2/donate) (I contribute 1% of my revenue to fund carbon removal🌳) or check more content at my [Medium](https://medium.com/@cuatroy2).

*Peace Out!* 🤙

<noscript><a href="https://liberapay.com/Cuatroy2/donate"><img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg"></a></noscript>

