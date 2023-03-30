# 마비노기 기댓값 계산기

마비노기 세공 도구의 기댓값을 계산하는 사이트입니다.

**특정 옵션이 등장할 때, 이미 등장한 옵션은 다시 등장하지 않는 것을 고려하지 않았습니다.**
**때문에 계산된 기댓값은 실제 기댓값보다 약간 더 낮습니다.**

**기댓값은 3줄 기준으로 계산되었습니다.**

**마비노기 홈페이지 내의 확률 테이블을 사용하였습니다.**

## 사용법

검색할 **세공 랭크, 아이템의 타입, 착용 가능 종족을 선택**하시면 옵션과 레벨 선택 창이 등장합니다.

옵션과 레벨 선택 창에서 검색할 아이템의 **옵션과 레벨을 고르신 후, 계산하기 버튼**을 눌러주세요.

**옵션 선택을 하지 않았거나, 중복된 옵션을 선택하였거나, 레벨을 입력하지 않는 등** **올바른 입력값이 아닐 경우 계산하기 버튼은 동작하지 않습니다.**

## 주의 사항

**양손 도끼**는 구 세공 도구에서 확률 테이블이 존재하지 않으므로 구 세공 도구 사용이 불가능하다고 출력됩니다. 구 세공 도구에서 검색을 원하시면 대신 **양손 도끼(자이언트 풀 스윙 전용 무기)** 로 검색해주세요.
 
**양손 둔기**는 구 세공 도구에서 확률 테이블이 존재하지 않으므로 구 세공도구 사용이 불가능하다고 출력됩니다. 구 세공 도구에서 검색을 원하시면 대신 **양손 둔기(자이언트 풀 스윙 전용 무기)** 혹은 **양손 둔기(자이언트 풀 스윙 비전용 무기)** 로 검색해주세요. 

**레이피어, 셰프의 거친 손길, 썬로드 콜트, 마력 너클, 대형 낫**은 구 세공 도구에서 확률 테이블이 존재하지 않으므로 구 세공 도구 사용이 불가능하다고 출력됩니다. 실제 인게임 내에서는 구 세공 도구의 사용이 가능하지만 정확한 정보가 없어 별도로 처리하지 않았습니다.

**클래식 정령 계열** 아이템 타입은 신규 세공도구에서 확률 테이블이 존재하지 않으므로 **클래식 정령을 제외한 테이블로 적용**됩니다
 ex) 클래식 정령 양손 검 -> 양손 검

올바른 입력 값에도 동작하지 않을 경우 새로고침 후 이용해주세요.

**구 세공 도구: 고급 세공 도구, 크레드네의 세공 도구 기억의 세공 도구, 착한 세공 도구 PLUS**
**신규 세공 도구: 정교한 세공 도구, 영롱한 세공 도구**


2021/08/12(목) 정식 서버 패치 세공 변경점 안내
https://mabinogi.nexon.com/page/news/notice_view.asp?id=4889246

## 버그 제보

문제를 발견 하실 경우, qkrdudwns98@naver.com 으로 문제를 첨부해주시면 확인 후 빠른 시일 내에 수정하도록 하겠습니다.

## 업데이트 내역

2023.03.16 배포 시작

2023.03.30 확률 계산식 및 Description 수정, 구글 Analytics 반영

옵션 i가 등장할 확률을 $P_i$ 이고, 옵션 i가 선택한 레벨 이상 등장할 확률을 $Q_i$ 라고 할 때,
		옵션이 1개 선택되었을 경우 = $3Q_1(1-P_1)^2$
		옵션이 2개 선택되었을 경우 = $6Q_1Q_2(1-(P_1+P_2))$
		옵션이 3개 선택되었을 경우 = $6Q_1Q_2Q_3$

## 기타 내용

**일반 유저가 제작한 사이트**이므로 **오류**가 발생할 수 있습니다.
**수학적으로 틀린 부분**이 있을 수 있습니다. 계산식 관련하여 지적해주시면 감사히 받겠습니다.