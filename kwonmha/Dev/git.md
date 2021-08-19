# Git 정리

[참고자료](https://learngitbranching.js.org/?locale=ko)


#### Rebase
* 두 개의 브랜치를 하나로 합친다.  
```(branch) git rebase main```  
A<-B(main)   &nbsp;&nbsp;&nbsp;=>  A<-B(main)<-C(branch)  
&nbsp;&nbsp;<-C(branch)  
```(main) git rebase branch```  
A<-B<-C(main, branch)

* -i 옵션을 이용하면 원하는 커밋만 선택고, 순서도 변경할 수 있다.  
A<-B<-C<-D<-E(main)  
```git rebase -i main~4```  
A __<-C<-E<-D(main)__

#### HEAD 분리하기
* HEAD를 분리한다는 것은 HEAD를 브랜치가 아닌 커밋에 붙인다는 것.
* HEAD -> main(branch) -> C1(commit) => HEAD -> C1(commit)

#### 상대 Commit
* ^ 연산자:커밋, 브랜치의 부모  
```git checkout C1^```
* ~ 연산자: 몇 단계를 거슬러 올라갈 건지 지정  
```git checkout c1~4```

* 브랜치 HEAD 이동:  
```git branch -f main HEAD~2```

#### Cherry-pick
* 원하는 commit들을 가져온다.    
```(main) git chery-pick C```  
A<-B(main)   &nbsp;&nbsp;&nbsp;=>  A<-B(main)<-C(branch)  
&nbsp;&nbsp;<-C(branch) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <-B(branch)  


#### 삭제된 branch 업데이트
* Remote에서 삭제된 branch가 아직 남아있다고 보인다.
```
$ git branch -a
main
branch1
remotes/origin/main
remotes/origin/mh_dev
remotes/origin/ALREADY_DELETED
```
* 이 때 `git remote update origin --prune` 하면 `ALREADY_DELETED` 
branch가 사라진다.