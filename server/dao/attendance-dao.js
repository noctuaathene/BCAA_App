const fs = require("fs");
const path = require("path");

const attendanceFolderPath = path.join(__dirname, "storage", "attendanceList");

// Method to read an attendance from a file
function get(userId, budgetId) {
  try {
    const attendanceList = list();
    const attendance = attendanceList.find(
      (a) => a.userId === userId && a.budgetId === budgetId
    );
    return attendance;
  } catch (error) {
    throw { code: "failedToReadAttendance", message: error.message };
  }
}

// Method to update attendance in a file
function update(attendance) {
  try {
    const currentAttendance = get(attendance.userId, attendance.budgetId) || {};
    if (currentAttendance.file) {
      const filePath = path.join(attendanceFolderPath, currentAttendance.file);
      fs.unlinkSync(filePath);
    }
    const newAttendance = { ...currentAttendance, ...attendance };

    const filePath = path.join(
      attendanceFolderPath,
      `${newAttendance.userId}_${newAttendance.budgetId}_${newAttendance.attendance}_${newAttendance.guests}.txt`
    );
    fs.writeFileSync(filePath, "", "utf8");
    return newAttendance;
  } catch (error) {
    throw { code: "failedToUpdateAttendance", message: error.message };
  }
}

// Method to remove an attendance from a file
function remove(userId, budgetId) {
  try {
    const attendance = get(userId, budgetId);
    if (attendance) {
      const filePath = path.join(attendanceFolderPath, attendance.file);
      fs.unlinkSync(filePath);
    }
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveAttendance", message: error.message };
  }
}

// Method to list attendances in a folder
function list() {
  try {
    const files = fs.readdirSync(attendanceFolderPath);
    const attendanceList = files.map((file) => {
      const attendanceData = file.replace(".txt", "").split("_");
      return {
        userId: attendanceData[0],
        budgetId: attendanceData[1],
        attendance: attendanceData[2],
        guests: Number(attendanceData[3]),
        file,
      };
    });
    return attendanceList;
  } catch (error) {
    throw { code: "failedToListAttendances", message: error.message };
  }
}

function budgetMap() {
  const attendanceList = list();
  const attendanceMap = {};
  attendanceList.forEach((attendance) => {
    if (!attendanceMap[attendance.budgetId])
      attendanceMap[attendance.budgetId] = {};
    if (!attendanceMap[attendance.budgetId][attendance.userId])
      attendanceMap[attendance.budgetId][attendance.userId] = {};
    attendanceMap[attendance.budgetId][attendance.userId] = {
      attendance: attendance.attendance,
      guests: attendance.guests,
    };
  });
  return attendanceMap;
}

function userMap() {
  const attendanceList = list();
  const attendanceMap = {};
  attendanceList.forEach((attendance) => {
    if (!attendanceMap[attendance.userId])
      attendanceMap[attendance.userId] = {};
    if (!attendanceMap[attendance.userId][attendance.budgetId])
      attendanceMap[attendance.userId][attendance.budgetId] = {};
    attendanceMap[attendance.userId][attendance.budgetId] = {
      attendance: attendance.attendance,
      guests: attendance.guests,
    };
  });
  return attendanceMap;
}

module.exports = {
  get,
  update,
  remove,
  list,
  budgetMap,
  userMap,
};
