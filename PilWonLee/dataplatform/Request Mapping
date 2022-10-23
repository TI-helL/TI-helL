# Request Mapping

# GET

서버에게 resource를 보내달라고 요청합니다. 서버(혹은 DB)의 resource는 클라이언트로 전달만 될 뿐 변경되지 않습니다.예를 들어 웹브라우저에http://example.com/exmaple.png를 입력하면 해당 그림 파일이 표시되고, http://example.com/something을 입력하면 서버가 해당 [route](http://127.0.0.1:3001/ko/stubs/Route-Router)에 표시되어야 하는 페이지를 찾아 보여줍니다. 참고로 웹브라우저 주소창에 주소를 입력하면 이 신호는 항상 get으로 요청됩니다.

# POST

서버에게 resource를 보내면서 생성해 달라고 요청합니다. 예를들어 회원가입을 하면 DB에 새로운 회원정보가 등록되고, 사진을 업로드 하면 그 사진이 웹사이트에 등록됩니다.

# PUT

서버에게 resource의 업데이트 하거나 resource가 없다면 새로운 resource를 생성해 달라고 요청합니다. 회원정보 수정 등에 사용됩니다.PUT은 PATCH와 비교해서 전체 데이터를 교체하는 차이점이 있습니다.가령 user data의 구조가 user._id, user.firstName, user.lastName, user.age라고 한다면, 회원정보 수정시 PUT은 _id를 찾아 age만 업데이트하더라도 항상 모든 필드값을 가져와서 모든 필드를 항상 새로운 값으로 교체합니다.

# PATCH

서버에게resource의 업데이트를 요청합니다. 회원정보 수정 등에 사용됩니다.PATCH는 PUT과 비교해서 부분 데이터를 업데이트하는 차이점이 있습니다.가령 user data의 구조가 user._id, user.firstName, user.lastName, user.age라고 한다면, 회원정보 수정시 PATCH는 _id를 찾아 age만 업데이트할때 _id와 age만 받아와서해당 부분을 업데이트 합니다.

# DELETE

서버에게 resource의 삭제를 요청합니다.