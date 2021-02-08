"use strict";

class Validator {
    constructor(form) {
        // описываем паттерны
        this.patterns = {
            name: /^[a-zа-яё]+$/i, // от а до z, от а до я, ё и всё это 1 и более раз.
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/, // +7(3 цифры)3цифры-4цифры
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i // в общем формат почтв
        };
        // описываем сообщения об ошибках
        this.errors = {
            name: 'Имя должно содержать только буквы',
            phone: 'Телефон должен подчиняться шаблону +7(000)000-0000',
            email: 'E-mail не выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error';
        this.form = form;
        this.valid = true;
        this._validateForm();
    }
    // замена init
    _validateForm(){
        //отчищаем форму от ошибок
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors){
            error.remove();
        }
        //проводим проверку каждого инпута в форме
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
        //если ошибок нет, меняем состояние this.valid
        if(![...document.getElementById(this.form).querySelectorAll('.error')].length){
           this.valid = false;
        }
    }
    // тут поплыл. понял только то, что с помощью test сопоставляются текст в инпутах с регулярками в паттернах. 
    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
               this._addErrorMsg(field); // добавляем текст с ошибкой
               this._watchField(field); // как я понимаю, добавляем слушателей событий
            }
        }
    }
    _addErrorMsg(field){
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
        field.parentNode.insertAdjacentHTML('beforeend', error); // с помощью parentNode обращаемся к блоку родителю
    }
    //тут тоже поплыл
    _watchField(field){
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(error){
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!error){
                    this._addErrorMsg(field);
                }
            }
        });
    }
}
