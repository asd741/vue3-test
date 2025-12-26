const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const { compileVueFile } = require("./compiler-sfc");

const server = http.createServer(async (req, res) => {
  const url = req.url === "/" ? "/index.htm" : req.url;
  console.log(`向伺服器請求資源:${url}`);
  
  // 處理 favicon.ico 請求（瀏覽器自動請求）
  if (url === "/favicon.ico") {
    res.statusCode = 204; // No Content
    return res.end();
  }
  
  const filePath = path.join(__dirname, url); 
  try {
    const content = await fs.readFile(filePath, "utf-8");    
    if (url.endsWith(".vue")) {
      const code = compileVueFile(content, filePath);
      res.setHeader("Content-Type", "application/javascript");
      return res.end(code);
    }
    if (url.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
      return res.end(content);
    }
    if (url.endsWith(".htm")) {
      res.setHeader("Content-Type", "text/html");
      return res.end(content);
    }

  } catch (err) {
    console.log(`讀取失敗: ${url}`);
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(5173, () => {
  console.log("server is running on http://localhost:5173");
});