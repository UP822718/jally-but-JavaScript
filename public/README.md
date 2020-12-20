# pirateparty.org.uk


<!-- [![Build Status](https://api.travis-ci.org/pirati-web/pirati.cz.svg?branch=gh-pages)](https://travis-ci.org/pirati-web/pirati.cz) -->

This project is copied from [pirati.cz](https://github.com/pirati-web/pirati.cz)

## Build locally

To install on **Fedora 25+**: `dnf install cmake gcc npm ruby ruby-devel rubygem-jekyll rubygem-bundler rubygem-nokogiri libffi zlib`

To install on **Ubuntu 16.04 LTS** (including Ubuntu running on Windows Subsystem for Linux on **Windows 10**):

```
sudo apt-get install ruby2.3-dev gcc make libghc-zlib-dev libffi-dev npm
gem install rubygems-update
gem install jekyll bundler
sudo npm install -g bower
sudo npm install --global gulp-cli
```

*(on all operating systems)*

Next, go to the cloned project folder:

```
npm install                             # It installs gulp etc.
bundle install                          # It installs locally needed gems (např. jekyll, jekyll-paginate etc.)
./node_modules/bower/bin/bower install  # It installs front-end libraries (Foundation, Jquery, ...)
./node_modules/gulp/bin/gulp.js         # Minifies JS 
```

The repository can be cloned into any folder (doesn't need to be in `/var/www/`).

Run `bundle exec jekyll serve`, which compiles the page and runs the page. It'll be accessible on localhost: `http://127.0.0.1:4000`

<!-- We probably won't have these kinds of localisations issues
In case of dropping in the container when the scss conversion fails, check the settings `locale`. It should be set `utf-8`.
If it is `POSIX`, install a package, for example:
`sudo apt-get install locales`

And then `dpkg-reconfigure locales` - here you can choose `92. cs_CZ.UTF-8 UTF-8`  
And paste into ~/.bashrc
```
export LC_ALL=cs_CZ.UTF-8
export LANG=cs_CZ.UTF-8
export LANGUAGE=cs_CZ.UTF-8
``` -->

<!-- Eventually, we can run only: `bundle exec jekyll build`, to the folder `_site` prepare a complete web (we can open it from the browser using the keyboard shortcut `ctrl+o`). -->


## Structure

The pages themselves are in markdown or in html (more complex structure, eg multiple columns, etc.)

The collections are markdown files with the yaml header in the appropriate folder, 4:

- posts (articles), photo 1300x744
- people (people), photo 165x220
- program
- teams (teams)

Some data are listed in the folder `_data`. They are in yaml or json format.

**CSS** is in the folder `_sass` and is automatically compiled and minified into one file `main.css`.

**JavaScript** is in the folder `_include/js`. Libraries are defined in `bower.json` and the production set is made up of a gulp.

Jekyll has very detailed [documentation](http://jekyllrb.com/docs/home/). And we also recommend the development [cheat sheet](http://jekyll.tips/jekyll-cheat-sheet/)
