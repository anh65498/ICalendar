import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import Avatar from 'components/HoraeApp/AvatarPage/Avatar';
import styled from 'styled-components';

import ClothingSelect from 'components/HoraeApp/AvatarPage/ClothingSelect';

import { Hats } from 'assets/img/avatar/hats';
import { Hair } from 'assets/img/avatar/hair';
import { FacialHair } from 'assets/img/avatar/facial-hair';
import { Tops } from 'assets/img/avatar/tops';
import { Bottoms } from 'assets/img/avatar/bottoms';
import { Accessories } from 'assets/img/avatar/accessories';
import { Shoes } from 'assets/img/avatar/shoes';

const StyledAvatarBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

function AvatarPage() {
  const { data, dispatch } = useContext(GlobalContext);

  const updateAvatar = (name: string, value: number) => {
    dispatch({
      type: 'UPDATE_AVATAR',
      payload: {
        [name]: value,
      },
    });
  };

  return (
    <StyledAvatarBody>
      <Avatar avatar={data.avatar} />
      <div
        style={{
          maxHeight: '80vh',
          overflowY: 'scroll',
          border: '2px solid var(--color-shadow)',
          borderRadius: '20px',
        }}
      >
        <ClothingSelect
          title="Hats"
          active={data.avatar.hats}
          items={Hats}
          offset="0"
          editAvatar={(index) => updateAvatar('hats', index)}
        />
        <ClothingSelect
          title="Hair"
          offset="0"
          active={data.avatar.hair}
          items={Hair}
          editAvatar={(index) => updateAvatar('hair', index)}
        />
        <ClothingSelect
          title="Facial Hair"
          active={data.avatar.facialHair}
          offset="0"
          items={FacialHair}
          editAvatar={(index) => updateAvatar('facialHair', index)}
        />
        <ClothingSelect
          title="Tops"
          active={data.avatar.tops}
          offset="-60"
          items={Tops}
          editAvatar={(index) => updateAvatar('tops', index)}
        />
        <ClothingSelect
          title="Accessories"
          active={data.avatar.accessories}
          noCrop={true}
          offset="-40"
          items={Accessories}
          editAvatar={(index) => updateAvatar('accessories', index)}
        />
        <ClothingSelect
          title="Bottoms"
          active={data.avatar.bottoms}
          offset="-80"
          items={Bottoms}
          editAvatar={(index) => updateAvatar('bottoms', index)}
        />
        <ClothingSelect
          title="Shoes"
          active={data.avatar.shoes}
          offset="-160"
          items={Shoes}
          editAvatar={(index) => updateAvatar('shoes', index)}
        />
      </div>
    </StyledAvatarBody>
  );
}

export default AvatarPage;
