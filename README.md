# StefanoNovello.tumaini-initative

This is the repository for the Tumaini Education Initiative website.

## IndexNow refresh

Run this whenever you update the site:

curl https://bing.com/indexnow?url=https://tumaini-initiative.de/&key=04ef8c94aec549b08004b2c0399d6315&keyLocation=https://tumaini-initiative.de/04ef8c94aec549b08004b2c0399d6315.txt

## Local development

The site uses Jekyll (GitHub Pages style) to convert markdown content into static HTML in `_site/`.

### Requirements

- Ruby 3.0+ (recommended: version from [./.ruby-version](.ruby-version))
- Bundler
- make

### Quick start

1. Install Ruby (recommended via `rbenv` or `mise`) and ensure `ruby -v` is 3.0+.
2. Install bundler: `gem install bundler`
3. Install project gems: `make setup`
4. Run local server: `make serve`
5. Open `http://localhost:4000`

Useful commands:

- `make doctor` – check local toolchain
- `make build` – build site once
- `make clean` – remove generated output and local gem cache

## VS Code

You can also run the existing VS Code task/launch configuration from `.vscode/`.

If you see a Java runtime warning in the terminal, it is usually from your shell startup config on that machine and not required by this Jekyll project.
