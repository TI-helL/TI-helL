# Softmax를 쓰는 이유

* Output을 그냥 sum으로 normalize 해줘도 될 것 같은데 왜
exp연산을 한 후에 normalize 하는 걸까?

* Softmax의 exp는 cross-entropy loss함수의 log를 상쇄시키는 작용을 하여, 
loss가 output에 거의 linear하도록 만든다. 
이로 인해, gradient가 거의 constant가 되어 vanishing gradient 없이 빨리 학습된다.

* log softmax(z)_i = z_i - max(z_j)이다.
*이 때, 정답을 맞췄다면(i가 정답이다.) max(z_j)=z_i 이다.
따라서 log likelihood는 0, likelihood는 1이 된다.
* 모델이 틀렸을 경우, 실제로 i가 정답이지만 z_j 중 z_i보다 큰
값을 갖는 j가 있다는 뜻이고, log-likelihood는 z_i - z_j가 된다.
이 때, 모델은 z_i를 크게, z_j는 작게 하는 방향으로 학습된다.  



[참고 자료-stack overflow](https://stackoverflow.com/questions/17187507/why-use-softmax-as-opposed-to-standard-normalization)