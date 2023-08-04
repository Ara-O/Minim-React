FROM golang:1.20

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./

RUN go build -o mainapp

EXPOSE 8080

CMD ["/mainapp"]

