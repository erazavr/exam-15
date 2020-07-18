const mongoose = require('mongoose');
const nanoid = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Place = require('./models/Place');
const Comment = require('./models/Comment');
const Image = require('./models/Image');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name)
    }

    const [user1, user2, user3] = await User.create({
        username: 'user',
        password: '123',
        token: nanoid()
    },{
        username: 'user2',
        password: '123',
        role: 'user',
        token: nanoid()
    },{
        username: 'admin',
        password: '123',
        role: 'admin',
        token: nanoid()
    });

   const [place1, place2,] = await Place.create({
        title: 'Обама бар и гриль',
        user: user1._id,
        description: 'Услуги: Завтрак/второй завтрак, Бронирование, Доставка, Открыто допоздна',
        image: 'obamaBar.jpg'
    },{
       title: 'Супара',
       user: user2._id,
       description: 'Услуги: Бронирование\n' +
           'Часы работы: вс - сб 11:00 - 12:00',
       image: 'Supara.jpg'
   });
   await Comment.create({
       place: place1._id,
       user: user2._id,
       qof: 3,
       sq: 1,
       interior: 3,
       comment: 'Уже не та добрая Обама какой была раньше, в персонале есть управляющая и официанты которые могут Вам нахамить, даже в дни орозо. Не умеют беречь постоянных клиентов. Не дают ни слова сказать, ужасное ощущение после посещения этого места. Поменяйте управляющего - вот Вам совет да любовь. Человеческого отношения лишь просим к себе. Мы не капризные клиенты. Но отношение просто хамское от управляющей.',
   },{
       place: place1._id,
       user: user3._id,
       qof: 5,
       sq: 4,
       interior: 4,
       comment: 'Мы стали постоянно ходить в это заведение, так как все на высшем уровне! !! Высокий уровень обслуживания, уютная атмосфера и конечно же ВКУСНО! Всегда рекомендую всем своим друзьям и знакомым. Также у них появилось детское меню с подарками, нужно в следующий раз зайди с детками.',

   },{
       place: place2._id,
       user: user1._id,
       qof: 5,
       sq: 4,
       interior: 4,
       comment: 'Рекомендую всем путешественникам. Всегда пробую что- то новое и не жалею в выборе блюда очень вкусно. Особое спасибо поварам и официантам приносят всегда горячими блюда. Планирую посещение и не раз.'
   },{
       place: place2._id,
       user: user3._id,
       qof: 5,
       sq: 5,
       interior: 5,
       comment: 'Прекрасное место для знакомства с национальной кухней и традициями. Идеально подходит для формирования представления о быте, традициях и особенностях киргизской кухни. Обязательно рекомендую попробовать мясо на камнях, т.е. на таш-мангале. Под водочку Кречет о-о-очень вкусно. Благодарен администрации и коллегам из Кыргызстан за предоставленное гастрономическое удовольствие и возможность прикоснуться к культуре и традициям Кыргызстана. По ценам не могу точно сориентировать, т.к. был гостем.'
   });
    await Image.create({
        place: place1._id,
        user: user2._id,
        image: 'dog1.jpg'
    },{
        place: place1._id,
        user: user3._id,
        image: 'obamaBar.jpg'
    },{
        place: place2._id,
        user: user1._id,
        image: 'Supara.jpg'
    },{
        place: place2._id,
        user: user3._id,
        image: 'dog1.jpg'
    });
    mongoose.connection.close();
};


run().catch(error => {
    throw error
});