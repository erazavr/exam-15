#language:ru

Функционал: Создание заведения
  Я как пользователь сайта
  Хочу добавлять свои заведения
  @createPlace
  Сценарий:
    Допустим я нахожусь на странице логина
    И я заполняю поля формы:
      | username | admin |
      | password    | 123    |
    И нажимаю на кнопку "button[type='submit']"
    И нажимаю на кнопку "drop"
    И нажимаю на кнопку "Добавить заведение"
    И я заполняю поля формы:
      | title       | Sierra Coffee |
      | description | Часы работы: вс - сб 7:30 - 11:00|
      | image       | img/cafe.jpg |
    И нажимаю на кнопку "input[type='checkbox']"
    И нажимаю на кнопку "Создать"
    И перехажу на главную страницу