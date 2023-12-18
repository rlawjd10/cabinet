// 출결 조회 
async function selectAttend(connection, groupId, scheduleId) {
  const selectAttendListQuery = `
  SELECT *
  FROM Attendance
  INNER JOIN JoinGroup ON Attendance.userId = JoinGroup.userId AND Attendance.groupId = JoinGroup.groupId
  WHERE Attendance.groupId = ? AND scheduleId = ?;
                `;
  const [attendRows] = await connection.query(selectAttendListQuery, [groupId, scheduleId]);
  return attendRows;
}

// 출결 정보 저장
async function updateAttendance(connection, updateAttendanceParams) {
  const updateAttendanceQuery = `
  UPDATE Attendance
  SET attendanceStatus = ?
  WHERE userId = ? AND groupId = ? AND scheduleId = ?;
`;

  const updateAttendanceRow = await connection.query(updateAttendanceQuery, updateAttendanceParams);
  return updateAttendanceRow;
}

module.exports = {
  selectAttend,
  updateAttendance,
};
