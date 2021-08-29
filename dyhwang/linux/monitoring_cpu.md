# 리눅스에서 CPU 자원 모니터링
```bash
$ mpstat

Linux 3.2.0-57-generic (USERNB01) 12/12/2013 _x86_64_	(2 CPU)

03:29:29 PM CPU %usr %nice %sys %iowait %irq %soft %steal %guest %idle
03:29:29 PM all    6.30   0.06   1.94   3.75    0.00   0.06   0.00   0.00   87.88
```

**03:29:29 PM** : mpstat가 수행된 시간

**all** : 모든 CPU

**%usr** : 사용자 레벨(애플리케이션)이 사용한 CPU 사용율

**%nice** : nice 우선순위와 함께 사용자 레벨에서 수행된 CPU 사용율

**%sys** : 시스템 레벨(커널)에서 사용한 CPU 사용율

**%iowait** : I/O 처리 때문에 기다리는 CPU 시간 백분율

**%irq** : H/W 인터럽트를 서비스하기 위해 사용된 CPU 사용율

**%soft** : S/W 인터럽트를 서비스하기 위해 사용된 CPU 사용율

**%steal** : 하이퍼바이저가 다른 가상 프로세서에 의해 서비스될때 기다리는 CPU 시간 백분율

**%guest** : 가상 프로세서가 실행하기 위해 사용되는 CPU 사용율

**%idle** : 유휴한 CPU 시간 백분율

## CPU 정보 출력
### 모든 CPU
```bash
$ mpstat -P ALL

Linux 3.2.0-57-generic (USERNB01) 12/12/2013 _x86_64_	(2 CPU)

04:07:36 PM CPU %usr %nice %sys %iowait %irq %soft %steal %guest %idle
04:07:36 PM all 6.02 0.04 1.72 2.99 0.00 0.05 0.00 0.00 89.17
04:07:36 PM 0 3.84 0.01 1.15 3.72 0.00 0.06 0.00 0.00 91.21
04:07:36 PM 1 13.55 0.15 3.66 0.46 0.00 0.03 0.00 0.00 82.15
```
### cpu 지정
```bash
$ mpstat -P 0

Linux 3.2.0-57-generic (USERNB01) 12/12/2013 _x86_64_	(2 CPU)

03:54:00 PM CPU %usr %nice %sys %iowait %irq %soft %steal %guest %idle
03:54:00 PM  0    3.82    0.01  1.16  3.88     0.00   0.06  0.00  0.00    91.06
```

## 인터벌 모니터링
3초간격으로 500회 반복 출력
```bash
$ mpstat 3 500

Linux 3.2.0-57-generic (USERNB01) 12/12/2013 _x86_64_	(2 CPU)

04:27:11 PM CPU %usr %nice %sys %iowait %irq %soft %steal %guest %idle
04:27:14 PM all 0.67 0.00 0.34 0.00 0.00 0.00 0.00 0.00 98.99
04:27:17 PM all 1.17 0.00 0.33 1.33 0.00 0.00 0.00 0.00 97.17
04:27:20 PM all 0.84 0.00 0.17 0.00 0.00 0.00 0.00 0.00 98.99
04:27:23 PM all 1.00 0.00 0.17 1.51 0.00 0.00 0.00 0.00 97.32
Average: all 0.92 0.00 0.25 0.71 0.00 0.00 0.00 0.00 98.12
```