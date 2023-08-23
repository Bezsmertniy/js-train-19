// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створюємо об'єкт Book
function Book(title, author, pages) {
  this.title = title || "Загальна Книга";
  this.author = author || "Анонім";
  this.pages = pages || 0;
}
Book.prototype.read = function () {
  console.log(`Ви читаєте ${this.title} від ${this.author}`);
};

console.log("Завдання: 1 ==============================");

// Виводимо в консоль Об'єкт: Book

// Виводимо в консоль прототип Об'єкту: Book

// Викликаємо функцію read об'єкту Book
const book1 = new Book("Пригоди Тома Сойєра", "Марк Твен", 350);

console.log("Об'єкт: Book", book1);

console.log("Прототип Об'єкту: Book", Object.getPrototypeOf(book1));

book1.read();

// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість genre
function Novel(title, author, pages, genre) {
  Book.call(this, title, author, pages);
  this.genre = genre || "Новела";
}
Novel.prototype = Object.create(Book.prototype);
Novel.prototype.constructor = Novel;

console.log("Завдання: 2 ==============================");

// Виводимо в консоль Об'єкт: Novel

// Виводимо в консоль прототип Об'єкту: Novel
const novel1 = new Novel(
  "Майстер і Маргарита",
  "Михайло Булгаков",
  480,
  "Фантастика"
);
console.log("Об'єкт: Novel", novel1);
console.log("Прототип Об'єкту: Novel", Object.getPrototypeOf(novel1));
novel1.read();
// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

// Створюємо об'єкт Biography

// Змінемо прототип об'єкта Biography на Novel
function Biography(title, author, pages) {
  this.title = title || "Загальна Біографія";
  this.author = author || "Біограф";
  this.pages = pages || 200;
}
function NovelForBiography() {}

NovelForBiography.prototype = Object.create(Novel.prototype);

console.log("Завдання: 3 ==============================");
// Виводимо в консоль Об'єкт: Biography

// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль
const biography1 = new Biography("Життя і творчість", "Біографіст", 180);
biography1.__proto__ = new NovelForBiography();
console.log("Об'єкт: Biography", biography1);
console.log(
  "Novel є прототипом Biography:",
  Novel.prototype.isPrototypeOf(biography1)
);

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book

// Додаємо властивість 'info' за допомогою Object.defineProperty
// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined

// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |
function ScienceBook(title, author, info) {
  Book.call(this, title, author);
  let _info = info;
  Object.defineProperty(this, "info", {
    get: function () {
      return _info;
    },
    set: function (value) {
      if (value) {
        _info = value;
      }
    },
  });
  Object.defineProperty(this, "description", {
    get: function () {
      return `Про книгу ${this.title}: ${_info}`;
    },
  });
}
ScienceBook.prototype = Object.create(Book.prototype);
ScienceBook.prototype.constructor = ScienceBook;

console.log("Завдання: 4 ==============================");
// Виводимо в консоль властивість info

// Виводимо в консоль налаштування властивости info
const scienceBook1 = new ScienceBook(
  "Фізика 101",
  "Альберт Ейнштейн",
  "написана в 1915 році"
);
console.log("Властивість info:", scienceBook1.info);
const infoDescriptor = Object.getOwnPropertyDescriptor(scienceBook1, "info");
console.log("Налаштування властивості info:", infoDescriptor);
console.log("Повний опис книги:", scienceBook1.description);

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

//Створюємо Textbook та наслідуємо властивості з ScienceBook

// Перевизначаємо метод read(), відповідно з дописом вище

// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |
function Textbook(title, author) {
  ScienceBook.call(this, title, author);
}
Textbook.prototype = Object.create(ScienceBook.prototype);
Textbook.prototype.constructor = Textbook;
Textbook.prototype.read = function () {
  console.log(
    `Ви читаєте підручник "${this.title}" від ${this.author}. ${this.info}`
  );
};

console.log("Завдання: 5 ==============================");
// Викликаємо функцію read об'єкту Textbook
const textbook1 = new Textbook("Фізика у Вищій Школі", "Дж. Д. Джонс");
textbook1.read();

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media

/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media

// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |
function Media(format, length) {
  this.format = format || "Загальний Формат";
  this.length = length || 0;
}

Media.prototype.play = function () {
  console.log(
    `Зараз відтворюється медіа у форматі ${this.format} з тривалістю ${this.length} секунд`
  );
};
function Song(format, length, artist, title) {
  Media.call(this, format, length);
  this.artist = artist || "Загальний Виконавець";
  this.title = title || "Загальна Пісня";
}
Song.prototype = Object.create(Media.prototype);
Song.prototype.constructor = Song;

console.log("Завдання: 6 ==============================");
// Викликаємо функцію play об'єкту Song
const song1 = new Song("MP3", 240, "The Beatles", "Hey Jude");
song1.play();
