const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected!");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "5fdde4a18600e0578861ecb5",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Henlo Hachi, how are you doing today?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377088/YelpCamp/eyotpggakmy3y7ebfhub.jpg',
                    filename: 'YelpCamp/eyotpggakmy3y7ebfhub'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377088/YelpCamp/k63knlua0z4f3axqjgnl.jpg',
                    filename: 'YelpCamp/k63knlua0z4f3axqjgnl'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377088/YelpCamp/xhun79rwg4hmqjbhzxa9.jpg',
                    filename: 'YelpCamp/xhun79rwg4hmqjbhzxa9'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377088/YelpCamp/gwq1uvrbukufgsn5oncg.jpg',
                    filename: 'YelpCamp/gwq1uvrbukufgsn5oncg'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377088/YelpCamp/tbm4xlwzu4ky874mq7bw.jpg',
                    filename: 'YelpCamp/tbm4xlwzu4ky874mq7bw'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377088/YelpCamp/rsstqbblhpcqdoz2hwv5.jpg',
                    filename: 'YelpCamp/rsstqbblhpcqdoz2hwv5'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377089/YelpCamp/zdncp1lz7f6gqaniqjgr.jpg',
                    filename: 'YelpCamp/zdncp1lz7f6gqaniqjgr'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377089/YelpCamp/ggwjfubk1gj6dyrwnztd.jpg',
                    filename: 'YelpCamp/ggwjfubk1gj6dyrwnztd'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377089/YelpCamp/tuynrqgahnnd9i8ukvtp.png',
                    filename: 'YelpCamp/tuynrqgahnnd9i8ukvtp'
                },
                {
                    url: 'https://res.cloudinary.com/dep7lmdrb/image/upload/v1608377089/YelpCamp/nqjz0utdtjlmwpwmlhrq.jpg',
                    filename: 'YelpCamp/nqjz0utdtjlmwpwmlhrq'
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            }

        })
        await camp.save();
    }
}

seedDB().then(() => { db.close() });
