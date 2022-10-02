Git-Flow 란?
===

* Git Workflow 의 추상적인 개념
* 프로젝트 릴리스를 중심으로 설계된 브렌치 관리 전략
    * 크게 develop, master 브렌치를 기반으로 구성
    * 보조적으로 feature, release, hotfix 브렌치 구성

![Alt text](../images/git-flow_overall_graph.png)
1. master, develop 브렌치 생성
    * develop 브렌치 상시로 버그를 수정한 커밋 추가
2. 새로운 기능 추가 작업이 있는 경우 develop 브렌치에서 feature 브렌치 생성
    * feature 브렌치 작업 완료시 develop 브렌치로 merge
3. develop 브렌치 작업 완료시 relase 브렌치 생성
    * QA 진행, 수정 사항 relase 브렌치에서 수정
4. QA 완료 시 master, develop 브렌치 merge
    * master 브렌치 버전 태그 추가
## History

## Pros and Cons

## Component

## How to use