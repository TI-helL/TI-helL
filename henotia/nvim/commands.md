# VI 명령어 모음

> :set paste

복붙모드

> :sp, :vs

창 split 하기

> control w + hjkl 

split 된 창을 hjkl 방향에 따라 이동

> control w + w

split 된 창 이동

> :bd

split 된 window는 :q로 종료해도 버퍼에 계속 메모리를 잡고 있다.  
split 된 window를 끌때는 :bd 를 이용해 버퍼를 지우자

> gd (lspconfig)

definition으로 이동

> ^ + j (lspsaga.nvim)

파일 내 에러 찾기

> gh (lspsaga.nvim)

열린 파일 내 reference 찾기

> shift + k (lspsaga.nvim)

docs 열기

> ;f (telescope.nvim)

fuzzy 파일 찾기

> ;r (telescope.nvim)

fuzzy live grep

> \\ (telescope.nvim)

fuzzy 버퍼 검색.. 인데 잘 모르겠다

> ;; (telescope.nvim)

telescope Tags 도움말
