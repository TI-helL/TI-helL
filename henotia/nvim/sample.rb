class Foo < Baz
  attr_reader :bar

  def initialize(bar)
    @bar = bar
  end

  def get_down
    result = calculate(['one thing', 'other thing'], 2)
    result.to_json
  end

  def calculate(words, how_many)
    puts "this also contains other"
    complicated_stuff_here
  end
end


=begin
# practice 1 - Text Objects

'one thing' 의 o에 커서를 두고 시작한다.
diw -> one의 삭제 -> 선택된 커서의 inner word만 지워짐
di' -> one thing의 삭제 -> quotes 내부만 지워진다
di[ -> Bracket 내부의 파일 삭제
dip -> 단락의 삭제

# practice 2 - Text Objects
get_down 함수 내의 result 단어 아무데나 커서를 두고 시작한다.
ciw -> 단어 변경 -> hello 로 변경
ESC를 눌러 insert mode 빠져나오기

옆의 calculate 에서 . 누르기
calculate 가 hello로 바뀌는지 확인

# Practice 2.5 - Text Objects
get_down 함수의 result 에서 시작한다.
result의 r에 커서를 두고 cw -> hello 를 입력한다
아랫줄의 result에 r을 제외한 곳에 커서를 두고 . 을 입력한다

result의 r에 커서를 두고 ciw -> hello 를 입력한다
아랫줄의 result에 r을 제외한 곳에 커서를 두고 . 을 입력한다

cw와 ciw의 차이점을 이해 한다 

# Practice 3 - Prameterized Text Objects
get_down 함수의 result 에서 시작한다.
fo -> one thing의 o로 이동 -> find 'o'
f, -> , 로 이동 -> find ','
fo -> other thing의 o로 이동 -> find 'o'

이걸 한번에 할 수 있는게 /
/를 누르면 하단 COMMAND 창이 활성화 된다.
/ot를 입력해 한번에 other thing 로 커서를 옮길 수 있다.


=end
