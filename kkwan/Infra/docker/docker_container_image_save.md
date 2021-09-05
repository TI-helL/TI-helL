# Docker Container Image Save

## Docker Container Image -> .tar

```sh
docker save [option] [filename] [image]

# example
docker save -o backup.tar backup:latest
```

## .tar -> Docker Container Image

```sh
docker load [option] [filename]

# example
docker load -i bakup.tar
```
