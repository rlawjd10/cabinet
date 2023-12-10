const checkedEls = document.getElementsByClassName("checked");
const uncheckedEls = document.getElementsByClassName("unchecked");

const managerAttEls = document.getElementsByClassName("manager_att");
const memberAttEls = document.getElementsByClassName("member_att");

// 저장 버튼
const saveBtnEl = document.getElementById("saveBtn");
// 취소 버튼
const cancelBtnEl = document.getElementById("cancelBtn");

// checkedEls에 대한 이벤트 처리기 연결
for (let i = 0; i < checkedEls.length; i++) {
  checkedEls[i].addEventListener('click', () => {
    checkedEls[i].style.display = 'none';
    // 관련된 unchecked 요소의 스타일 변경
    uncheckedEls[i].style.display = 'block';
  });
}

// uncheckedEls에 대한 이벤트 처리기 연결
for (let i = 0; i < uncheckedEls.length; i++) {
  uncheckedEls[i].addEventListener('click', () => {
    uncheckedEls[i].style.display = 'none';
    // 관련된 checked 요소의 스타일 변경
    checkedEls[i].style.display = 'block';
  });
}


// 저장 버튼 클릭 시 발생하는 이벤트
saveBtnEl.addEventListener('click', () => {
    for (let i = 0; i < managerAttEls.length; i++) {
        managerAttEls[i].style.display = 'none';
          // 관련된 checked 요소의 스타일 변경
        memberAttEls[i].style.display = 'block';
      }
})

// 취소 버튼 클릭 시 발생하는 이벤트
cancelBtnEl.addEventListener('click', () => {
    for (let i = 0; i < managerAttEls.length; i++) {
        managerAttEls[i].style.display = 'block';
          // 관련된 checked 요소의 스타일 변경
        memberAttEls[i].style.display = 'none';
        // 체크 박스도 원래대로
        checkedEls[i].style.display = 'block';
      }
})


// '저장' 버튼 클릭 이벤트 핸들러
saveBtnEl.addEventListener('click', async () => {
  try {
    // 선택된 checkbox 값들을 가져오기
    const checkboxes = document.getElementsByName('checkbox');
    const checkedUserIds = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

      return({userIds: checkedUserIds});
    // 서버로 선택된 사용자의 출석 정보 업데이트 요청 전송
    const response = await fetch(`/app/members/1/attendance/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userIds: checkedUserIds })
    });

    // 서버 응답 처리
    if (response.ok) {
      console.log('출석 정보가 업데이트되었습니다.');
    } else {
      console.error('출석 정보 업데이트 실패');
    }
  } catch (error) {
    console.error('에러:', error);
  }
});

   






