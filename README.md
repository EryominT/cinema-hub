# cinema-hub
## demo:
https://cinema-hub-88bb9.web.app/

https://cinema-hub-88bb9.firebaseapp.com/

## Description
#### Данный проект является демонстрационной версией SPA написанный на VUE3.js (typescript)
##### Функционал:
- хранение пользовательской информации в firebase
- взаимодействие с контентом (поиск, фильтрация, вывод информации) реализован через обращение к строннему API
- на странице регистрации/авторизации имеется валидация, плюрализация форм
- главная страница отображает ряд категорий (для перехода на страницу категории необходимо кликнуть на заголовок)
- на странице "Поиск по фильмам" имеется возможность отфильтровать картины по заданным критериям
- на странице фильма выводится персональная информация картины, список с рекоммендованными картинами,
рейтинг пользователей текущего сайта, рейтинг со сторонних сайтов, отзывы пользовыателей текущего сайта,
отзывы с сайта kinopoisk.ru, возможность добавить/удалить фильм из "избранного", добавить/удалить комментарий,
поставить оценку какой-либо картине, просмотреть трейлера в popup (у некоторыех картин трейлер может отсутствовать)
- В профиле пользователя имеется возможность удалить ранее осталенный комментарий, сменить аватарку/почту/логин/пароль
- на странице "избранное" отображается список с соответствующими фильмами
- на сайте присутствует lazyLoding

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Notice
файл .env с авторизационными к API ключами отсутствует


