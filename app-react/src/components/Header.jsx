import React from 'react';
import styled from 'styled-components';
import stickyNote from '../images/sticky_note-white.svg';

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  position: relative;
  background: var(--main-b-color);
  padding: 15px 20px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.07), 0 3px 10px 0 rgba(0, 0, 0, 0.07);
  color: white;
  min-height: 50px;
  max-height: 50px;
`;

const HeaderTitle = styled.div`
  display: flex;
  h1 {
    font-size: 28px;
    margin: 0;
  }
  img {
    width: 24px;
    margin-left: 6px;
    margin-bottom: -6px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 53px;
  margin-left: 20px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.07), 0 3px 10px 0 rgba(0, 0, 0, 0.07);
`;

const Header = ({ profileVisible, avatarImgPath }) => {
  return (
    <HeaderStyled className='header'>
      <HeaderTitle className='header-title'>
        <h1>dev-jot</h1>
        <img alt='note icon' src={stickyNote} />
      </HeaderTitle>
      {profileVisible ? (
        <ProfileContainer className='profile'>
          <div className='avatar'>
            <AvatarImg
              referrerpolicy='no-referrer'
              alt='avatar'
              src={avatarImgPath}
            />
          </div>
        </ProfileContainer>
      ) : null}
    </HeaderStyled>
  );
};

export default Header;
