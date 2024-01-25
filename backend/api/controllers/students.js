const Students = require("../model/students");

exports.getStudents = async (req, res) => {
  try {
    const students = await Students.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createStudents = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const { name, place, age, gender, groups } = req.body;

    let student = await Students.create({
      name,
      place,
      age,
      gender,
      groups,
      image,
    });
    res.status(201).json({ student, message: "data upload successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const data = req.body;
    Students.update(data, {
      where: { id: data.id },
    });
    res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudents = async (req, res) => {
  try {
    const ids = req.body;

    await Students.destroy({
      where: {
        id: ids,
      },
    });
    res.status(200).json({ message: "deleted successfully data" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.paginationStudent = async (req, res) => {
  const currentPage = parseInt(req.query.currentPage);
  const limit = parseInt(req.query.limit);

  const offset = (currentPage - 1) * limit;
  const count = await Students.count();

  const students = await Students.findAll({ limit, offset });
  res.status(200).json({
    totalElements: count,
    totalPages: Math.ceil(count / limit),
    currentPage: currentPage,
    pageContent: students,
  });
};

exports.imageUpload = async (req, res) => {
  const image = req.file ? req.file.filename : null;
  const { name, place, age, gender, groups } = req.body;
  if (!req.file) {
    res.status(400).send("no file uploaded");
  }
  let student = await Students.create({
    name,
    place,
    age,
    gender,
    groups,
    image,
  });
  res.status(201).json({ student, message: "data upload successfully" });
};
