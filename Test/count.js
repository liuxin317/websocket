window.onload = () => {
  var ws;

  document.querySelector('#open').onclick = function () {
    ws = new WebSocket("wss://echo.websocket.org");

    switch (ws.readyState) {
      case 0: // 正在连接
        console.log(ws.readyState)
        document.querySelector('#status').innerText = "正在连接";
      case 1: // 连接成功
        console.log(ws.readyState)
        ws.onopen = function (event) {
          document.querySelector('#status').innerText = "连接成功";
        }

        ws.onmessage = function(msg) {
          var elm = document.querySelector('#content');
          elm.innerHTML += (`<p>${ msg.data }</p>`);
          console.log('Count is: ' + msg.data);
        };
      case 2: // 连接正在关闭
        console.log(ws.readyState)
        document.querySelector('#status').innerText = "连接正在关闭";
      case 3: // 连接已经关闭
        console.log(ws.readyState)
        ws.onclose = function (event) {
          console.log('关闭的回调')
          document.querySelector('#status').innerText = "连接已经关闭";
        }
    }
  }

  document.getElementById('send').onclick = sendMessge;

  document.querySelector('#close').onclick = function () {
    if (ws) {
      ws.close()
      ws = "";
      document.querySelector('#status').innerText = ws;
    } else {
      alert("还未连接上服务器！")
    }
  }

  function sendMessge () {
    if (ws) {
      var val = document.querySelector('#message').value;
      ws.send(val);
    } else {
      alert("还未连接上服务器！")
    }
  }
}