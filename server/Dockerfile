FROM golang:1.20

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download


COPY *.go ./

COPY middleware/ /app/middleware
COPY models/ /app/models
COPY utils/ /app/utils

RUN go mod tidy
RUN go build -o mainapp

EXPOSE 8080

CMD ["./mainapp"]

