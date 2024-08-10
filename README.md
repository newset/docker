## 启动
```
docker-compose -f datasource/docker-compose.yaml up -d
```

## 主从
 https://gist.github.com/Linuxpizi/745b1acd427f72ebe1d6406f6cc98a0c


- traefik 网关代理
## DNS

> docker-compose中使用adguard作为自定义DNS，在DNS重写页面中可以添加DNS记录

设置DNS
```
networksetup -setdnsservers Wi-Fi 127.0.0.1
networksetup -setdnsservers 'USB 10/100/1000 LAN' 127.0.0.1
```

## 证书

安装并生成证书

```
chmod +x mkcert
./mkcert -install

./mkcert -key-file certs/key.pem -cert-file certs/cert.pem "*.miaotai.com" "*.localhost" localhost 127.0.0.1 ::1
```

## 使用

桥接其他独立容器
```
docker network connect docker_default [container_name] --alias [container_name]
```