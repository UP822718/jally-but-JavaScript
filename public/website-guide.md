# Pirate Website Guide

Site source codes: **https://github.com/ppuk/jekyll-site**

The web is statically compiled at the time of change, so the repository is really everything.

Webmasters: Noah Stride

Content administrators: Harley Faggetter

## 1. Markdown and yaml

You need to know the markdown ** markdown **, which is very similar to the graphic plaintext.
Markdown can also be tested in an [online editor](http://dillinger.io/) with a preview.
You can also insert html directly into markdown. For example, if you want to insert a more complex table or google calendar.

```md
# Title 1. levels

## Title 2. levels

### Paragraphs

A separate paragraph. Lorem ipsum. **Bold**, *italics*, [link](https://www.pirati.cz)

The break paragraph is performed  
pomocí dvou mezer na konci řádku.

1\. a paragraph beginning with a serial number.

### Lists

1. numbered list 1
2. numbered list 2

- unordered list 1
- unordered list 2

### Pictures

![Image Label](assets/img/brand/logo.svg)

### Citation

> To emphasise longer citations. Shorter citations can just use regular quotation marks.

```

**Yaml** is used to populate metadata to articles (pages). Place Yaml header before markdown:

```Yaml
key1: value
key2:
  - field
  - values
key3:
  key4: val1
  key5: val2
```

<!-- It's best to understand [example](https://raw.githubusercontent.com/pirati-web/pirati.cz/gh-pages/_people/ondrej-profant.md). -->

## Github

Github is used as the central repository for our website.
If you sign up to Github, you will be able to submit changes to the website for approval

## Articles

Articles (news) can be added in the graphical interface:
[**staging.pirateparty.org.uk/admin**](https://staging.pirateparty.org.uk/admin)
However, it needs appropriate rights. For the nationwide website, my MO has.

### Tags

Tags are not separated by commas, but only by a space.
Choosing the right tag is not easy - it must be clear but also generic enough to make sense for other articles.

## People and other sites

For simple text editing, just press the button at the bottom right above the "Suggest Editing" footer.

![An animation showing the layout of the edit](/assets/img/navod/uprava.gif)

At the bottom right is "Suggest Editing":
![](/assets/img/navod/u1.png)
Signing in:
![](/assets/img/navod/u2.png)
Click on "Fork this repository and propose changes"
![](/assets/img/navod/u3.png)
Now we can edit the file:
![](/assets/img/navod/u4.png)
We can also preview the marked changes:
![](/assets/img/navod/u5.png)
![](/assets/img/navod/u6.png)
Write a description of the changes and click on "Propose file change":
![](/assets/img/navod/u7.png)
We now see a summary of changes:
![](/assets/img/navod/u8.png)
Create a new pull request:
![](/assets/img/navod/u9.png)

## Social networks

The site is good to test in [FB debbuger](https://developers.facebook.com/tools/debug/), to display correctly when sharing. [Correct image dimensions](https://developers.facebook.com/docs/sharing/best-practices#images) (1200 x 630)

## More complicated changes

So far we have undergone the foundations. But there is usually no more need. For true changes, you still need to know:

- HTML, CSS, JS
- git (pull, push, commit, merge)
- jekyll (liquid template)

### HTML

Some pages are more complex and HTML knowledge is needed. Introducing HTML is not the content of this manual.

### Web structure

1. Collections begin with an underscore and are defined in config.yaml. Including some default values (e.g., the content of the right column).
2. Pages are usually separate folders containing the file `index.html` or `index.md`. There may be other sites, for example, `pripoj-se/kalendar.html`.
3. The header, footer, right column are in the folder `_includes`

Articles: 1300x744
People (people), photo 165x220
