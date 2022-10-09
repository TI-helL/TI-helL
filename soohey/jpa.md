# JPA(Java Persistence API)

자바 진영의 ORM

사용 이유

1. 유지보수  
    - sql은 JPA가 처리하므로 필드만 추가하면 됨
2. 생산성
    - 자바 컬렉션에 데이터를 뺐더 넣었다하며 사용할 수 있음
    - 간단한 CRUD
        - 저장 : jpa.persist(member)
        - 조회 : Member member = jpa.find(memberID)
        - 수정 : member.setName(”변경할 이름”)
        - 삭제 : jpa.remove(member)
    - 특히 수정이 굉장히 간단함
        - 객체 변경시 알아서 DB에 업데이트 쿼리가 나감
3. 객체와 RDB간의 불일치 해결