const attendProvider = require("./attendProvider");
const attendService = require("./attendService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 날짜별 출석 조회 API
 * [GET] /app/members/:groupId/attendance/:scheduleId
 */
exports.getAttendance = async function (req, res) {

    /**
     * path variable : groupId, scheduleId
     */
    const groupId = req.params.groupId;
    const scheduleId = req.params.scheduleId;

    const attendListByDate = await attendProvider.attendUserList(groupId, scheduleId);
    // return res.send(response(baseResponse.SUCCESS, attendListByDate));
    return res.render("../views/attendance/attendance.ejs",{result:attendListByDate});

};

/**
 * API No. 2
 * API Name : 출석 정보 저장 API
 * [POST] /app/members/:groupId/attendance/:scheduleId
 */
exports.postAttendance = async function (req, res) {

    
    const { userIds } = req.body;
    const status = '하이'; // 출석 정보 상태

    // 선택된 사용자의 출석 정보 업데이트
    for (const userId of userIds) {
      const attendResponse = await attendService.editAttendance(userId, 1, 1, status);
      return res.send(attendResponse);
    }

    

};
