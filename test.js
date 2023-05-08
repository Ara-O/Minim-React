import jwt from "jsonwebtoken";

jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ1OTIzNTQ4OTQ1YTQ4ODRmOWI1YzQzIiwiZW1haWwiOiJ0ZXN0d3JyIiwiaWF0IjoxNjgzNTYzMzQ4LCJleHAiOjE2ODQxNjgxNDh9.5k8Dq19yt3aRE36mdrr4m26lSdZ70aM6AtDxiGZr3gc",
  "$2b$10$U9C5bXmr/En4t3PzeHawrOt4ukZCPBGuyB7oe7bxiBDWtnO12L7KW",
  function (err, decoded) {
    console.log(decoded); // bar
  }
);
