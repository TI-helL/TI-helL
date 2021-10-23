# Excel 파일로 내보내기 (spring web)

- [Excel 파일로 내보내기 (spring web)](#excel-파일로-내보내기-spring-web)
- [1. 사용할 데이터와 저장소 정의](#1-사용할-데이터와-저장소-정의)
  - [1.1. 데이터 정의](#11-데이터-정의)
  - [1.2. 저장소(repository) 정의](#12-저장소repository-정의)
- [2. Excel dependency 추가](#2-excel-dependency-추가)
- [3. 간단한 서비스 객체 정의](#3-간단한-서비스-객체-정의)
- [4. Excel Export를 담당할 객체 정의](#4-excel-export를-담당할-객체-정의)
- [5. 컨트롤러 메소드 정의](#5-컨트롤러-메소드-정의)
- [6. 실행](#6-실행)

<br><br>

# 1. 사용할 데이터와 저장소 정의

- 데이터를 정의하고 메모리 DB나 RDB에 데이터를 삽입하는 과정은 생략한다.

<br>

## 1.1. 데이터 정의

- 여기서는 간단한 Member 앤티티를 정의
- 편의를 위해 DTO는 정의하지 않음

```java
@Entity
@Table(name = "member")
@Getter
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;
}
```

<br>

## 1.2. 저장소(repository) 정의

- 간단한 MemberRepository 인터페이스 정의

```java
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
}
```

<br><br>

# 2. Excel dependency 추가

- Gradle 빌더 사용하는 경우 - build.gradle 파일

    ```groovy
    
    ...
    
    dependencies {
        implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
        implementation 'org.springframework.boot:spring-boot-starter-web'
        implementation 'com.h2database:h2'
        implementation 'org.apache.poi:poi-ooxml:4.1.2'
        compileOnly 'org.projectlombok:lombok'
        annotationProcessor 'org.projectlombok:lombok'
        testImplementation 'org.springframework.boot:spring-boot-starter-test'
    }
    
    ...
    ```

- Maven 빌더 사용하는 경우 - pom.xml 파일

    ```xml
    ...
    
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>4.1.2</version>
    </dependency>
    
    ...
    ```

<br>

# 3. 간단한 서비스 객체 정의

- MemberService 정의
    - findAll() 메소드 이용해서 Member 앤티티 리스트를 반환하는 서비스 메소드 포함

```java
@Service
@RequiredArgsConstructor
public class MemberService {

  private final MemberRepository memberRepository;

  public List<Member> getAllMember() {
    return memberRepository.findAll();
  }
}
```

<br>

# 4. Excel Export를 담당할 객체 정의

- MemberExcelExporter() 생성자: 스프레드 시트 워크북 생성
- writeHeader()
    - 사용할 시트 생성
    - 시트에 컬럼별 헤더(제목) 추가
- writeData()
    - 시트에 데이터 추가
- export()
    - writeHeader(), writeData() 메소드를 이용해서 Member 리스트 데이터를 포함한 워크북 완성
    - 완성된 워크북을 응답 메시지에 추가
- addCell(Row row, int columnNumber, Object value, CellStyle style)
    - 입력받은 위치(row, column)에 입력받은 값을 타입에 맞게 파싱 후 추가
    - 입력받은 위치에 스타일을 적용

```java
...

import com.github.owljoa.study.member.entity.Member;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class MemberExcelExporter {
  private final XSSFWorkbook workbook;
  private XSSFSheet sheet;
  private final List<Member> memberList;

  public MemberExcelExporter(List<Member> memberList) {
    this.memberList = memberList;
    workbook = new XSSFWorkbook();
  }

  public void export(HttpServletResponse response) throws IOException {
    final int COLUMN_COUNT = 2;

    writeHeader();
    writeData();

    for (int i = 0; i < COLUMN_COUNT; i++) {
      sheet.autoSizeColumn(i);
    }

    ServletOutputStream outputStream = response.getOutputStream();
    workbook.write(outputStream);
    workbook.close();

    outputStream.close();
  }

  private void writeHeader() {
    sheet = workbook.createSheet("Members");

    Row row = sheet.createRow(0);

    CellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setBold(true);
    font.setFontHeight(16);
    style.setFont(font);

    addCell(row, 0, "번호", style);
    addCell(row, 1, "이름", style);
  }

  private void addCell(Row row, int columnNumber, Object value, CellStyle style) {
    Cell cell = row.createCell(columnNumber);

    if (value instanceof Long) {
      cell.setCellValue((Long) value);
    } else if (value instanceof Boolean) {
      cell.setCellValue((Boolean) value);
    } else {
      cell.setCellValue((String) value);
    }

    cell.setCellStyle(style);
  }

  private void writeData() {
    int rowNumber = 1;

    CellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setFontHeight(14);
    style.setFont(font);

    for (Member member : memberList) {
      Row row = sheet.createRow(rowNumber);

      int columnNumber = 0;

      addCell(row, columnNumber, member.getId(), style);
      columnNumber += 1;
      addCell(row, columnNumber, member.getName(), style);

      rowNumber += 1;
    }
  }
}
```

<br>

# 5. 컨트롤러 메소드 정의

- memberService에서 전체 Member 앤티티 리스트를 추출
- MemberExporter 객체 생성하여 export(...) 메소드 호출을 통해 응답 메시지에 엑셀 파일 추가
- HTTP 응답 헤더에 들어가는 Content-Disposition은 response body 내용의 기질 및 성향을 알려주는 속성
    - default 값은 inline으로 web에 전달되는 data
    - attachment 값을 filename 속성과 함께 부여하면 response body의 내용을 다운로드 받으라는 의미

```java
...

import com.github.owljoa.study.member.entity.Member;
import com.github.owljoa.study.member.service.MemberService;
import com.github.owljoa.study.utils.MemberExcelExporter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;

  @GetMapping("/member/export/excel")
  public void exportToExcel(HttpServletResponse response) throws IOException {
    response.setContentType("application/octet-stream");
    DateFormat dateFormatter = new SimpleDateFormat("yyyyMMdd_HHmmss");
    String currentDateTime = dateFormatter.format(new Date());

		// HTTP Response Body의 성향
    String headerKey = "Content-Disposition";
    String headerValue = "attachment; filename=members_" + currentDateTime + ".xlsx";
    response.setHeader(headerKey, headerValue);

    List<Member> memberList = memberService.getAllMember();

    MemberExcelExporter excelExporter = new MemberExcelExporter(memberList);
    excelExporter.export(response);
  }
}
```

<br>

# 6. 실행

브라우저 주소창에 [http://localhost:8080/member/export/excel](http://localhost:8080/member/export/excel) 입력하여 접근하면 엑셀 파일(.xlsx)이 다운로드됨