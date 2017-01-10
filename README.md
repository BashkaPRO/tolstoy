=======
# Golos.io
Golos.io это веб-клиент блокчейна golos.
========

## Установка

### Установка зависимостей

#### Установка node.js

Варианты расписаны [тут](https://nodejs.org/en/download/)

#### Установка последней версии node.js

```bash
# Ставим n - менеджер версий ноды
sudo npm install -g n
# Ставим последнюю версию ноды
sudo n latest
```

#### Установка зависимостей проекта

```bash
npm install
```

#### Редактирование файла конфигурации

```bash
cd config
cp steem-example.json steem-dev.json
```

Generate a new crypto_key and save under server_session_secret in ./steem-dev.json.

```bash
node
> crypto.randomBytes(32).toString('base64')
```
(note: it's steem.json in production)

Afterwards create front-end public config file

```bash
cd app/config
cp public-example.json public.json
```

#### Установка базы данных (mysql)

_на проекте используется (sequelize)[http://docs.sequelizejs.com],
поэтому можно использовать например postgres вместо mysql, подправив настройки_

Настройки базы данных дублируются: `db/config/config.json` - используется для
создания и синхронизации таблиц; `config/steem.json`/`config/steem-dev.json` -
используется вебклиентом для работы с базой

##### OS X:

```bash
brew update
brew doctor
brew upgrade
brew install mysql
mysql.server restart
```

##### Debian:

```bash
sudo apt-get update
sudo apt-get install mysql-server
```

 Подключаемся к mysql и создаём базу данных steemit_dev:

```bash
mysql -u root
> create database steemit_dev;
```

Ставим `sequelize-cli` для всех пользователей:

```bash
npm install -g sequelize-cli pm2 mysql
```

Чтоы создать таблицы (а позже запустить миграцию) - запускаем `sequelize db:migrate`
из папки `db/`.


### Разработка

Запуск клиента в режиме разработки -
```bash
npm start
```

В этом режиме вебклиент берёт настройки из файла `config/steem-dev.json`

#### Style Guides

##### File naming and location

- Prefer CamelCase js and jsx file names
- Prefer lower case one word directory names
- Keep stylesheet files close to components
- Component's stylesheet file name should match component name

##### Js & Jsx
We are using _Airbnb JavaScript Style Guide_ with some modifications (see .eslintrc).
Please run _eslint_ in the working directory before committing your changes and make sure you didn't introduce any new styling issues.

##### CSS & SCSS
If component requires a css rule, please use its uppercase name for the class, e.g. "Header" class for the header's root div.
We adhere to BEM methodology with exception for Foundation classes, here is an example for the Header component:

```html
<!-- Block -->
<ul class="Header">
  ...
  <!-- Element -->
  <li class="Header__menu-item">Menu Item 1</li>
  <!-- Element with modifier -->
  <li class="Header__menu-item--selected">Element with modifier</li>
</ul>
```

### Production

If you want to test it locally in production mode, just run the following commands:

```bash
npm run build
npm run prod
```

or via pm2:

```bash
npm run build
npm -i -g pm2 # one time
pm2 start config/process.json
```

Команда `npm run build` запускает сборку и минификацию проекта.
Команда `npm run prod` стартует собранный проект. В этом режиме вебклиент берёт
настройки из файла `config/steem.json`

Также, есть скрипт `build_n_run_webclient.sh`, который устанавливает зависимости npm,
запускает сборку, и стартует собранный проект в терминале screen.


## Issues

To report a non-critical issue, please file an issue on this GitHub project.

If you find a security issue please report details to: t[at]cyber[dot]fund

We will evaluate the risk and make a patch available before filing the issue.
