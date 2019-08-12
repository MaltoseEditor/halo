import React from 'react';

import './App.scss';


function gblen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len++;
    } else {
      len += 0.5;
    }
  }
  return len;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

function randomText() {
  var Sentences = [
    "我叫 Cortana，是一段程序。",
    "点击我，能回到顶部。",
    "你好啊，人类。",
    "未来我将开放更多功能。"
  ]
  return Sentences[getRandomInt(0, Sentences.length)];
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowNumber: 0,
      maxNumber: 2,

      status: ""
    }
  }

  lock = false;

  changeNumber = (timeout) => {
    setTimeout(() => {
      const { maxNumber } = this.state;
      if (this.lock) {
        this.changeNumber(500);
        return;
      }
      this.setState({ nowNumber: getRandomInt(0, maxNumber) })
      this.changeNumber(3000);
    }, timeout);
  }

  search = (event) => {
    if (
      event.key === 13 ||
      event.keyIdentifier === 13 ||
      event.keyCode === 13
    ) {
      const value = event.target.value;
      window.location.href = `https://cn.bing.com/search?q=site%3A${window.location.host}%20${value}&qs=n&form=QBRE&sp=-1&pq=site%3A${window.location.host}%20${value}&sc=1-26&sk=&cvid=5F8ABD90760B41788219CB64CE852D5B`;
    }
  }

  componentDidMount() {
    this.changeNumber(3000);
    setTimeout(() => {
      const changeStatus = () => {
        setTimeout(() => {
          const newStatus = ['loading', 'breathe'][getRandomInt(0, 2)];
          if (newStatus !== this.state.status) {
            setTimeout(() => {
              this.setState({ status: "reset " + this.state.status })
              setTimeout(() => {
                this.setState({ status: "reset" })
                setTimeout(() => {
                  this.setState({ status: "reset " + newStatus })
                  setTimeout(() => {
                    this.setState({ status: newStatus })
                    changeStatus();
                  }, 1000)
                }, 1000)
              }, 1000)
            }, 0)
          } else {
            changeStatus();
          }
        }, getRandomInt(1, 4) * 2000);
      }
      changeStatus();
    }, 0)
  }

  render() {
    const { nowNumber, status } = this.state;
    const sentence = randomText();
    return (
      <div id="halo-box" className="flex"
        onMouseEnter={e => this.lock = true}
        onMouseLeave={e => this.lock = false}
      >
        <div className={status + " halo-instance"} onClick={e => { window.scrollTo(0, 0) }}>
          <div className="circle outer"></div>
          <div className="circle inner"></div>
        </div>

        <div className="tips">
          {
            nowNumber === 0 && (
              <div className="tip flex">
                <span style={{ width: gblen(sentence) + "em" }}>
                  {sentence}
                </span>
              </div>
            )
          }{
            nowNumber === 1 && (
              <div className="tip flex">
                <input placeholder={"想要搜索什么？"} onKeyDown={this.search} />
              </div>
            )
          }
        </div>

      </div>
    );
  }
}

export default App;
