const { News } = require('../models');
const moment = require('moment');
moment.locale('uz');

const handleAllNews = async (id) => {
    try {
        var news = [];
        var allNews;
        if (id && id.type && id.type == 'legal-status') {
            allNews = await News.findOne({
                where: { type: id.type },
                attributes: ['news_id', 'title', 'content', 'fileName', 'type'],
            });

            return allNews;
        }
        if (id) {
            allNews = await News.findOne({
                where: { news_id: id },
                attributes: [
                    'news_id',
                    'title',
                    'content',
                    'fileName',
                    'type',
                    'createdAt',
                ],
            });
            allNews.dataValues.imgUrl =
                '/files/assets/news/' + allNews.dataValues.fileName;

            allNews.dataValues.date =
                moment(allNews.dataValues.createdAt)
                    .format('L h:mm')
                    .slice(0, 11) +
                (moment(allNews.dataValues.createdAt)
                    .format('L h:mm')
                    .slice(-5, -3) -
                    0 +
                    5) +
                moment(allNews.dataValues.createdAt).format('L h:mm').slice(-3);

            return allNews;
        } else {
            const allNews = await News.findAll({
                order: [['createdAt', 'DESC']],
                attributes: [
                    'news_id',
                    'title',
                    'content',
                    'fileName',
                    'type',
                    'createdAt',
                ],
            });
            allNews.map((e) => {
                e.dataValues.imgUrl =
                    '/files/assets/news/' + e.dataValues.fileName;
                e.dataValues.date =
                    moment(e.dataValues.createdAt)
                        .format('L h:mm')
                        .slice(0, 11) +
                    (moment(e.dataValues.createdAt)
                        .format('L h:mm')
                        .slice(-5, -3) -
                        0 +
                        5) +
                    moment(e.dataValues.createdAt).format('L h:mm').slice(-3);

                news.push(e.dataValues);
            });
        }

        return news;
    } catch (err) {
        console.log(err);
    }
};

const handleNewsSlice = async (type, limit) => {
    try {
        var news = [];
        const allNews = await News.findAll({
            where: { type },
            order: [['createdAt', 'DESC']],
            attributes: [
                'news_id',
                'title',
                'content',
                'fileName',
                'type',
                'createdAt',
            ],
            limit,
        });
        allNews.map((e) => {
            e.dataValues.imgUrl = '/files/assets/news/' + e.dataValues.fileName;
            e.dataValues.date =
                moment(e.dataValues.createdAt).format('L h:mm').slice(0, 11) +
                (moment(e.dataValues.createdAt).format('L h:mm').slice(-5, -3) -
                    0 +
                    5) +
                moment(e.dataValues.createdAt).format('L h:mm').slice(-3);

            news.push(e.dataValues);
        });

        return news;
    } catch (err) {
        console.log(err);
    }
};

module.exports = { handleAllNews, handleNewsSlice };
