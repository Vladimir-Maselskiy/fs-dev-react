import React, { useEffect, useState } from 'react';
import { Box } from '../Box/Box';
import { CurrentRate } from '../CurrentRate/CurrentRate';
import { Avatar, Button, Divider, Popover, Spin } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { NextLink } from '../NextLink/NextLink';
import { NextLinkStyledButton } from '../FInputPage/FInputPage.styled';
import { useUserContext } from '@/context/state';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { IUser } from '@/interfaces/interfaces';
import { getUserDto } from '@/utils/mongo/getUserDto';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks';
import { Logo } from '../Logo/Logo';

export const NavBar = () => {
  const { user, setUser } = useUserContext();
  const { data: session, status: sessionStatus } = useSession();

  const isWide460 = useMediaQuery(460);

  const [isUserLoading, setIsUserLoading] = useState(true);

  // axios interceptor request

  const $api = axios.create({ withCredentials: true });
  $api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    const data = localStorage.getItem('user');
    if (data && JSON.parse(data).accessToken)
      config.headers.Authorization = `Bearer ${JSON.parse(data).accessToken}`;
    return config;
  });

  // axios interceptor response
  $api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      if (error.response.status === 401 && !error.config?._isRetry) {
        const config = error.config;
        config._isRetry = true;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/auth/refresh`,
          { withCredentials: true }
        );
        config._isRetry = false;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return $api.request(config);
      }
      return error;
    }
  );

  useEffect(() => {
    if (sessionStatus !== 'loading' && !session) {
      const data = localStorage.getItem('user');
      if (data) {
        const userLS: IUser = JSON.parse(data);
        if (userLS?.accessToken && !user)
          $api
            .get(`${process.env.NEXT_PUBLIC_API_HOST}/users/getUser`)
            .then(res => {
              const userDB = res.data;
              setUser(userDB);
              const userDto = getUserDto(userDB);
              localStorage.setItem(
                'user',
                JSON.stringify({ ...userDto, accessToken: userDB.accessToken })
              );
            })
            .catch(console.log);
      } else localStorage.removeItem('user');
    }
  }, [$api, setUser, user, session, sessionStatus]);

  useEffect(() => {
    if (session && sessionStatus === 'authenticated') {
      const { email, image, name } = session.user!;
      const body = { email, image, name };
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_HOST}/users/getUserWithGoogleAuth`,
          body
        )
        .then(res => {
          const userDB = res.data;
          setUser(userDB);
          localStorage.setItem(
            'user',
            JSON.stringify({ ...userDB, accessToken: userDB.accessToken })
          );
        })
        .catch(console.log);
    }
  }, [session, sessionStatus, setUser]);

  useEffect(() => {
    if (sessionStatus === 'loading') {
      setIsUserLoading(true);
    } else {
      setIsUserLoading(false);
    }
  }, [sessionStatus]);

  const onLogoutButtonClick = async (e: any) => {
    e.preventDefault();
    try {
      await $api.get(`${process.env.NEXT_PUBLIC_API_HOST}/users/logout`);
      localStorage.removeItem('user');
      localStorage.removeItem('discount');
      setUser(null);
      if (session) {
        await signOut({ redirect: false });
      }
    } catch (error) {}
  };

  return (
    <Box display="flex" justifyContent="start" alignItems="center">
      <Logo />
      <CurrentRate />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width={180}
        ml="auto"
      >
        {isUserLoading ? (
          <Spin />
        ) : user ? (
          <Popover
            placement="bottomRight"
            content={
              <>
                <p style={{ marginTop: 10, textAlign: 'end' }}>{user.name}</p>
                <p style={{ marginTop: 10 }}>{user.email}</p>
                <Divider />
                <Button icon={<LogoutOutlined />} onClick={onLogoutButtonClick}>
                  Log out
                </Button>
              </>
            }
          >
            <Avatar
              style={{
                marginLeft: 'auto',
                backgroundColor: user.image ? '' : '#f56a00',
              }}
              src={user.image}
            >
              {!user.image && user.name.slice(0, 1).toUpperCase()}
            </Avatar>
          </Popover>
        ) : isWide460 ? (
          <>
            <NextLink path="/account/login">Sign In</NextLink>
            <NextLinkStyledButton href="/account/register">
              Try Free
            </NextLinkStyledButton>
          </>
        ) : (
          <Popover
            placement="bottomRight"
            content={
              <Box display="flex" flexDirection="column" fontSize={20}>
                <Link href="/account/login">Sign In</Link>
                <Link href="/account/register" style={{ marginTop: 10 }}>
                  Try Free
                </Link>
              </Box>
            }
          >
            <Button
              icon={<MenuOutlined />}
              onClick={onLogoutButtonClick}
              style={{ marginLeft: 'auto' }}
            />
          </Popover>
        )}
      </Box>
    </Box>
  );
};
