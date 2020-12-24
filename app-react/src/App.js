import React, { Component } from 'react';

import bear from './images/avatars/bear.svg';
import butterfly from './images/avatars/butterfly.svg';
import elephant from './images/avatars/elephant.svg';
import giraffe from './images/avatars/giraffe.svg';
import goldfish from './images/avatars/goldfish.svg';
import horse from './images/avatars/horse.svg';
import octopus from './images/avatars/octopus.svg';
import parrot from './images/avatars/parrot.svg';

const avatars = [
  bear,
  butterfly,
  elephant,
  giraffe,
  goldfish,
  horse,
  octopus,
  parrot,
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileVisible: false,
      avatarImgPath: '',
    };
  }

  initiateApp = () => {
    if (!localStorage.getItem('user')) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          avatar: avatars[Math.floor(Math.random() * avatars.length)],
          lessons: [],
        })
      );
    } else {
      // TODO render lessons
      // renderLessons(JSON.parse(localStorage.getItem("user")));
    }

    const userAvatar = JSON.parse(localStorage.getItem('user')).avatar;
    this.setState({ profileVisible: true, avatarImgPath: userAvatar });
  };

  componentDidMount() {
    this.initiateApp();
  }

  render() {
    const { profileVisible, avatarImgPath } = this.state;

    return (
      <div className='App'>
        <header className='header'>
          {profileVisible && avatarImgPath !== '' ? (
            <img
              src={avatarImgPath}
              className='App-logo'
              alt='logo'
              style={{ height: '100px' }}
            />
          ) : null}

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
