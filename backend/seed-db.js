const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ttms";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "zmersu", "wmersu", "teacher", "director"],
      required: true,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

const woredaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    zone: { type: String, default: "West Gojjam" },
    totalSchools: { type: Number, default: 0 },
    totalTeachers: { type: Number, default: 0 },
    mersuOfficer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    woreda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Woreda",
      required: true,
    },
    classification: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6"],
      required: true,
    },
    teacherCapacity: { type: Number, required: true },
    currentTeacherCount: { type: Number, default: 0 },
    availablePositions: { type: Number, default: 0 },
    location: String,
    director: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

schoolSchema.pre("save", function (next) {
  this.availablePositions = this.teacherCapacity - this.currentTeacherCount;
  next();
});

const teacherSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    qualifications: [String],
    serviceYears: { type: Number, required: true, min: 0 },
    maritalStatus: {
      type: String,
      enum: ["married", "unmarried"],
      required: true,
    },
    healthStatus: String,
    currentSchool: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    currentWoreda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Woreda",
      required: true,
    },
    bonusService: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const transferSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    transferType: {
      type: String,
      enum: ["school-to-school", "woreda-to-woreda"],
      required: true,
    },
    currentLocation: { type: mongoose.Schema.Types.ObjectId, required: true },
    requestedLocations: [
      { type: mongoose.Schema.Types.ObjectId, required: true },
    ],
    reason: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    serviceYearsAtTransfer: Number,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    transferDate: Date,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
const Woreda = mongoose.model("Woreda", woredaSchema);
const School = mongoose.model("School", schoolSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);
const Transfer = mongoose.model("Transfer", transferSchema);

const createHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB", MONGODB_URI);

    await Promise.all([
      User.deleteMany({}),
      Woreda.deleteMany({}),
      School.deleteMany({}),
      Teacher.deleteMany({}),
      Transfer.deleteMany({}),
    ]);

    const adminPassword = await createHash("Admin1234");
    const admin = await User.create({
      username: "admin",
      email: "admin@ttms.local",
      password: adminPassword,
      role: "admin",
      status: "active",
    });

    const officerPassword = await createHash("Officer1234");
    const woredaOfficer = await User.create({
      username: "wmersu1",
      email: "wmersu1@ttms.local",
      password: officerPassword,
      role: "wmersu",
      status: "active",
    });

    const woreda = await Woreda.create({
      name: "Finote Selam",
      code: "FS001",
      zone: "West Gojjam",
      totalSchools: 10,
      totalTeachers: 100,
      mersuOfficer: woredaOfficer._id,
    });

    const schoolList = [];
    for (let i = 1; i <= 10; i += 1) {
      const school = await School.create({
        name: `Finote Selam School ${i}`,
        code: `FS-SC${i}`,
        woreda: woreda._id,
        classification: String((i % 6) + 1),
        teacherCapacity: 30,
        currentTeacherCount: 10,
        location: `Finote Selam Zone ${i}`,
        director: admin._id,
      });
      schoolList.push(school);
    }

    const schoolA = schoolList[0];

    const teacher = await Teacher.create({
      firstName: "Amanuel",
      lastName: "Bekele",
      email: "amanuel.bekele@ttms.local",
      phone: "+251911000111",
      idNumber: "T1234567",
      qualifications: ["M.Ed", "B.Ed"],
      serviceYears: 4,
      maritalStatus: "married",
      healthStatus: "Good",
      currentSchool: schoolA._id,
      currentWoreda: woreda._id,
      bonusService: 1,
    });

    await Transfer.create({
      teacher: teacher._id,
      transferType: "school-to-school",
      currentLocation: schoolA._id,
      requestedLocations: [schoolA._id],
      reason: "Professional development and closer commute",
      serviceYearsAtTransfer: teacher.serviceYears,
      status: "pending",
    });

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

run();
