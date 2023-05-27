const { Projects, projectImages } = require('../models');

const handleProjects = async (id, limit) => {
    try {
        var newRes = [];
        var allProjects;
        if (id) {
            if (limit) {
                allProjects = await Projects.findOne({
                    where: { project_id: id },
                    attributes: [
                        'project_id',
                        'name',
                        'type',
                        'fileName',
                        'content',
                    ],
                    limit,
                });

                allProjects.imgUrl =
                    '/files/assets/projects/' + allProjects.dataValues.fileName;

                return allProjects;
            }
            allProjects = await Projects.findOne({
                where: { project_id: id },
                attributes: [
                    'project_id',
                    'name',
                    'type',
                    'fileName',
                    'content',
                ],
            });

            allProjects.imgUrl =
                '/files/assets/projects/' + allProjects.dataValues.fileName;

            return allProjects;
        }

        if (limit) {
            allProjects = await Projects.findAll({
                order: [['createdAt', 'DESC']],
                attributes: [
                    'project_id',
                    'name',
                    'type',
                    'fileName',
                    'content',
                ],
                limit,
            });

            allProjects.forEach((e) => {
                e.dataValues.imgUrl =
                    '/files/assets/projects/' + e.dataValues.fileName;
                newRes.push(e.dataValues);
            });
        } else {
            allProjects = await Projects.findAll({
                order: [['createdAt', 'DESC']],
                attributes: [
                    'project_id',
                    'name',
                    'type',
                    'fileName',
                    'content',
                ],
            });

            allProjects.forEach((e) => {
                e.dataValues.imgUrl =
                    '/files/assets/projects/' + e.dataValues.fileName;
                newRes.push(e.dataValues);
            });
        }

        return newRes;
    } catch (err) {
        console.log(err);
    }
};

module.exports = handleProjects;
