const { News } = require("../models");
const fs = require("fs");
const path = require("path");

module.exports = {
    createNews: async (req, res) => {
        try {
            const { title, content, type } = req.body;

            const image = req.files.file;
            const fileName = image.name;
            const news = await News.create({
                title,
                content,
                fileName,
                type,
            });
            const uploadPath = path.resolve(
                "./src/uploads/assets/news",
                fileName
            );

            fs.writeFile(uploadPath, image.data, (err) => {
                console.log(err);
            });

            res.redirect("/direksiya/admin/create/news");
        } catch (err) {
            console.log(err);
        }
    },
    deleteNews: async (req, res) => {
        try {
            const { id, fileName } = req.body;
            const Path = path.resolve("./src/uploads/assets/news", fileName);

            const files = await News.findAll({ where: { fileName: fileName } });

            if (files.length <= 1) {
                fs.readFile(
                    `./src/uploads/assets/news/${fileName}`,
                    (err, data) => {
                        if (err) console.log(err);
                        if (data) {
                            fs.unlink(Path, function (err) {
                                if (err) console.log(err);
                            });
                        }
                    }
                );
            }
            await News.destroy({ where: { news_id: id } });

            res.redirect("/direksiya/admin/get/news");
        } catch (err) {
            console.log(err);
        }
    },
    editNews: async (req, res) => {
        try {
            const { id, title, content, type } = req.body;

            const image = req.files;

            const oldNews = await News.findOne({ where: { news_id: id } });

            if (image) {
                const fileName = image.file.name;
                fs.unlink(
                    path.resolve(
                        "./src/uploads/assets/news",
                        oldNews.dataValues.fileName
                    ),
                    function (err) {
                        if (err) return console.log(err);
                    }
                );

                let news = await News.update(
                    {
                        title,
                        content,
                        fileName,
                        type,
                    },
                    {
                        where: {
                            news_id: id,
                        },
                    }
                );

                const uploadPath = path.resolve("./src/uploads/assets/news", fileName);

                fs.writeFile(uploadPath, image.file.data, (err) => {
                    console.log(err);
                });
            } else {
                let news = await News.update(
                    {
                        title,
                        content,
                        fileName: oldNews.dataValues.fileName,
                        type,
                    },
                    {
                        where: {
                            news_id: id,
                        },
                    }
                );
            }

            res.redirect("/direksiya/admin/get/news");
        } catch (err) {
            console.log(err);
        }
    },
};
