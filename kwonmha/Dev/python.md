# Python

### from, import
* 결국 코드에 쓰이는 것은 import 뒤에 오는 것  
```
import a.b.c
x = a.b.c

import a
x = a.b.c

from a.b import c
x = c

from a import b
x=b.c
```