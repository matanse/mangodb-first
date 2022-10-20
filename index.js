const { date } = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Error: ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  isPublished: Boolean,
  date: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", courseSchema);
const course = new Course({
  name: "react beginners",
  author: "my teacher mosh",
  tags: ["react", "frontend"],
  isPublished: true,
});

async function saveCourse() {
  const courseObj = await course.save();
  console.log(courseObj);
}
// saveCourse();

async function getCourses() {
  try {
    const courses = await Course.find({
      // date: "2022-10-12T03:12:00.952Z",
      // name: "react beginners",
    })
      .limit(10)
      .sort({ date: 1 })
      .select({ name: 1, tags: 1, date: 1 });
    console.log(courses);
  } catch (err) {
    console.log("Error: ", err);
  }
}
getCourses();
