/* 첫 방문 모달 메시지 */
export const LoginModalMessages = {
  firstVisitTitle: () => <div className="text-center">처음 오셨네요!</div>,
  firstVisitContent: () => (
    <div className="text-center mt-8 mb-10">
      <p>
        서비스 이용을 위해 약관 동의 후<br />
        회원가입을 진행해주셔야 합니다.
        <br />
        약관 페이지로 이동할게요.
      </p>
      <p className="my-5 font-bold">
        이미 가입하셨는데, 연락처 변경된 경우,
        <br />
        로그인 화면에서 연락처를 재등록해주세요.
      </p>
    </div>
  ),
};

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
