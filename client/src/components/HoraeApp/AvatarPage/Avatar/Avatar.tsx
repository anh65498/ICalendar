import React from 'react';
import styled from 'styled-components';
import body from 'assets/img/avatar/10body/body.png';

import { Hats } from 'assets/img/avatar/hats';
import { Hair } from 'assets/img/avatar/hair';
import { Tops } from 'assets/img/avatar/tops';
import { Bottoms } from 'assets/img/avatar/bottoms';
import { Shoes } from 'assets/img/avatar/shoes';
import { FacialHair } from 'assets/img/avatar/facial-hair';
import { Accessories } from 'assets/img/avatar/accessories';

const StyledAvatar = styled.div`
  position: relative;
  img.avatar-img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

interface IAvatarProps {
  avatar: {
    hair: number;
    hats: number;
    bottoms: number;
    tops: number;
    shoes: number;
    facialHair: number;
    accessories: number;
  };
}

function Avatar({ avatar }: IAvatarProps) {
  console.log(avatar);
  return (
    <StyledAvatar>
      <img src={body} alt="" />
      {avatar.hair >= 0 && (
        <img src={Hair[avatar.hair].src} alt="" className="avatar-img" />
      )}
      {avatar.hats >= 0 && (
        <img src={Hats[avatar.hats].src} alt="" className="avatar-img" />
      )}
      {avatar.bottoms >= 0 && (
        <img src={Bottoms[avatar.bottoms].src} alt="" className="avatar-img" />
      )}
      {avatar.tops >= 0 && (
        <img src={Tops[avatar.tops].src} alt="" className="avatar-img" />
      )}
      {avatar.shoes >= 0 && (
        <img src={Shoes[avatar.shoes].src} alt="" className="avatar-img" />
      )}
      {avatar.facialHair >= 0 && (
        <img
          src={FacialHair[avatar.facialHair].src}
          alt=""
          className="avatar-img"
        />
      )}
      {avatar.accessories >= 0 && (
        <img
          src={Accessories[avatar.accessories].src}
          alt=""
          className="avatar-img"
        />
      )}
    </StyledAvatar>
  );
}

export default Avatar;
