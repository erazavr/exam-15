const { I } = inject();

Given('я нахожусь на странице логина', () => {
    I.amOnPage('/login')
});
Given('я нахожусь на главной странице', () => {
    I.amOnPage('/');
    I.wait(3)
});

When('я заполняю поля формы:', table => {
    const tableData = table.parse().rawData;

    tableData.forEach(row => {
        if (row[0] === 'image') {
            I.attachFile(row[0], row[1]);
        }else if (row[0] === 'qof' || row[0] === 'sq' || row[0] === 'interior') {
            I.selectOption(row[0], row[1])
        }
        else {
            I.fillField(row[0], row[1])
        }
    });


});

When('нажимаю на кнопку {string}', name => {
    I.click(name);
    I.wait(3)

});



Given('перехажу на главную страницу', () => {
  I.amOnPage('/');
  I.wait(3)
});

