window.onload = () => {
  var ws;

  document.querySelector('#open').onclick = function () {
    ws = new WebSocket("wss://echo.websocket.org");

    switch (ws.readyState) {
      case WebSocket.CONNECTING: // 正在连接
        document.querySelector('#status').innerText = "正在连接";
      case WebSocket.OPEN: // 连接成功
        ws.onopen = function (event) {
          document.querySelector('#status').innerText = "连接成功";
        }

        ws.onmessage = function(msg) {
          var elm = document.querySelector('#content');
          elm.innerHTML += (`<p>${ msg.data }</p>`);
          console.log('Count is: ' + msg.data);
        };
      case WebSocket.CLOSING: // 连接正在关闭
        document.querySelector('#status').innerText = "连接正在关闭";
      case WebSocket.CLOSED: // 连接已经关闭
        ws.onclose = function (event) {
          console.log('关闭的回调')
          document.querySelector('#status').innerText = "连接已经关闭";
        }
    }
  }

  document.getElementById('send').onclick = sendMessge;

  function sendMessge () {
    if (ws) {
      var val = document.querySelector('#message').value;
      ws.send(val);
    } else {
      alert("还未连接上服务器！")
    }
    
  }
}