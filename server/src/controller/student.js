const { default: mongoose } = require('mongoose');
const studentModel = require('../model/studentModel')

//---------------------------------create student
const createStudent = async (req, res) => {
    // try {
        const { name, topic, summary } = req.body;
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: 'please fill the all fields' });

        if (!name || name.trim().length === 0) return res.status(400).send({ status: false, message: 'please fill the all fields' });
        if(!/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(name))  return res.status(400).send({ status: false, message: 'name should be only letter' });
        if (!topic || topic.trim().length === 0) return res.status(400).send({ status: false, message: 'please fill the topic fields' });
        if (!summary || summary.trim().length === 0) return res.status(400).send({ status: false, message: 'please fill the summary fields' });

        const student = await studentModel.findOne({name});
        if(student) return res.status(400).send({ status: false, message: `${name} is already present` });

        req.body.topics = {  // insert  topics key and set a object in req.body.topics 
            topic,
            summary,
        }
        delete req.body.topic // delete topic from req.body
        delete req.body.summary // delete summary from req.body

        const data = await studentModel.create(req.body);

        res.status(201).send({ status: true, message: data })

    // } catch (error) { return res.status(500).send({ status: false, message: error.message }) }
}
//---------------------------------add topic
const addTopic = async (req, res) => {
    try {
        const studentName = req.params.studentName;
        const { name, topic, summary } = req.body;

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: 'please fill the all fields' });
        if (!name || name.trim().length === 0) return res.status(400).send({ status: false, message: 'please fill the all fields' });
        if(!/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/.test(name))  return res.status(400).send({ status: false, message: 'name should be only letter' });
        if (!topic) return res.status(400).send({ status: false, message: 'please fill the topic fields' });
        if (!summary) return res.status(400).send({ status: false, message: 'please fill the summary fields' });

        req.body.topics = { topic, summary, }
        delete req.body.topic // delete topic from req.body
        delete req.body.summary // delete summary from req.body
        delete req.body.name // delete name from req.body

        const student = await studentModel.findOne({ name: studentName });

        if (!student) return res.status(404).send({ status: false, message: 'student Not Found' });

        const data = await studentModel.findOneAndUpdate({ name: studentName }, { $push: { 'topics': req.body.topics } }, { new: true });

        res.status(200).send({ status: true, message: data })

    } catch (error) { return res.status(500).send({ status: false, message: error.message }) }
}
//---------------------------------get student
const getstudent = async (req, res) => {
    try {
        const studentName = req.params.studentName;

        const student = await studentModel.findOne({ name: studentName });

        if (!student) return res.status(404).send({ status: false, message: 'Student Not Found' });

        res.status(200).send({ status: true, message: student });

    } catch (error) { return res.status(500).send({ status: false, message: error.message }) }
}

module.exports = { createStudent, addTopic, getstudent }