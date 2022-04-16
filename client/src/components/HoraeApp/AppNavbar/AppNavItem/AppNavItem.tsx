import React, { useEffect, useState } from 'react';
import { NavLink as Link, useHistory } from 'react-router-dom';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';

import styles from 'components/HoraeApp/AppNavbar/AppNavItem/AppNavItem.module.scss';

// TODO: Remove this code once it's no longer needed as a reference
// const StyledAppItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 10rem;
//   max-height: 10rem;
//   min-width: 10rem;
//   max-width: 10rem;
//   background-color: var(--color-bg-nav-item);
//   margin: var(--spacing-small);
//   border-radius: 1rem;
//   box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.2);
//   transition: all 0.2s;
//   cursor: pointer;
//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0px 10px 16px 0px rgba(219, 219, 219, 1);
//   }
// `;

interface IAppNavItemProps {
  title: string;
  icon: string /*possible we don't need this anymore*/;
  to: string;
  active?: boolean;
}

function AppNavItem({ title, icon, to }: IAppNavItemProps) {
  const history = useHistory();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setActive(history.location.pathname.includes(to));
  }, [history.location.pathname, to]);

  useEffect(() => {
    history.listen((location) => {
      setActive(location.pathname.includes(to));
    });
  }, [history, to]);

  return (
    <Link
      to={to}
      className={styles.styledAppNavItem}
      activeClassName={styles.active}
    >
      <Icon type={icon} white={active} height={30} />
      <Text
        size="1.6rem"
        color="var(--color-nav-item-text)"
        margins={['tiny', 'none', 'none', 'none']}
      >
        {title}
      </Text>
    </Link>
  );
}

export default AppNavItem;
