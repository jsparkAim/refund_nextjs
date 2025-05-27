/* 강제 탈퇴 회원 모달 메시지 */
export const UseRestrictionsModalMessages = {
  UseRestrictionsTitle: () => (
    <div className="text-center">서비스 이용 제한</div>
  ),
  UseRestrictionsContent: () => (
    <div className="text-center">
      회원님께서는
      <br />
      강제탈퇴 처리되셨습니다.
      <br />
      탈퇴 사유 및 자세한 내용은
      <br />
      고객센터로 문의 바랍니다.
      <br />
      고객센터 0000-0000
    </div>
  ),
};

/* 비밀번호 불일치 모달 메시지 */
export const PasswordMismatchModalMessages = {
  PasswordMismatchTitle: () => (
    <div className="text-center">비밀번호가 일치하지 않습니다.</div>
  ),
};

/* 사용자가 입력한 휴대폰번호를 DB에서 찾을 수 없는 경우 */
export const NotFoundUserModalMessages = {
  NotFoundUserTitle: () => (
    <div className="text-center">등록되어있지 않은 휴대폰번호입니다.</div>
  ),
  NotFoundUserContent: () => (
    <div className="text-center">
      로그인 하기 전, 회원가입을 먼저
      <br />
      진행해주세요.
    </div>
  ),
};

/* 비밀번호 찾기 시, 일치하는 회원이 없을 경우 */
export const NotFoundUserPasswordModalMessages = {
  NotFoundUserPasswordContent: () => (
    <div className="text-center">
      입력하신 이름, 휴대폰번호와
      <br />
      일치하는 사용자가 없습니다.
    </div>
  ),
};

/* 비밀번호 변경 체크 모달 메시지 */
export const PasswordChangeCheckModalMessages = {
  PasswordChangeCheckContent: () => (
    <div className="text-center">비밀번호를 변경하시겠습니까?</div>
  ),
};

/* 비밀번호 변경 성공 모달 메시지 */
export const PasswordChangeSuccessModalMessages = {
  PasswordChangeSuccessContent: () => (
    <div className="text-center">
      비밀번호 변경이 완료되었습니다.
      <br />
      새로운 비밀번호로 로그인 해주세요.
    </div>
  ),
};
