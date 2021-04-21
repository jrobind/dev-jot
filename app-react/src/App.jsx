import React, { useState, useEffect } from 'react';

import bear from './images/avatars/bear.svg';
import butterfly from './images/avatars/butterfly.svg';
import elephant from './images/avatars/elephant.svg';
import giraffe from './images/avatars/giraffe.svg';
import goldfish from './images/avatars/goldfish.svg';
import horse from './images/avatars/horse.svg';
import octopus from './images/avatars/octopus.svg';
import parrot from './images/avatars/parrot.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import AppMain from "./components/AppMain/AppMain";

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

const App = () => {
  const [overlayVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [avatarImgPath, setAvatarImgPath] = useState('');

  const initiateApp = () => {
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
    setAvatarImgPath(userAvatar);
    setProfileVisible(true);
  };

  useEffect(() => {
    initiateApp();
  }, []);

  return (
    <>
      {overlayVisible && <div className='overlay' />}
      <Header profileVisible={profileVisible} avatarImgPath={avatarImgPath} />
      <AppMain></AppMain>
      <Footer />
    </>
  );
};

export default App;
